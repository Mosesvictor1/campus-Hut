import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { Calendar, Eye, MessageCircle, ArrowLeft, Loader2, Send } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { blogRequest } from "@/lib/api";

const BlogDetail = () => {
  const { slug } = useParams();
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["public-blogs-all"],
    queryFn: () => blogRequest<any>("blogs", { body: { status: "published" } }),
  });

  const post = useMemo(
    () => (list.data?.blogs || []).find((b: any) => b.slug === slug),
    [list.data, slug]
  );

  const related = useMemo(
    () =>
      (list.data?.blogs || [])
        .filter((b: any) => b.slug !== slug && (!post || b.category === post.category))
        .slice(0, 3),
    [list.data, slug, post]
  );

  // Increment view once per post per session
  useEffect(() => {
    if (!post?.id) return;
    const key = `viewed_blog_${post.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    blogRequest(`blogs/${post.id}/view`, { method: "POST" }).catch(() => {});
  }, [post?.id]);

  const comments = useQuery({
    queryKey: ["public-comments", post?.id],
    queryFn: () =>
      blogRequest<any>("comments", { body: { blogId: post.id, status: "approved" } }),
    enabled: !!post?.id,
  });

  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const submit = useMutation({
    mutationFn: () =>
      blogRequest("comments", {
        method: "POST",
        body: { blogId: post.id, ...form },
      }),
    onSuccess: () => {
      toast.success("Comment submitted! It will appear after approval.");
      setForm({ name: "", email: "", content: "" });
      qc.invalidateQueries({ queryKey: ["public-comments", post?.id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (list.isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-campusGreen-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-campusGreen-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const approvedComments = comments.data?.comments || [];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-campusGreen-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {post.category && (
          <span className="text-xs px-2 py-1 rounded bg-campusGreen-50 text-campusGreen-700 font-medium">
            {post.category}
          </span>
        )}

        <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </span>
          )}
          {typeof post.views === "number" && (
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {post.views} views
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" /> {approvedComments.length} comments
          </span>
          {post.readingTime ? <span>· {post.readingTime} min read</span> : null}
        </div>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="mt-8 w-full rounded-2xl aspect-[16/9] object-cover"
          />
        )}

        {post.excerpt && (
          <p className="mt-8 text-lg text-gray-700 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        )}

        <div className="mt-8 prose prose-lg max-w-none" data-color-mode="light">
          <MDEditor.Markdown
            source={post.content || ""}
            style={{ background: "transparent", color: "#1f2937" }}
          />
        </div>

        {post.gallery?.length > 0 && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {post.gallery.map((url: string, i: number) => (
              <img key={i} src={url} alt="" className="rounded-lg aspect-square object-cover" />
            ))}
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t: string) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Comments */}
        {post.allowComments !== false && (
          <section className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-campusGreen-600" />
              Comments ({approvedComments.length})
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.name || !form.email || !form.content)
                  return toast.error("All fields required");
                submit.mutate();
              }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3 mb-8"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-campusGreen-600 outline-none bg-white"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="Your email (not shown)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-campusGreen-600 outline-none bg-white"
                />
              </div>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
                placeholder="Share your thoughts…"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-campusGreen-600 outline-none bg-white"
              />
              <div className="flex justify-end">
                <button
                  disabled={submit.isPending}
                  className="inline-flex items-center gap-2 bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-5 py-2.5 rounded-lg font-medium disabled:opacity-60"
                >
                  {submit.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Post Comment
                </button>
              </div>
            </form>

            {comments.isLoading ? (
              <div className="text-gray-500 text-sm">Loading comments…</div>
            ) : approvedComments.length === 0 ? (
              <p className="text-gray-500 text-sm">Be the first to comment.</p>
            ) : (
              <div className="space-y-5">
                {approvedComments.map((c: any) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-campusGreen-100 text-campusGreen-700 flex items-center justify-center font-semibold">
                      {(c.name || c.author || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {c.name || c.author}
                        </span>
                        {c.createdAt && (
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                        {c.content || c.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p: any) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                    {p.featuredImage && (
                      <img
                        src={p.featuredImage}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-campusGreen-600">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;
