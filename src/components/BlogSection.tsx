import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Eye } from "lucide-react";
import { blogRequest } from "@/lib/api";
import { format } from "date-fns";

const BlogSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["public-blogs-home"],
    queryFn: () => blogRequest<any>("blogs", { body: { status: "published" } }),
  });

  const posts = (data?.blogs || []).slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              From the CampusHut Blog
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Study tips, career advice, and campus stories to help you thrive.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-campusGreen-600 hover:text-campusGreen-700 font-semibold"
          >
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p: any) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                  {p.featuredImage ? (
                    <img
                      src={p.featuredImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  {p.category && (
                    <span className="text-xs px-2 py-1 rounded bg-campusGreen-50 text-campusGreen-700 font-medium">
                      {p.category}
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-campusGreen-600 line-clamp-2">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                    {p.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(p.publishedAt), "MMM d, yyyy")}
                      </span>
                    )}
                    {typeof p.views === "number" && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {p.views}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
