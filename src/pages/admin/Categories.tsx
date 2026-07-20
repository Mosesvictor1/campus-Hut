import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import { blogRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { slugify } from "@/lib/slug";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

export default function Categories() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const [slugLocked, setSlugLocked] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => blogRequest<any>("categories", { token }),
  });

  const blogs = useQuery({
    queryKey: ["blogs-for-cats"],
    queryFn: () => blogRequest<any>("blogs", { token }),
  });

  useEffect(() => {
    if (editing) {
      setForm({ name: editing.name || "", slug: editing.slug || "", description: editing.description || "" });
    } else {
      setForm({ name: "", slug: "", description: "" });
    }
  }, [editing]);

  const onName = (n: string) => setForm({ ...form, name: n, slug: slugLocked ? slugify(n) : form.slug });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) return blogRequest(`categories/${editing.id}`, { method: "PUT", token, body: form });
      return blogRequest("categories", { method: "POST", token, body: form });
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["categories"] });
      setEditing(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => blogRequest(`categories/${id}`, { method: "DELETE", token }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["categories"] });
      setDeleteId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const cats = data?.categories || [];
  const countFor = (name: string) => (blogs.data?.blogs || []).filter((b: any) => b.category === name).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 bg-[#1a1a1a]" />)}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-neutral-500 text-xs uppercase border-b border-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Posts</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c: any) => (
                <tr key={c.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <td className="p-3 text-white">{c.name}</td>
                  <td className="p-3 text-campusGreen-600">{c.slug}</td>
                  <td className="p-3 text-neutral-400 truncate max-w-[200px]">{c.description}</td>
                  <td className="p-3 text-neutral-400">{countFor(c.name)}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(c)} className="p-1.5 hover:bg-[#2a2a2a] rounded text-campusGreen-600"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(c.id)} className="p-1.5 hover:bg-[#2a2a2a] rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-4 space-y-3 self-start lg:sticky lg:top-20">
        <h3 className="text-white font-semibold">{editing ? "Edit Category" : "New Category"}</h3>
        <div>
          <label className="text-xs text-neutral-400">Name*</label>
          <input value={form.name} onChange={(e) => onName(e.target.value)} className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-sm" />
        </div>
        <div>
          <label className="text-xs text-neutral-400 flex items-center gap-2">
            Slug
            <button type="button" onClick={() => setSlugLocked(!slugLocked)}><Pencil className="w-3 h-3 text-campusGreen-600" /></button>
          </label>
          <input value={form.slug} readOnly={slugLocked} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-campusGreen-600 text-sm" />
        </div>
        <div>
          <label className="text-xs text-neutral-400">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-sm" />
        </div>
        <div className="flex gap-2">
          {editing && <button onClick={() => setEditing(null)} className="flex-1 border border-[#2a2a2a] text-white py-2 rounded text-sm">Cancel</button>}
          <button
            disabled={save.isPending || !form.name}
            onClick={() => save.mutate()}
            className="flex-1 bg-campusGreen-600 text-white py-2 rounded text-sm disabled:opacity-50"
          >Save</button>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#111111] border-[#2a2a2a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-orange-500" /> Delete category?</AlertDialogTitle>
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
