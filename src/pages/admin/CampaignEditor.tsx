import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, ImagePlus, Loader2, Megaphone, X } from "lucide-react";
import { toast } from "sonner";
import { adsRequest, createAdCampaign, getAllCampaigns, updateAdCampaign } from "@/lib/api";
import { firstValue, unwrapList, unwrapObject } from "@/lib/ads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  title: z.string().min(2, "Campaign title is required"),
  advertiserId: z.string().min(1, "Advertiser is required"),
  description: z.string().optional(),
  ctaText: z.string().min(1, "CTA Text is required"),
  ctaUrl: z.string().url("Enter a valid CTA URL"),
  placement: z.string().min(1, "Placement is required"),
  priority: z.string().min(1, "Priority is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  maxImpressions: z.coerce.number().min(0).optional(),
});
type FormValues = z.infer<typeof schema>;

const defaults: FormValues = {
  title: "",
  advertiserId: "",
  description: "",
  ctaText: "Learn More",
  ctaUrl: "",
  placement: "DASHBOARD_CAROUSEL",
  priority: "STANDARD",
  startDate: "",
  endDate: "",
  maxImpressions: 10000,
};

function formatIsoDate(val: string): string {
  if (!val) return "";
  if (val.length === 16) return `${val}:00`;
  return val;
}

function toInputDateTime(val: string): string {
  if (!val) return "";
  return val.slice(0, 16);
}

export default function CampaignEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const advertisersQuery = useQuery({ queryKey: ["advertisers"], queryFn: () => adsRequest("api/getAllAdvertiser") });
  const prioritiesQuery = useQuery({ queryKey: ["campaign-priorities"], queryFn: () => adsRequest("api/ad-campaigns/priorities") });
  const placementsQuery = useQuery({ queryKey: ["campaign-placements"], queryFn: () => adsRequest("api/ad-campaigns/placements") });
  const existing = useQuery({ queryKey: ["campaign", id], queryFn: () => adsRequest(`api/ad-campaigns/getCampaign/${id}`), enabled: isEdit });
  const allCampaignsQuery = useQuery({ queryKey: ["campaigns"], queryFn: () => getAllCampaigns(), enabled: isEdit });

  useEffect(() => {
    if (!isEdit) return;
    let item = unwrapObject(existing.data);
    if (!item.title && !item.name && !item.campaignName) {
      const list = unwrapList(allCampaignsQuery.data, ["campaigns"]);
      const found = list.find((c) => String(firstValue(c, "id", "campaignId")) === String(id));
      if (found) item = found;
    }
    if (item.title || item.name || item.campaignName || item.advertiserId) {
      const advId = firstValue(item, "advertiserId", "advertiser_id");
      const advObj = item.advertiser && typeof item.advertiser === "object" ? (item.advertiser as Record<string, unknown>) : {};
      const finalAdvId = advId || advObj.id || advObj.advertiserId || "";

      reset({
        title: String(item.title || item.name || item.campaignName || ""),
        advertiserId: String(finalAdvId || ""),
        description: String(item.description || ""),
        ctaText: String(item.ctaText || "Learn More"),
        ctaUrl: String(item.ctaUrl || ""),
        placement: String(item.placement || "DASHBOARD_CAROUSEL"),
        priority: String(item.priority || "STANDARD"),
        startDate: toInputDateTime(String(item.startDate || "")),
        endDate: toInputDateTime(String(item.endDate || "")),
        maxImpressions: Number(item.maxImpressions || 10000),
      });

      const currentBanner = String(firstValue(item, "bannerUrl", "banner", "imageUrl") || "");
      if (currentBanner) {
        setPreview(currentBanner);
      }
    }
  }, [existing.data, allCampaignsQuery.data, id, isEdit, reset]);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const save = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!isEdit) {
        const payload = {
          advertiserId: Number(values.advertiserId),
          title: values.title,
          description: values.description || "",
          ctaText: values.ctaText,
          ctaUrl: values.ctaUrl,
          placement: values.placement,
          priority: values.priority,
          startDate: formatIsoDate(values.startDate),
          endDate: formatIsoDate(values.endDate || ""),
          maxImpressions: Number(values.maxImpressions || 10000),
        };
        return createAdCampaign(payload, file || undefined);
      } else {
        return updateAdCampaign(
          id!,
          {
            title: values.title,
            description: values.description || "",
            ctaText: values.ctaText,
            ctaUrl: values.ctaUrl,
            placement: values.placement,
            priority: values.priority,
            startDate: formatIsoDate(values.startDate),
            endDate: values.endDate ? formatIsoDate(values.endDate) : "",
            maxImpressions: Number(values.maxImpressions || 10000),
            advertiserId: values.advertiserId ? Number(values.advertiserId) : undefined,
          },
          file || undefined
        );
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? "Campaign updated" : "Campaign created");
      qc.invalidateQueries({ queryKey: ["campaigns"] });
      navigate("/dashboard/campaigns");
    },
    onError: (error: Error) => toast.error(error.message || "Could not save campaign"),
  });

  const advertisers = unwrapList(advertisersQuery.data, ["advertisers", "content", "items"]);
  const priorities = getOptions(prioritiesQuery.data, ["priorities", "items"]);
  const placements = getOptions(placementsQuery.data, ["placements", "items"]);

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit((values) => save.mutate(values))} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 md:p-7 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Megaphone className="text-orange-500" />
            {isEdit ? "Edit Ad Campaign" : "New Ad Campaign"}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">Set the campaign details, placement, schedule, and creative.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Campaign title" error={errors.title?.message}>
            <Input {...register("title")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>

          <Field label="Advertiser" error={errors.advertiserId?.message}>
            <select {...register("advertiserId")} className="h-10 w-full rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 text-sm text-white">
              <option value="">Select advertiser…</option>
              {advertisers.map((advertiser) => (
                <option key={String(firstValue(advertiser, "id", "advertiserId"))} value={String(firstValue(advertiser, "id", "advertiserId"))}>
                  {firstValue(advertiser, "companyName", "name", "businessName")}
                </option>
              ))}
            </select>
          </Field>

          <Field label="CTA Text" error={errors.ctaText?.message}>
            <Input placeholder="e.g. Learn More" {...register("ctaText")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>

          <Field label="CTA URL" error={errors.ctaUrl?.message}>
            <Input placeholder="https://example.com/campaign" {...register("ctaUrl")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>

          <Field label="Placement" error={errors.placement?.message}>
            <OptionField register={register("placement")} options={placements} fallback={["DASHBOARD_CAROUSEL", "HOME_TOP", "HOME_MID", "BLOG_SIDEBAR", "NEWS_BANNER"]} />
          </Field>

          <Field label="Priority" error={errors.priority?.message}>
            <OptionField register={register("priority")} options={priorities} fallback={["STANDARD", "HIGH", "LOW", "URGENT", "1", "2", "3", "4", "5"]} />
          </Field>

          <Field label="Max Impressions" error={errors.maxImpressions?.message}>
            <Input type="number" min="0" step="1" placeholder="10000" {...register("maxImpressions")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
          </Field>

          <Field label="Start date" error={errors.startDate?.message}>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <Input type="datetime-local" {...register("startDate")} className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
            </div>
          </Field>

          <Field label="End date" error={errors.endDate?.message}>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <Input type="datetime-local" {...register("endDate")} className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
            </div>
          </Field>
        </div>

        <Field label="Campaign description">
          <Textarea rows={4} {...register("description")} className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
        </Field>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300">Campaign banner</label>
          {preview ? (
            <div className="relative border border-[#2a2a2a] rounded-lg p-3 bg-[#1a1a1a] flex flex-col md:flex-row items-center gap-4">
              <img src={preview} alt="Campaign banner preview" className="w-full md:w-56 h-36 object-cover rounded-md border border-[#333] shrink-0" />
              <div className="space-y-2 text-center md:text-left flex-1">
                <p className="text-xs text-neutral-400">
                  {file ? `New banner selected: ${file.name}` : "Current campaign banner loaded."}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2a2a2a] hover:bg-[#333] text-xs text-white font-medium transition-colors">
                    <ImagePlus className="w-3.5 h-3.5 text-orange-500" />
                    <span>{file ? "Choose different banner" : "Replace banner"}</span>
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
            <label className="mt-1 cursor-pointer block border-2 border-dashed border-[#2a2a2a] rounded-lg p-7 text-center hover:border-orange-600 transition-colors">
              <ImagePlus className="w-8 h-8 mx-auto text-orange-500 mb-2" />
              <span className="text-sm text-neutral-400">Upload banner image</span>
              <p className="text-xs text-neutral-500 mt-1">Click to select banner image (PNG, JPG, WEBP)</p>
              <input type="file" hidden accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
            </label>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard/campaigns")} className="border-[#2a2a2a] text-white">
            Cancel
          </Button>
          <Button type="submit" disabled={save.isPending} className="bg-orange-600 hover:bg-orange-700 text-white">
            {save.isPending && <Loader2 className="animate-spin" />} Save campaign
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

function getOptions(value: unknown, keys: string[]) {
  const root = value && typeof value === "object" ? ((value as Record<string, unknown>).data ?? value) : value;
  const raw = Array.isArray(root) ? root : root && typeof root === "object" ? keys.map((key) => (root as Record<string, unknown>)[key]).find(Array.isArray) || [] : [];
  return raw.map((item: unknown) => (typeof item === "object" && item !== null ? String((item as Record<string, unknown>).value ?? (item as Record<string, unknown>).name ?? (item as Record<string, unknown>).label ?? (item as Record<string, unknown>).id) : String(item)));
}

function OptionField({ register, options, fallback }: { register: UseFormRegisterReturn; options: string[]; fallback: string[] }) {
  const values = options.length ? options : fallback;
  return (
    <select {...register} className="h-10 w-full rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 text-sm text-white">
      <option value="">Select…</option>
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}