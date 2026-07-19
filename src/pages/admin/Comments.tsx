import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Trash2, MessageSquare } from "lucide-react";
import { blogRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type TabKey = "all" | "pending" | "approved";

export default function Comments() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  const [tab, setTab] = useState<TabKey>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["comments", tab],
    queryFn: () =>
      blogRequest<any[]>("comments", {
        token,
        body: tab === "all" ? {} : { status: tab },
      }),
  });

  const allComments = useQuery({
    queryKey: ["comments-counts"],
    queryFn: () => blogRequest<any[]>("comments", { token }),
  });
  const allCommentsList = allComments.data?.comments || [];
  const counts = {
    all: allCommentsList.length,
    pending: allCommentsList.filter((c: any) => c.status === "pending").length,
    approved: allCommentsList.filter((c: any) => c.status === "approved").length,
  };

  const approve = useMutation({
    mutationFn: (id: string) => blogRequest(`comments/${id}/approve`, { method: "PUT", token }),
    onSuccess: () => {
      toast.success("Approved");
      qc.invalidateQueries({ queryKey: ["comments"] });
      qc.invalidateQueries({ queryKey: ["comments-counts"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => blogRequest(`comments/${id}`, { method: "DELETE", token }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["comments"] });
      qc.invalidateQueries({ queryKey: ["comments-counts"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const items = data?.comments || [];

  return (
    <div className="space-y-4">
      <div className="flex gap-4 border-b border-[#2a2a2a]">
        {(["all", "pending", "approved"] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "pb-2 text-sm capitalize flex items-center gap-2",
              tab === t ? "text-white border-b-2 border-campusGreen-600" : "text-neutral-400"
            )}
          >
            {t}
            <span className="text-xs px-1.5 py-0.5 rounded bg-orange-600 text-white">{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 bg-[#1a1a1a]" />)}</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-neutral-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-campusGreen-600" />
            No {tab === "all" ? "" : tab} comments
          </div>
        ) : (
          <TooltipProvider>
            <table className="w-full text-sm">
              <thead className="text-neutral-500 text-xs uppercase border-b border-[#2a2a2a]">
                <tr>
                  <th className="p-3 text-left">Commenter</th>
                  <th className="p-3 text-left">Comment</th>
                  <th className="p-3 text-left">Blog ID</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c: any) => (
                  <tr key={c.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                    <td className="p-3">
                      <div className="text-white font-medium">{c.name || c.author}</div>
                      <div className="text-xs text-neutral-400">{c.email}</div>
                    </td>
                    <td className="p-3 text-neutral-300 max-w-md">{(c.content || c.comment || "").slice(0, 100)}</td>
                    <td className="p-3 text-neutral-400 text-xs">{c.blogId}</td>
                    <td className="p-3">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded text-white",
                        c.status === "approved" ? "bg-campusGreen-600" : "bg-orange-600"
                      )}>{c.status}</span>
                    </td>
                    <td className="p-3 text-neutral-400 text-xs">
                      {c.createdAt && (
                        <Tooltip>
                          <TooltipTrigger>{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}</TooltipTrigger>
                          <TooltipContent>{format(new Date(c.createdAt), "PPpp")}</TooltipContent>
                        </Tooltip>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        {c.status === "pending" && (
                          <button onClick={() => approve.mutate(c.id)} className="flex items-center gap-1 text-xs bg-campusGreen-600 text-white px-2 py-1 rounded">
                            <Check className="w-3 h-3" /> Approve
                          </button>
                        )}
                        <button onClick={() => setDeleteId(c.id)} className="p-1.5 hover:bg-[#2a2a2a] rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TooltipProvider>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#111111] border-[#2a2a2a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete comment?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1a1a1a] border-[#2a2a2a] text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && del.mutate(deleteId)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
