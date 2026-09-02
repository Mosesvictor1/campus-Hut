import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Building2, CheckCircle2, Globe, Mail, Pencil, Phone, Plus, Search, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { adsRequest } from "@/lib/api";
import { firstValue, unwrapList } from "@/lib/ads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function Advertisers() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [deactivateId, setDeactivateId] = useState<string | number | null>(null);
  const advertisersQuery = useQuery({
    queryKey: ["advertisers"],
    queryFn: () => adsRequest("api/getAllAdvertiser"),
  });
  const deactivate = useMutation({
    mutationFn: (id: string | number) => adsRequest(`api/${id}/deactivate`, { method: "PATCH" }),
    onSuccess: () => {
      toast.success("Advertiser deactivated");
      qc.invalidateQueries({ queryKey: ["advertisers"] });
      setDeactivateId(null);
    },
    onError: (error: Error) => toast.error(error.message || "Could not deactivate advertiser"),
  });
  const advertisers = unwrapList(advertisersQuery.data, ["advertisers", "content", "items"]);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return advertisers;
    return advertisers.filter((advertiser) => JSON.stringify(advertiser).toLowerCase().includes(term));
  }, [advertisers, search]);
  const activeCount = advertisers.filter((item) => firstValue(item, "active", "isActive", "status") !== false && firstValue(item, "status") !== "INACTIVE").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Advertisers</h2>
          <p className="text-sm text-neutral-400 mt-1">Manage the companies buying space across CampusHut.</p>
        </div>
        <Button asChild className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white"><Link to="/dashboard/advertisers/new"><Plus /> New Advertiser</Link></Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric icon={Building2} label="Total advertisers" value={advertisers.length} />
        <Metric icon={CheckCircle2} label="Active accounts" value={activeCount} accent="green" />
        <Metric icon={ShieldOff} label="Inactive accounts" value={Math.max(advertisers.length - activeCount, 0)} accent="orange" />
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full"><Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search advertisers…" className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white" /></div>
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-x-auto">
        {advertisersQuery.isLoading ? <div className="p-4 space-y-2">{Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-14 bg-[#1a1a1a]" />)}</div> : filtered.length === 0 ? <EmptyState onCreate={() => navigate("/dashboard/advertisers/new")} /> : (
          <table className="w-full text-sm">
            <thead className="text-neutral-500 text-xs uppercase border-b border-[#2a2a2a]"><tr><th className="p-3 text-left">Company</th><th className="p-3 text-left">Contact</th><th className="p-3 text-left">Website</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>{filtered.map((advertiser) => {
               const id = firstValue(advertiser, "id", "advertiserId");
              const name = firstValue(advertiser, "companyName", "name", "businessName") || "Unnamed advertiser";
              const active = firstValue(advertiser, "active", "isActive", "status") !== false && firstValue(advertiser, "status") !== "INACTIVE" && firstValue(advertiser, "status") !== "INACTIVE";
              return <tr key={String(id)} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                 <td className="p-3"><div className="font-medium text-white">{String(name)}</div><div className="text-xs text-neutral-500">ID: {id || "—"}</div></td>
                 <td className="p-3"><div className="text-neutral-300">{String(firstValue(advertiser, "contactPerson", "contactName") || "—")}</div><div className="text-xs text-neutral-500 flex items-center gap-1"><Mail className="w-3 h-3" />{String(firstValue(advertiser, "email", "contactEmail") || "—")}</div></td>
                 <td className="p-3 text-neutral-400"><div className="flex items-center gap-1"><Globe className="w-3 h-3" />{String(firstValue(advertiser, "website", "url") || "—")}</div></td>
                <td className="p-3"><span className={`text-xs px-2 py-1 rounded text-white ${active ? "bg-campusGreen-600" : "bg-neutral-700"}`}>{active ? "Active" : "Inactive"}</span></td>
                 <td className="p-3"><div className="flex justify-end gap-2"><Button variant="ghost" size="icon" aria-label={`Edit ${String(name)}`} onClick={() => navigate(`/dashboard/advertisers/${String(id)}/edit`)} className="text-campusGreen-600 hover:bg-[#2a2a2a]"><Pencil /></Button>{active && <Button variant="ghost" size="icon" aria-label={`Deactivate ${String(name)}`} onClick={() => setDeactivateId(typeof id === "boolean" ? String(id) : id)} className="text-orange-500 hover:bg-[#2a2a2a]"><ShieldOff /></Button>}</div></td>
              </tr>;
            })}</tbody>
          </table>
        )}
      </div>
      <AlertDialog open={deactivateId !== null} onOpenChange={(open) => !open && setDeactivateId(null)}><AlertDialogContent className="bg-[#111111] border-[#2a2a2a] text-white"><AlertDialogHeader><AlertDialogTitle>Deactivate advertiser?</AlertDialogTitle><AlertDialogDescription className="text-neutral-400">Existing campaigns will remain available, but this advertiser will no longer be active.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel className="bg-[#1a1a1a] border-[#2a2a2a] text-white">Cancel</AlertDialogCancel><AlertDialogAction className="bg-orange-600 hover:bg-orange-700" onClick={() => deactivateId !== null && deactivate.mutate(deactivateId)}>Deactivate</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}

function Metric({ icon: Icon, label, value, accent = "orange" }: { icon: typeof Building2; label: string; value: number; accent?: "green" | "orange" }) {
  return <div className={`bg-[#111111] border border-[#2a2a2a] border-l-4 ${accent === "green" ? "border-l-campusGreen-600" : "border-l-orange-600"} rounded-lg p-4 flex items-center justify-between`}><div><p className="text-xs text-neutral-400">{label}</p><p className="text-2xl font-bold text-white mt-1">{value}</p></div><Icon className={accent === "green" ? "text-campusGreen-600" : "text-orange-500"} /></div>;
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return <div className="p-12 text-center"><Building2 className="w-12 h-12 mx-auto text-campusGreen-600 mb-3" /><p className="text-white font-medium">No advertisers found</p><Button onClick={onCreate} className="mt-4 bg-campusGreen-600 hover:bg-campusGreen-700 text-white"><Plus /> Add advertiser</Button></div>;
}