import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Newspaper } from "lucide-react";
import { newsRequest } from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

type SearchBy = "title" | "author" | "type";

export default function NewsList() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [q, setQ] = useState("");
  const [by, setBy] = useState<SearchBy>("title");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["news", page, q, by],
    queryFn: async () => {
      if (q.trim()) {
        return newsRequest<any[]>(`api/news/search/${by}?${by}=${encodeURIComponent(q)}`);
      }
      return newsRequest<any>(`api/news/getAllNews?page=${page}&size=20`);
    },
  });

  const del = useMutation({
    mutationFn: (id: string) => newsRequest(`api/news/deleteNews/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Article deleted", { className: "border-orange-600" });
      qc.invalidateQueries({ queryKey: ["news"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const list: any[] = Array.isArray(data) ? data : data?.content || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white">News Articles</h2>
          <span className="text-xs px-2 py-0.5 rounded bg-[#1a1a1a] text-neutral-400">{list.length}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={by} onChange={(e) => setBy(e.target.value as SearchBy)} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-2 py-2 text-sm text-white">
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="type">Type</option>
          </select>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-neutral-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search by ${by}…`}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md pl-8 pr-3 py-2 text-sm text-white outline-none focus:border-orange-600"
            />
          </div>
          <Link to="/dashboard/news/new" className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-2 rounded-md flex items-center gap-1">
            <Plus className="w-4 h-4" /> New Article
          </Link>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 bg-[#1a1a1a]" />)}</div>
        ) : list.length === 0 ? (
          <div className="p-12 text-center">
            <Newspaper className="w-16 h-16 mx-auto text-orange-600 mb-3" />
            <p className="text-white font-medium">No news articles</p>
            <Link to="/dashboard/news/new" className="mt-4 inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md">
              Create article
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-neutral-500 text-xs uppercase border-b border-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Article</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Summary</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((n: any) => (
                <tr key={n.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <td className="p-3">
                    {n.imageUrl ? (
                      <img src={n.imageUrl} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-[#1a1a1a] flex items-center justify-center"><Newspaper className="w-5 h-5 text-neutral-600" /></div>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="text-white font-medium">{n.title}</div>
                    <div className="text-xs text-neutral-400">{n.author}</div>
                  </td>
                  <td className="p-3"><span className="text-xs px-2 py-0.5 rounded bg-orange-600 text-white">{n.newsType}</span></td>
                  <td className="p-3 text-neutral-400 max-w-xs truncate">{(n.summary || "").slice(0, 80)}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/dashboard/news/${n.id}/edit`)} className="p-1.5 hover:bg-[#2a2a2a] rounded text-campusGreen-600"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(n.id)} className="p-1.5 hover:bg-[#2a2a2a] rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!q && (
        <div className="flex justify-between">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 border border-[#2a2a2a] rounded text-white text-sm disabled:opacity-40">Previous</button>
          <button disabled={list.length < 20} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 border border-[#2a2a2a] rounded text-white text-sm disabled:opacity-40">Next</button>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#111111] border-[#2a2a2a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete news article?</AlertDialogTitle>
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
