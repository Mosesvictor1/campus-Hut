import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Check,
  Clock3,
  Eye,
  Megaphone,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  Archive,
  Trophy,
  MousePointerClick,
  Percent,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { adsRequest, getAllCampaigns } from "@/lib/api";
import { firstValue, formatDate, formatMetric, unwrapList, unwrapObject } from "@/lib/ads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const actionMap: Record<string, { label: string; tooltip: string; icon: typeof Check; endpoint: string }> = {
  approve: { label: "Approve", tooltip: "Approve Campaign", icon: Check, endpoint: "approve" },
  pause: { label: "Pause", tooltip: "Pause Campaign", icon: Pause, endpoint: "pause" },
  resume: { label: "Resume", tooltip: "Resume Campaign", icon: Play, endpoint: "resume" },
  complete: { label: "Complete", tooltip: "Complete Campaign", icon: Trophy, endpoint: "complete" },
  archive: { label: "Archive", tooltip: "Archive Campaign", icon: Archive, endpoint: "archive" },
};

export default function Campaigns() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [analyticsId, setAnalyticsId] = useState<string | number | null>(null);
  const [viewCampaignId, setViewCampaignId] = useState<string | number | null>(null);

  const campaignsQuery = useQuery({ queryKey: ["campaigns"], queryFn: () => getAllCampaigns() });
  const dashboardQuery = useQuery({ queryKey: ["campaign-dashboard"], queryFn: () => adsRequest("api/ad-campaigns/dashboard") });
  const analyticsQuery = useQuery({ queryKey: ["campaign-analytics", analyticsId], queryFn: () => adsRequest(`api/ad-campaigns/${analyticsId}/campaignAnalytics`), enabled: analyticsId !== null });
  const viewCampaignQuery = useQuery({ queryKey: ["get-campaign", viewCampaignId], queryFn: () => adsRequest(`api/ad-campaigns/getCampaign/${viewCampaignId}`), enabled: viewCampaignId !== null });

  const lifecycle = useMutation({
    mutationFn: ({ id, action }: { id: string | number; action: string }) => adsRequest(`api/ad-campaigns/${id}/${action}`, { method: "PATCH" }),
    onSuccess: (_, variables) => {
      toast.success(`Campaign ${variables.action}d`);
      qc.invalidateQueries({ queryKey: ["campaigns"] });
      qc.invalidateQueries({ queryKey: ["campaign-dashboard"] });
    },
    onError: (error: Error) => toast.error(error.message || "Campaign action failed"),
  });

  const campaigns = unwrapList(campaignsQuery.data, ["campaigns", "content", "items"]);
  const dashboard = unwrapObject(dashboardQuery.data);

  const filtered = useMemo(() => {
    return campaigns.filter((campaign) => {
      const haystack = JSON.stringify(campaign).toLowerCase();
      const st = String(firstValue(campaign, "status", "campaignStatus")).toLowerCase();
      return (!search || haystack.includes(search.toLowerCase())) && (status === "all" || st === status.toLowerCase());
    });
  }, [campaigns, search, status]);

  const totalCampaigns = Number(firstValue(dashboard, "totalCampaigns") || campaigns.length);
  const activeCount = Number(firstValue(dashboard, "activeCampaigns") || campaigns.filter((c) => ["ACTIVE", "RUNNING", "APPROVED"].includes(String(firstValue(c, "status", "campaignStatus")).toUpperCase())).length);
  const pendingCount = Number(firstValue(dashboard, "pendingCampaigns") || campaigns.filter((c) => ["PENDING", "PENDING_APPROVAL", "DRAFT"].includes(String(firstValue(c, "status", "campaignStatus")).toUpperCase())).length);
  const totalImpressions = firstValue(dashboard, "totalImpressions", "impressions");
  const totalClicks = firstValue(dashboard, "totalClicks", "clicks");
  const overallCtr = firstValue(dashboard, "overallCtr", "ctr");

  const analyticsData = unwrapObject(analyticsQuery.data);
  const selectedCampaignData = unwrapObject(viewCampaignQuery.data);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Ad campaigns</h2>
          <p className="text-sm text-neutral-400 mt-1">Create, approve, schedule, and measure sponsored placements.</p>
        </div>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link to="/dashboard/campaigns/new">
            <Plus className="w-4 h-4 mr-1" /> New Campaign
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <Metric icon={Megaphone} label="Total campaigns" value={totalCampaigns} />
        <Metric icon={Clock3} label="Active campaigns" value={activeCount} accent="green" />
        <Metric icon={Clock3} label="Pending approval" value={pendingCount} accent="orange" />
        <Metric icon={Eye} label="Impressions" value={formatMetric(totalImpressions)} />
        <Metric icon={MousePointerClick} label="Clicks" value={formatMetric(totalClicks)} accent="green" />
        <Metric icon={Percent} label="CTR" value={`${overallCtr !== "" ? overallCtr : "0"}%`} accent="orange" />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search campaigns…" className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
        </div>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 text-sm text-white">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-x-auto">
        {campaignsQuery.isLoading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-14 bg-[#1a1a1a]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Megaphone className="w-12 h-12 mx-auto text-orange-500 mb-3" />
            <p className="text-white font-medium">No campaigns found</p>
            <Button asChild className="mt-4 bg-orange-600 hover:bg-orange-700 text-white">
              <Link to="/dashboard/campaigns/new">
                <Plus className="w-4 h-4 mr-1" /> Create campaign
              </Link>
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-neutral-500 text-xs uppercase border-b border-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left">Campaign</th>
                <th className="p-3 text-left">Placement</th>
                <th className="p-3 text-left">Schedule</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Performance</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((campaign) => {
                const id = firstValue(campaign, "id", "campaignId");
                const title = String(firstValue(campaign, "title", "name", "campaignName") || "Unnamed campaign");
                const bannerUrl = String(firstValue(campaign, "bannerUrl", "banner", "imageUrl") || "");
                const currentStatus = String(firstValue(campaign, "status", "campaignStatus") || "PENDING").toUpperCase();
                const normalized = currentStatus.toLowerCase();
                const advertiserData = campaign.advertiser && typeof campaign.advertiser === "object" ? (campaign.advertiser as Record<string, unknown>) : {};
                const advertiser = String(firstValue(campaign, "advertiserName", "companyName") || advertiserData.name || advertiserData.companyName || "—");

                const impressions = firstValue(campaign, "currentImpressions", "impressions", "viewCount");
                const clicks = firstValue(campaign, "currentClicks", "clicks", "clickCount");

                return (
                  <tr key={String(id)} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors">
                    <td className="p-3 cursor-pointer" onClick={() => setViewCampaignId(typeof id === "boolean" ? String(id) : id)}>
                      <div className="flex items-center gap-3">
                        {bannerUrl ? (
                          <img src={bannerUrl} alt={title} className="w-12 h-12 object-cover rounded-md border border-[#2a2a2a] shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-orange-500 shrink-0">
                            <Megaphone className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-white hover:text-orange-400 transition-colors">{title}</div>
                          <div className="text-xs text-neutral-500">{advertiser}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-neutral-300">{String(firstValue(campaign, "placement", "placementType") || "—")}</td>
                    <td className="p-3 text-xs text-neutral-400">
                      {formatDate(firstValue(campaign, "startDate", "startAt"))} → {formatDate(firstValue(campaign, "endDate", "endAt"))}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium text-white ${
                          ["ACTIVE", "RUNNING", "APPROVED"].includes(currentStatus)
                            ? "bg-campusGreen-600"
                            : currentStatus === "PAUSED"
                            ? "bg-orange-600"
                            : ["PENDING", "PENDING_APPROVAL", "DRAFT"].includes(currentStatus)
                            ? "bg-yellow-600"
                            : "bg-neutral-700"
                        }`}
                      >
                        {currentStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-neutral-400">
                      {formatMetric(impressions)} views · {formatMetric(clicks)} clicks
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <ActionButton
                          tooltip="View Campaign Details"
                          icon={Eye}
                          onClick={() => setViewCampaignId(typeof id === "boolean" ? String(id) : id)}
                          className="text-neutral-300 hover:bg-[#2a2a2a]"
                        />

                        <ActionButton
                          tooltip="Edit Campaign"
                          icon={Pencil}
                          onClick={() => navigate(`/dashboard/campaigns/${String(id)}/edit`)}
                          className="text-campusGreen-600 hover:bg-[#2a2a2a]"
                        />

                        <ActionButton
                          tooltip="View Analytics"
                          icon={BarChart3}
                          onClick={() => setAnalyticsId(typeof id === "boolean" ? String(id) : id)}
                          className="text-orange-500 hover:bg-[#2a2a2a]"
                        />

                        {getActions(normalized).map((actionKey) => {
                          const actionConfig = actionMap[actionKey];
                          if (!actionConfig) return null;
                          const ActionIcon = actionConfig.icon;
                          return (
                            <ActionButton
                              key={actionKey}
                              tooltip={actionConfig.tooltip}
                              icon={ActionIcon}
                              onClick={() => lifecycle.mutate({ id: typeof id === "boolean" ? String(id) : id, action: actionConfig.endpoint })}
                              className="text-neutral-300 hover:bg-[#2a2a2a]"
                            />
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* View Campaign Modal */}
      <Dialog open={viewCampaignId !== null} onOpenChange={(open) => !open && setViewCampaignId(null)}>
        <DialogContent className="bg-[#111111] border-[#2a2a2a] text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-white">
              <Megaphone className="text-orange-500" />
              Campaign Details
            </DialogTitle>
            <DialogDescription className="text-neutral-400">Full information for the selected ad campaign.</DialogDescription>
          </DialogHeader>

          {viewCampaignQuery.isLoading ? (
            <Skeleton className="h-48 bg-[#1a1a1a]" />
          ) : (
            <div className="space-y-4">
              {Boolean(selectedCampaignData.bannerUrl) && (
                <img
                  src={String(selectedCampaignData.bannerUrl)}
                  alt={String(selectedCampaignData.title || "Banner")}
                  className="w-full h-48 object-cover rounded-lg border border-[#2a2a2a]"
                />
              )}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{String(selectedCampaignData.title || "—")}</h3>
                  <span className="text-xs px-2.5 py-1 rounded bg-orange-600 text-white font-medium">
                    {String(selectedCampaignData.status || "PENDING").replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 mt-1">Advertiser: <span className="text-white font-medium">{String(selectedCampaignData.advertiserName || "—")}</span></p>
              </div>

              {Boolean(selectedCampaignData.description) && (
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                  <p className="text-xs text-neutral-400 mb-1 font-medium uppercase">Description</p>
                  <p className="text-sm text-neutral-200">{String(selectedCampaignData.description)}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                  <p className="text-xs text-neutral-400">Placement</p>
                  <p className="font-semibold text-white mt-1">{String(selectedCampaignData.placement || "—")}</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                  <p className="text-xs text-neutral-400">Priority</p>
                  <p className="font-semibold text-white mt-1">{String(selectedCampaignData.priority || "—")}</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                  <p className="text-xs text-neutral-400">Schedule</p>
                  <p className="text-xs font-medium text-white mt-1">
                    {formatDate(firstValue(selectedCampaignData, "startDate"))} → {formatDate(firstValue(selectedCampaignData, "endDate"))}
                  </p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                  <p className="text-xs text-neutral-400">Max Impressions</p>
                  <p className="font-semibold text-white mt-1">{formatMetric(firstValue(selectedCampaignData, "maxImpressions"))}</p>
                </div>
              </div>

              {Boolean(selectedCampaignData.ctaUrl) && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={String(selectedCampaignData.ctaUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium transition-colors"
                  >
                    <span>{String(selectedCampaignData.ctaText || "Learn More")}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Analytics Modal */}
      <Dialog open={analyticsId !== null} onOpenChange={(open) => !open && setAnalyticsId(null)}>
        <DialogContent className="bg-[#111111] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-white">
              <BarChart3 className="text-orange-500" />
              Campaign Analytics
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              {String(analyticsData.campaignTitle || analyticsData.title || "Performance statistics")}
            </DialogDescription>
          </DialogHeader>

          {analyticsQuery.isLoading ? (
            <Skeleton className="h-36 bg-[#1a1a1a]" />
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-neutral-400">Impressions</p>
                  <p className="text-xl font-bold text-white mt-1">{formatMetric(firstValue(analyticsData, "impressions"))}</p>
                  <p className="text-[11px] text-neutral-500 mt-1">Max: {formatMetric(firstValue(analyticsData, "maxImpressions"))}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-neutral-400">Clicks</p>
                  <p className="text-xl font-bold text-campusGreen-600 mt-1">{formatMetric(firstValue(analyticsData, "clicks"))}</p>
                  <p className="text-[11px] text-neutral-500 mt-1">CTR: {String(analyticsData.ctr ?? 0)}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-neutral-400">Remaining Impressions</p>
                  <p className="text-sm font-semibold text-white mt-1">{formatMetric(firstValue(analyticsData, "remainingImpressions"))}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-neutral-400">Status</p>
                  <p className="text-sm font-semibold text-orange-500 mt-1">{String(analyticsData.status || "—")}</p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-xs">
                <p className="text-neutral-400">Campaign Schedule</p>
                <p className="text-sm font-medium text-white mt-1">
                  {formatDate(firstValue(analyticsData, "startDate"))} → {formatDate(firstValue(analyticsData, "endDate"))}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ActionButton({
  tooltip,
  icon: Icon,
  onClick,
  className,
}: {
  tooltip: string;
  icon: typeof Pencil;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div className="relative group">
      <Button variant="ghost" size="icon" aria-label={tooltip} onClick={onClick} className={className}>
        <Icon className="w-4 h-4" />
      </Button>
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[11px] font-medium py-1 px-2.5 rounded shadow-lg border border-[#333] z-30 whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );
}

function getActions(status: string) {
  if (["pending", "pending_approval", "draft"].includes(status)) return ["approve", "archive"];
  if (["approved", "active", "running"].includes(status)) return ["pause", "complete", "archive"];
  if (status === "paused") return ["resume", "complete", "archive"];
  return [];
}

function Metric({
  icon: Icon,
  label,
  value,
  accent = "orange",
}: {
  icon: typeof Megaphone;
  label: string;
  value: number | string;
  accent?: "green" | "orange";
}) {
  return (
    <div className={`bg-[#111111] border border-[#2a2a2a] border-l-4 ${accent === "green" ? "border-l-campusGreen-600" : "border-l-orange-600"} rounded-lg p-3 flex items-center justify-between`}>
      <div>
        <p className="text-xs text-neutral-400">{label}</p>
        <p className="text-xl font-bold text-white mt-0.5">{value}</p>
      </div>
      <Icon className={`w-5 h-5 ${accent === "green" ? "text-campusGreen-600" : "text-orange-500"}`} />
    </div>
  );
}