import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Settings as SettingsIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { blogRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const schema = z.object({
  currentPassword: z.string().min(1, "Required"),
  newPassword: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function Settings() {
  const admin = useAuthStore((s) => s.admin);
  const token = useAuthStore((s) => s.token);
  const [show, setShow] = useState({ cur: false, nw: false, cf: false });
  const [err, setErr] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mut = useMutation({
    mutationFn: (data: FormData) =>
      blogRequest("auth/change-password", {
        method: "POST",
        token,
        body: { currentPassword: data.currentPassword, newPassword: data.newPassword },
      }),
    onSuccess: () => {
      toast.success("Password updated successfully");
      reset();
      setErr("");
    },
    onError: (e: any) => setErr(e.message),
  });

  const eye = (v: boolean, onClick: () => void) => (
    <button type="button" onClick={onClick} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500">
      {v ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-campusGreen-600" /> Account Settings
          </h2>
          <p className="text-neutral-400 text-sm mt-1">{admin?.username}</p>
        </div>

        <div className="border-t border-[#2a2a2a] pt-4">
          <h3 className="text-white font-medium mb-3">Change Password</h3>
          <form onSubmit={handleSubmit((d) => mut.mutate(d))} className="space-y-3">
            <div>
              <label className="text-sm text-neutral-300">Current Password</label>
              <div className="relative mt-1">
                <input type={show.cur ? "text" : "password"} {...register("currentPassword")} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white pr-8" />
                {eye(show.cur, () => setShow({ ...show, cur: !show.cur }))}
              </div>
              {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
            </div>
            <div>
              <label className="text-sm text-neutral-300">New Password</label>
              <div className="relative mt-1">
                <input type={show.nw ? "text" : "password"} {...register("newPassword")} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white pr-8" />
                {eye(show.nw, () => setShow({ ...show, nw: !show.nw }))}
              </div>
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
            </div>
            <div>
              <label className="text-sm text-neutral-300">Confirm New Password</label>
              <div className="relative mt-1">
                <input type={show.cf ? "text" : "password"} {...register("confirmPassword")} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white pr-8" />
                {eye(show.cf, () => setShow({ ...show, cf: !show.cf }))}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            {err && <div className="text-red-500 text-sm">{err}</div>}
            <button
              type="submit"
              disabled={mut.isPending}
              className="w-full bg-campusGreen-600 hover:bg-campusGreen-700 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {mut.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
