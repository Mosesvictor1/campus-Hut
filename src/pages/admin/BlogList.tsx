import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Star, Newspaper } from "lucide-react";
import { blogRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

export default function BlogList() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", { status, category, search }],
    queryFn: () =>
      blogRequest<any[]>("blogs", {
        token,
        body: {
          ...(status && { status }),
          ...(category && { category }),
          ...(search && { search }),
        },
      }),
  });

  const cats = useQuery({
    queryKey: ["categories"],
    queryFn: () => blogRequest<any[]>("categories", { token }),
  });

  const del = useMutation({
    mutationFn: (id: string) => blogRequest(`blogs/${id}`, { method: "DELETE", token }),
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["blogs"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const blogs = data?.blogs || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
          <span className="text-xs px-2 py-0.5 rounded bg-[#1a1a1a] text-neutral-400">{blogs.length}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-neutral-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts…"
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md pl-8 pr-3 py-2 text-sm text-white outline-none focus:border-campusGreen-600"
            />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white">
            <option value="">All Categories</option>
            {(cats.data?.categories || []).map((c: any) => <option key={c.id} value={c.slug || c.name}>{c.name}</option>)}
          </select>
          <Link to="/dashboard/blogs/new" className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white text-sm px-3 py-2 rounded-md flex items-center gap-1">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 bg-[#1a1a1a]" />)}</div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center">
            <Newspaper className="w-16 h-16 mx-auto text-campusGreen-600 mb-3" />
            <p className="text-white font-medium">No blog posts yet</p>
            <Link to="/dashboard/blogs/new" className="mt-4 inline-block bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-4 py-2 rounded-md">
              Write your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-neutral-500 text-xs uppercase border-b border-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left"></th>
                <th className="p-3 text-left">Post</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Tags</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Featured</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b: any) => (
                <tr key={b.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <td className="p-3">
                    {b.featuredImage ? (
                      <img src={b.featuredImage} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-[#1a1a1a]" />
                    )}
                  </td>
                  <td className="p-3">
                    <Link to={`/dashboard/blogs/${b.id}/edit`} className="text-white font-medium hover:text-campusGreen-600">{b.title}</Link>
                    <div className="text-xs text-neutral-500">/{b.slug}</div>
                  </td>
                  <td className="p-3"><span className="text-xs px-2 py-0.5 rounded bg-orange-600 text-white">{b.category}</span></td>
                  <td className="p-3">
                    <div className="flex gap-1 flex-wrap">
                      {(b.tags || []).slice(0, 2).map((t: string) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded border border-orange-600 text-orange-500">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded text-white ${b.status === "published" ? "bg-campusGreen-600" : "bg-neutral-700"}`}>{b.status}</span>
                  </td>
                  <td className="p-3">{b.featured && <Star className="w-4 h-4 text-orange-500 fill-orange-500" />}</td>
                  <td className="p-3 text-neutral-400 text-xs">{b.publishedAt ? format(new Date(b.publishedAt), "MMM d, yyyy") : "—"}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/dashboard/blogs/${b.id}/edit`)} className="p-1.5 rounded hover:bg-[#2a2a2a] text-campusGreen-600"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(b.id)} className="p-1.5 rounded hover:bg-[#2a2a2a] text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#111111] border-[#2a2a2a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog post?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              This will also delete all comments on this post. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1a1a1a] border-[#2a2a2a] text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && del.mutate(deleteId)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
