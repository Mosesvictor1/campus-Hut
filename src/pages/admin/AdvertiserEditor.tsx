import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { adsRequest } from "@/lib/api";
import { unwrapObject } from "@/lib/ads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Phone number is required"),
  website: z.string().url("Enter a valid URL").or(z.literal("")),
  address: z.string().max(240).optional(),
  description: z.string().max(1000).optional(),
});
type FormValues = z.infer<typeof schema>;
const defaults: FormValues = { companyName: "", contactPerson: "", email: "", phone: "", website: "", address: "", description: "" };

export default function AdvertiserEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaults });
  const existing = useQuery({ queryKey: ["advertiser", id], queryFn: () => adsRequest(`api/getAdvertiser/${id}`), enabled: isEdit });
  useEffect(() => {
    if (!existing.data) return;
    const item = unwrapObject(existing.data);
    reset({ companyName: item.companyName || item.name || item.businessName || "", contactPerson: item.contactPerson || item.contactName || "", email: item.email || item.contactEmail || "", phone: item.phone || item.contactPhone || "", website: item.website || item.url || "", address: item.address || "", description: item.description || "" });
  }, [existing.data, reset]);
  useEffect(() => { if (!file) { setPreview(""); return; } const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  const save = useMutation({
    mutationFn: async (values: FormValues) => {
      const body = new FormData(); body.append("request", JSON.stringify(values)); if (file) body.append("images", file);
      return adsRequest(isEdit ? `api/updateAdvertiser/${id}` : "api/createAdvertiser", { method: "POST", body, isFormData: true });
    },
    onSuccess: () => { toast.success(isEdit ? "Advertiser updated" : "Advertiser created"); qc.invalidateQueries({ queryKey: ["advertisers"] }); navigate("/dashboard/advertisers"); },
    onError: (error: Error) => toast.error(error.message || "Could not save advertiser"),
  });
  return <div className="max-w-3xl mx-auto"><form onSubmit={handleSubmit((values) => save.mutate(values))} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 md:p-7 space-y-5"><div><h2 className="text-xl font-semibold text-white flex items-center gap-2"><Building2 className="text-campusGreen-600" />{isEdit ? "Edit Advertiser" : "New Advertiser"}</h2><p className="text-sm text-neutral-400 mt-1">Keep the company profile and contact details up to date.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Field label="Company name" error={errors.companyName?.message}><Input {...register("companyName")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field><Field label="Contact person" error={errors.contactPerson?.message}><Input {...register("contactPerson")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field><Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field><Field label="Phone" error={errors.phone?.message}><Input {...register("phone")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field><Field label="Website" error={errors.website?.message}><Input placeholder="https://example.com" {...register("website")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field><Field label="Address"><Input {...register("address")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field></div><Field label="Company description"><Textarea rows={4} {...register("description")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" /></Field><div><label className="text-sm text-neutral-300">Company image (optional)</label>{!file && !preview ? <label className="mt-1 cursor-pointer block border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 text-center hover:border-campusGreen-600"><Upload className="w-8 h-8 mx-auto text-campusGreen-600 mb-2" /><span className="text-sm text-neutral-400">Upload image</span><input type="file" hidden accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label> : <div className="relative mt-1"><img src={preview} alt="Selected advertiser" className="w-full h-44 object-cover rounded-lg" /><Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => setFile(null)}><X /></Button><p className="text-xs text-neutral-500 mt-2">{file?.name}</p></div>}</div><div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => navigate("/dashboard/advertisers")} className="border-[#2a2a2a] text-white">Cancel</Button><Button type="submit" disabled={save.isPending} className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white">{save.isPending && <Loader2 className="animate-spin" />} Save advertiser</Button></div></form></div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <div><label className="text-sm text-neutral-300">{label}</label>{children}<p className="text-xs text-red-500 mt-1 min-h-4">{error || ""}</p></div>; }