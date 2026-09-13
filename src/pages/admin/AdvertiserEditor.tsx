import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { adsRequest } from "@/lib/api";
import { firstValue, unwrapList, unwrapObject } from "@/lib/ads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Phone number is required"),
});

type FormValues = z.infer<typeof schema>;
const defaults: FormValues = { companyName: "", contactName: "", email: "", phone: "" };

export default function AdvertiserEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaults });

  const existing = useQuery({
    queryKey: ["advertiser", id],
    queryFn: () => adsRequest(`api/getAdvertiser/${id}`),
    enabled: isEdit,
  });

  const allAdvertisersQuery = useQuery({
    queryKey: ["advertisers"],
    queryFn: () => adsRequest("api/getAllAdvertiser"),
    enabled: isEdit,
  });

  useEffect(() => {
    if (!isEdit) return;
    let item = unwrapObject(existing.data);
    if (!item.companyName && !item.contactName && !item.email) {
      const list = unwrapList(allAdvertisersQuery.data, ["advertisers"]);
      const found = list.find((adv) => String(firstValue(adv, "id", "advertiserId")) === String(id));
      if (found) item = found;
    }
    if (item.companyName || item.contactName || item.email || item.phone) {
      reset({
        companyName: String(item.companyName || item.name || item.businessName || ""),
        contactName: String(item.contactName || item.contactPerson || ""),
        email: String(item.email || item.contactEmail || ""),
        phone: String(item.phone || item.contactPhone || ""),
      });
      const existingImg = String(item.logoURL || item.logoUrl || item.image || item.imageUrl || "");
      if (existingImg) setPreview(existingImg);
    }
  }, [existing.data, allAdvertisersQuery.data, id, isEdit, reset]);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const save = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        companyName: values.companyName,
        contactName: values.contactName,
        email: values.email,
        phone: values.phone,
      };
      const jsonStr = JSON.stringify(payload);
      const path = isEdit
        ? `api/updateAdvertiser/${id}?request=${encodeURIComponent(jsonStr)}`
        : `api/createAdvertiser?request=${encodeURIComponent(jsonStr)}`;

      if (file) {
        const body = new FormData();
        body.append("request", new Blob([jsonStr], { type: "application/json" }));
        body.append("images", file);
        body.append("logo", file);
        body.append("file", file);
        return adsRequest(path, { method: "POST", body, isFormData: true });
      }

      const body = new FormData();
      body.append("request", new Blob([jsonStr], { type: "application/json" }));
      return adsRequest(path, { method: "POST", body, isFormData: true });
    },
    onSuccess: () => {
      toast.success(isEdit ? "Advertiser updated" : "Advertiser created");
      qc.invalidateQueries({ queryKey: ["advertisers"] });
      navigate("/dashboard/advertisers");
    },
    onError: (error: Error) => toast.error(error.message || "Could not save advertiser"),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit((values) => save.mutate(values))} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 md:p-7 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Building2 className="text-campusGreen-600" />
            {isEdit ? "Edit Advertiser" : "New Advertiser"}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">Provide advertiser company and contact details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company name" error={errors.companyName?.message}>
            <Input placeholder="Federal Ltd" {...register("companyName")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>
          <Field label="Contact name" error={errors.contactName?.message}>
            <Input placeholder="Victor" {...register("contactName")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <Input type="email" placeholder="federaluk0@gmail.com" {...register("email")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <Input placeholder="09138691147" {...register("phone")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300">Company Logo / Image</label>
          {preview ? (
            <div className="relative border border-[#2a2a2a] rounded-lg p-3 bg-[#1a1a1a] flex flex-col md:flex-row items-center gap-4">
              <img src={preview} alt="Advertiser logo" className="w-32 h-32 object-cover rounded-md border border-[#333] shrink-0" />
              <div className="space-y-2 text-center md:text-left flex-1">
                <p className="text-xs text-neutral-400">
                  {file ? `New image selected: ${file.name}` : "Current company image loaded."}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2a2a2a] hover:bg-[#333] text-xs text-white font-medium transition-colors">
                    <Upload className="w-3.5 h-3.5 text-campusGreen-600" />
                    <span>{file ? "Choose different image" : "Replace image"}</span>
                    <input type="file" hidden accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
                  </label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => { setFile(null); setPreview(""); }}
                    className="text-xs h-8"
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <label className="mt-1 cursor-pointer block border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 text-center hover:border-campusGreen-600 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-campusGreen-600 mb-2" />
              <span className="text-sm text-neutral-400">Upload logo / image</span>
              <p className="text-xs text-neutral-500 mt-1">Click to select image file (PNG, JPG, WEBP)</p>
              <input type="file" hidden accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
            </label>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard/advertisers")} className="border-[#2a2a2a] text-white">
            Cancel
          </Button>
          <Button type="submit" disabled={save.isPending} className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
            {save.isPending && <Loader2 className="animate-spin mr-2 w-4 h-4" />} Save advertiser
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm text-neutral-300">{label}</label>
      {children}
      <p className="text-xs text-red-500 mt-1 min-h-4">{error || ""}</p>
    </div>
  );
}