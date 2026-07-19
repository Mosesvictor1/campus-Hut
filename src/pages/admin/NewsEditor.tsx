import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { newsRequest } from "@/lib/api";

export default function NewsEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState({ title: "", newsType: "", summary: "", content: "", author: "" });
  const [file, setFile] = useState<File | null>(null);

  const existing = useQuery({
    queryKey: ["news", id],
    queryFn: () => newsRequest<any>(`api/news/getNews/${id}`),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing.data) {
      setForm({
        title: existing.data.title || "",
        newsType: existing.data.newsType || "",
        summary: existing.data.summary || "",
        content: existing.data.content || "",
        author: existing.data.author || "",
      });
    }
  }, [existing.data]);

  const save = useMutation({
    mutationFn: async () => {
      if (isEdit) {
        return newsRequest(`api/news/updateNews/${id}`, {
          method: "PUT",
          body: { newsType: form.newsType, summary: form.summary, content: form.content },
        });
      }
      const fd = new FormData();
      fd.append("news", JSON.stringify(form));
      if (file) fd.append("images", file);
      return newsRequest("api/news/createNews", { method: "POST", body: fd, isFormData: true });
    },
    onSuccess: () => {
      toast.success("Article saved!", { className: "border-orange-600" });
      qc.invalidateQueries({ queryKey: ["news"] });
      navigate("/dashboard/news");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleSave = () => {
    if (!isEdit && (!form.title || !form.author)) return toast.error("Title and author required");
    if (!form.newsType || !form.summary || !form.content) return toast.error("All fields required");
    save.mutate();
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">{isEdit ? "Edit News Article" : "Create News Article"}</h2>

        {!isEdit && (
          <>
            <div>
              <label className="text-sm text-neutral-300">Title*</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-neutral-300">Author*</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white" />
            </div>
          </>
        )}

        <div>
          <label className="text-sm text-neutral-300">News Type*</label>
          <input value={form.newsType} onChange={(e) => setForm({ ...form, newsType: e.target.value })} placeholder="e.g. Sports, Tech, Campus" className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white" />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Summary*</label>
          <textarea rows={3} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Brief summary of the article…" className="w-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white" />
        </div>

        <div>
          <label className="text-sm text-neutral-300 mb-1 block">Content*</label>
          <div data-color-mode="dark">
            <MDEditor value={form.content} onChange={(v) => setForm({ ...form, content: v || "" })} height={350} />
          </div>
        </div>

        {!isEdit && (
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">Article Image (optional)</label>
            {!file ? (
              <label className="cursor-pointer block border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 text-center hover:border-orange-600">
                <Upload className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                <div className="text-neutral-400 text-sm">Upload article image</div>
                <input type="file" hidden accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
            ) : (
              <div className="relative">
                <img src={URL.createObjectURL(file)} alt="" className="w-full h-48 object-cover rounded" />
                <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
                  <span>{file.name} — {(file.size / 1024).toFixed(1)} KB</span>
                  <button onClick={() => setFile(null)} className="p-1 bg-red-600/20 text-red-500 rounded"><X className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => navigate("/dashboard/news")} className="border border-[#2a2a2a] text-white px-4 py-2 rounded text-sm">Cancel</button>
          <button
            disabled={save.isPending}
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2 disabled:opacity-60"
          >
            {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
}
