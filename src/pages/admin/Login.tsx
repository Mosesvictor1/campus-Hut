import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { blogRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    setLoading(true);
    try {
      const res: any = await blogRequest("auth/login", { method: "POST", body: data });
      const token = res.token;
      const expiresAt = res.expiresAt
        ? new Date(res.expiresAt).getTime()
        : Date.now() + 1000 * 60 * 60 * 24;
      const admin = res.admin || { id: res.id || "", username: data.username, email: res.email || "" };
      setAuth({ token, expiresAt, admin });
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] p-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Campus<span className="underline decoration-campusGreen-600 decoration-4 underline-offset-4">Hut</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-2">CMS Dashboard</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-neutral-300 text-sm">Username</label>
            <input
              {...register("username")}
              className="mt-1 w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-white outline-none focus:border-campusGreen-600"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="text-neutral-300 text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-white outline-none focus:border-campusGreen-600"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-campusGreen-600 hover:bg-campusGreen-700 text-white font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
