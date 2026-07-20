import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, Calendar, Eye } from "lucide-react";
import { blogRequest } from "@/lib/api";
import { format } from "date-fns";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["public-blogs", { search, category }],
    queryFn: () =>
      blogRequest<any>("blogs", {
        body: {
          status: "published",
          ...(search && { search }),
          ...(category && { category }),
        },
      }),
  });

  const cats = useQuery({
    queryKey: ["public-categories"],
    queryFn: () => blogRequest<any>("categories"),
  });

  const posts = data?.blogs || [];
  const featured = useMemo(() => posts.find((p: any) => p.featured) || posts[0], [posts]);
  const rest = useMemo(
    () => (featured ? posts.filter((p: any) => p.id !== featured.id) : posts),
    [featured, posts]
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CampusHut Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights, guides, and stories for the modern African student.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-3 mb-10 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-campusGreen-600 outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 focus:border-campusGreen-600 outline-none bg-white"
          >
            <option value="">All Categories</option>
            {(cats.data?.categories || []).map((c: any) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No posts found.</p>
        ) : (
          <>
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                className="group grid md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-2xl overflow-hidden mb-12 hover:shadow-xl transition"
              >
                <div className="aspect-[16/10] md:aspect-auto bg-gray-100 overflow-hidden">
                  {featured.featuredImage && (
                    <img
                      src={featured.featuredImage}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-xs px-2 py-1 rounded bg-campusGreen-50 text-campusGreen-700 font-medium w-fit">
                    Featured · {featured.category}
                  </span>
                  <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-campusGreen-600">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-3 text-gray-600 line-clamp-3">{featured.excerpt}</p>
                  )}
                  <div className="mt-5 flex items-center gap-4 text-xs text-gray-500">
                    {featured.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(featured.publishedAt), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {rest.map((p: any) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition"
                >
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                    {p.featuredImage && (
                      <img
                        src={p.featuredImage}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
