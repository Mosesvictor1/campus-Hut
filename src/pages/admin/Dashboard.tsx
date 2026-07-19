import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, MessageSquare, Tag, Newspaper, Layers } from "lucide-react";
import { blogRequest, newsRequest } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function StatCard({ icon: Icon, label, value, accent }: any) {
  const border = accent === "green" ? "border-l-campusGreen-600" : "border-l-orange-600";
  return (
    <div className={`bg-[#111111] border border-[#2a2a2a] border-l-4 ${border} rounded-lg p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-neutral-400 text-sm">{label}</div>
          <div className="text-white text-3xl font-bold mt-1">{value}</div>
        </div>
        <Icon className={accent === "green" ? "text-campusGreen-600 w-8 h-8" : "text-orange-600 w-8 h-8"} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const token = useAuthStore((s) => s.token);

  const blogStats = useQuery({
    queryKey: ["dashboard-blog"],
    queryFn: () => blogRequest<any>("dashboard", { token }),
  });

  const news = useQuery({
    queryKey: ["dashboard-news"],
    queryFn: () => newsRequest<any>("api/news/getAllNews?page=0&size=1000"),
  });

  const newsList: any[] = Array.isArray(news.data) ? news.data : news.data?.content || [];
  const uniqueTypes = new Set(newsList.map((n) => n.newsType)).size;

  const recentBlogList: any[] = blogStats.data?.recentBlogs || [];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-white mb-3">Blog Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogStats.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 bg-[#1a1a1a]" />)
          ) : (
            <>
              <StatCard icon={FileText} label="Total Blogs" value={blogStats.data?.totals?.blogs ?? 0} accent="green" />
              <StatCard icon={CheckCircle} label="Published" value={blogStats.data?.totals?.published ?? 0} accent="green" />
              <StatCard icon={MessageSquare} label="Pending Comments" value={blogStats.data?.totals?.pendingComments ?? 0} accent="green" />
              <StatCard icon={Tag} label="Categories" value={blogStats.data?.totals?.categories ?? 0} accent="orange" />
            </>
          )}
        </div>
      </section>

      <div className="border-t border-[#2a2a2a]" />

      <section>
        <h2 className="text-lg font-semibold text-white mb-3">News Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {news.isLoading ? (
            Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24 bg-[#1a1a1a]" />)
          ) : (
            <>
              <StatCard icon={Newspaper} label="Total News" value={newsList.length} accent="orange" />
              <StatCard icon={Layers} label="News Types" value={uniqueTypes} accent="orange" />
            </>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4">
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Recent Blog Posts</h3>
            <Link to="/dashboard/blogs" className="text-campusGreen-600 text-sm">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-neutral-500 text-xs uppercase">
                <tr>
                  <th className="text-left py-2">Title</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBlogList.slice(0, 5).map((b: any) => (
                  <tr key={b.id} className="border-t border-[#2a2a2a]">
                    <td className="py-2 text-white truncate max-w-[180px]">{b.title}</td>
                    <td><span className="text-xs px-2 py-0.5 rounded bg-orange-600 text-white">{b.category}</span></td>
                    <td>
                      <span className={`text-xs px-2 py-0.5 rounded ${b.status === "published" ? "bg-campusGreen-600" : "bg-neutral-700"} text-white`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-neutral-400 text-xs">{b.publishedAt ? format(new Date(b.publishedAt), "MMM d") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Recent News Articles</h3>
            <Link to="/dashboard/news" className="text-campusGreen-600 text-sm">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-neutral-500 text-xs uppercase">
                <tr>
                  <th className="text-left py-2">Title</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Author</th>
                </tr>
              </thead>
              <tbody>
                {newsList.slice(0, 5).map((n: any) => (
                  <tr key={n.id} className="border-t border-[#2a2a2a]">
                    <td className="py-2 text-white truncate max-w-[180px]">{n.title}</td>
                    <td><span className="text-xs px-2 py-0.5 rounded bg-orange-600 text-white">{n.newsType}</span></td>
                    <td className="text-neutral-400 text-xs">{n.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
