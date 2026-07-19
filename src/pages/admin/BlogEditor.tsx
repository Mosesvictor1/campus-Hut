import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { Loader2, Pencil, Tag as TagIcon, Hash, Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { toast } from "sonner";
import { blogRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { slugify } from "@/lib/slug";
import ImageDropzone from "@/components/admin/ImageDropzone";
import TagInput from "@/components/admin/TagInput";
import { uploadToCloudinary } from "@/lib/cloudinary";

const emptyBlog = {
  title: "", slug: "", excerpt: "", content: "", featuredImage: "", gallery: [] as string[],
  category: "", tags: [] as string[], status: "draft", featured: false, visibility: "public",
  allowComments: true, readingTime: 0, publishedAt: null as string | null,
  seo: { metaTitle: "", metaDescription: "", focusKeyword: "", keywords: [] as string[], canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "" },
};

export default function BlogEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();

  const [blog, setBlog] = useState<any>(emptyBlog);
  const [slugLocked, setSlugLocked] = useState(true);
  const [seoOpen, setSeoOpen] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const cats = useQuery({
    queryKey: ["categories"],
    queryFn: () => blogRequest<any[]>("categories", { token }),
  });

  const existing = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogRequest<any>(`blogs/${id}`, { token }),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing.data) setBlog({ ...emptyBlog, ...existing.data, seo: { ...emptyBlog.seo, ...(existing.data.seo || {}) } });
  }, [existing.data]);

  const update = (patch: Partial<typeof emptyBlog>) => setBlog((prev: any) => ({ ...prev, ...patch }));
  const updateSeo = (patch: any) => setBlog((prev: any) => ({ ...prev, seo: { ...prev.seo, ...patch } }));

  const onTitleChange = (t: string) => {
    const s = slugLocked ? slugify(t) : blog.slug;
    update({ title: t, slug: s });
  };

  const save = useMutation({
    mutationFn: async () => {
      const path = isEdit ? `blogs/${id}` : "blogs";
      const method = isEdit ? "PUT" : "POST";
      return blogRequest(path, { method, token, body: blog });
    },
    onSuccess: () => {
      toast.success("Post saved!");
      qc.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/dashboard/blogs");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleSave = (status?: string) => {
    if (!blog.title) return toast.error("Title required");
    if (!blog.category) return toast.error("Category required");
    if (status) update({ status });
    setTimeout(() => save.mutate(), 0);
  };

  const uploadGallery = async (files: FileList) => {
    setGalleryUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadToCloudinary));
      update({ gallery: [...blog.gallery, ...urls] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setGalleryUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
      <div className="space-y-4">
        <input
          value={blog.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Post title…"
          className="w-full text-2xl bg-[#111111] border border-[#2a2a2a] rounded-md px-4 py-3 text-white outline-none focus:border-campusGreen-600"
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-500">campushut.com/blog/</span>
          <input
            value={blog.slug}
            readOnly={slugLocked}
            onChange={(e) => update({ slug: e.target.value })}
            className="bg-transparent text-campusGreen-600 outline-none flex-1"
          />
          <button onClick={() => setSlugLocked(!slugLocked)}><Pencil className="w-4 h-4 text-campusGreen-600" /></button>
        </div>

        <textarea
          value={blog.excerpt}
          onChange={(e) => update({ excerpt: e.target.value })}
          rows={3}
          placeholder="Write a short description…"
          className="w-full bg-[#111111] border border-[#2a2a2a] rounded-md p-3 text-white outline-none focus:border-campusGreen-600"
        />

        <div data-color-mode="dark">
          <MDEditor value={blog.content} onChange={(v) => update({ content: v || "" })} height={450} />
        </div>

        <div>
          <label className="text-white text-sm mb-2 block">Featured Image</label>
          <ImageDropzone value={blog.featuredImage} onChange={(url) => update({ featuredImage: url })} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white text-sm">Gallery</label>
            <label className="cursor-pointer text-sm border border-campusGreen-600 text-campusGreen-600 px-3 py-1 rounded-md hover:bg-campusGreen-600 hover:text-white">
              Add to Gallery
              <input type="file" hidden multiple accept="image/*" onChange={(e) => e.target.files && uploadGallery(e.target.files)} />
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {blog.gallery.map((url: string, i: number) => (
              <div key={i} className="relative group">
                <img src={url} alt="" className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => update({ gallery: blog.gallery.filter((_: any, j: number) => j !== i) })}
                  className="absolute top-1 right-1 p-1 bg-red-600 rounded opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {galleryUploading && <div className="w-full h-24 rounded bg-[#1a1a1a] animate-pulse flex items-center justify-center"><Loader2 className="w-5 h-5 animate-spin text-campusGreen-600" /></div>}
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-20 self-start">
        {/* Publish */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
          <h3 className="text-white font-semibold">Publish</h3>
          <div>
            <div className="text-xs text-neutral-400 mb-1">Status</div>
            <div className="flex gap-1">
              {["draft", "published"].map((s) => (
                <button key={s} onClick={() => update({ status: s })} className={`flex-1 py-1.5 text-sm rounded ${blog.status === s ? "bg-campusGreen-600 text-white" : "bg-[#1a1a1a] text-neutral-400"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-1">Visibility</div>
            <div className="flex gap-1">
              {["public", "private"].map((v) => (
                <button key={v} onClick={() => update({ visibility: v })} className={`flex-1 py-1.5 text-sm rounded ${blog.visibility === v ? "bg-campusGreen-600 text-white" : "bg-[#1a1a1a] text-neutral-400"}`}>{v}</button>
              ))}
            </div>
          </div>
          <label className="flex items-center justify-between text-sm text-white">
            Featured
            <input type="checkbox" checked={blog.featured} onChange={(e) => update({ featured: e.target.checked })} className="accent-campusGreen-600" />
          </label>
          <label className="flex items-center justify-between text-sm text-white">
            Allow Comments
            <input type="checkbox" checked={blog.allowComments} onChange={(e) => update({ allowComments: e.target.checked })} className="accent-campusGreen-600" />
          </label>
          <div>
            <div className="text-xs text-neutral-400 mb-1">Reading Time (min)</div>
            <input type="number" value={blog.readingTime} onChange={(e) => update({ readingTime: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1 text-white text-sm" />
          </div>
          {blog.status === "published" && (
            <div>
              <div className="text-xs text-neutral-400 mb-1">Published At</div>
              <input
                type="datetime-local"
                value={blog.publishedAt ? String(blog.publishedAt).slice(0, 16) : ""}
                onChange={(e) => update({ publishedAt: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1 text-white text-sm"
              />
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <button disabled={save.isPending} onClick={() => handleSave("draft")} className="flex-1 border border-campusGreen-600 text-campusGreen-600 py-2 rounded text-sm">Save Draft</button>
            <button disabled={save.isPending} onClick={() => handleSave("published")} className="flex-1 bg-campusGreen-600 text-white py-2 rounded text-sm flex items-center justify-center gap-1">
              {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Publish
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
          <h3 className="text-white font-semibold flex items-center gap-2 mb-2"><TagIcon className="w-4 h-4 text-orange-500" /> Category</h3>
          <select value={blog.category} onChange={(e) => update({ category: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-2 text-white text-sm focus:border-campusGreen-600">
            <option value="">Select category…</option>
            {(cats.data?.categories || []).map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          {!blog.category && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>

        {/* Tags */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
          <h3 className="text-white font-semibold flex items-center gap-2 mb-2"><Hash className="w-4 h-4 text-campusGreen-600" /> Tags</h3>
          <TagInput value={blog.tags} onChange={(t) => update({ tags: t })} placeholder="Type and press Enter" />
        </div>

        {/* SEO */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
          <button onClick={() => setSeoOpen(!seoOpen)} className="w-full flex items-center justify-between text-white font-semibold">
            <span className="flex items-center gap-2"><Search className="w-4 h-4" /> SEO Settings</span>
            {seoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {seoOpen && (
            <div className="mt-3 space-y-3 text-sm">
              <input placeholder="Meta Title" value={blog.seo.metaTitle} onChange={(e) => updateSeo({ metaTitle: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white" />
              <textarea rows={2} placeholder="Meta Description" value={blog.seo.metaDescription} onChange={(e) => updateSeo({ metaDescription: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white" />
              <input placeholder="Focus Keyword" value={blog.seo.focusKeyword} onChange={(e) => updateSeo({ focusKeyword: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white" />
              <div>
                <div className="text-xs text-neutral-400 mb-1">Keywords</div>
                <TagInput color="green" value={blog.seo.keywords} onChange={(k) => updateSeo({ keywords: k })} />
              </div>
              <input placeholder="Canonical URL" value={blog.seo.canonicalUrl} onChange={(e) => updateSeo({ canonicalUrl: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white" />
              <input placeholder="OG Title" value={blog.seo.ogTitle} onChange={(e) => updateSeo({ ogTitle: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white" />
              <textarea rows={2} placeholder="OG Description" value={blog.seo.ogDescription} onChange={(e) => updateSeo({ ogDescription: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white" />
              <div>
                <div className="text-xs text-neutral-400 mb-1">OG Image</div>
                <ImageDropzone value={blog.seo.ogImage} onChange={(url) => updateSeo({ ogImage: url })} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
