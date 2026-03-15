import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByDepartment } from "@/apiServices/projectService";
import { useNavigate, useParams } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1800&q=80&auto=format&fit=crop";

export default function DepartmentProjects() {
  const { department } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["projects", department, page],
    queryFn: () => getProjectsByDepartment(department || "", page),
    enabled: Boolean(department),
  });

  const allTopics: Array<{ title: string }> =
    (data as any)?.Department?.topics || [];
  const totalPages: number = (data as any)?.Department?.total_pages || 1;

  const topics = useMemo(
    () =>
      search
        ? allTopics.filter((t) =>
            t.title.toLowerCase().includes(search.toLowerCase())
          )
        : allTopics,
    [allTopics, search]
  );

  const startNum = (page - 1) * allTopics.length + 1;

  return (
    <>
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes itemSlide {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .topic-item { animation: itemSlide 0.35s cubic-bezier(0.34,1.2,0.64,1) both; }
      `}</style>

      <div className="min-h-screen bg-[#F6FAF6] ">

        {/* ── HERO ── */}
        <div
          className="relative flex items-end overflow-hidden"
          style={{ height: "clamp(360px, 44vw, 460px)", paddingTop: "72px" }}
        >
          {/* BG via div — always paints */}
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url('${HERO_IMAGE}')`,
              backgroundPosition: "center 40%",
              animation: "heroZoom 20s ease-in-out infinite alternate",
            }}
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg, rgba(6,26,6,0.18) 0%, rgba(8,48,8,0.58) 38%, rgba(5,18,5,0.94) 100%)",
            }}
          />

          {/* Diagonal texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(18,128,16,0.055) 0px, rgba(18,128,16,0.055) 1px, transparent 1px, transparent 56px)",
            }}
          />

          {/* Corner glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(18,128,16,0.22) 0%, transparent 65%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 pb-12">
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-white/80 hover:bg-white/20 hover:text-white transition mb-5 cursor-pointer"
            >
              ← All Departments
            </button>

            <div className="inline-flex items-center gap-2 bg-campusGreen-600/25 border border-campusGreen-400/30 rounded-full px-3.5 py-1 mb-3 ml-3">
              <span className="text-campusGreen-300 text-[10px] font-bold tracking-[0.13em] uppercase">
                📂 Department Projects
              </span>
            </div>

            <h1
              className=" text-white font-black italic leading-[1.1] mb-4"
              style={{
                fontSize: "clamp(28px,4.5vw,52px)",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {department}
            </h1>

            {!isLoading && (
              <div className="flex flex-wrap gap-2.5">
                {[
                  `📄 ${allTopics.length} topics on this page`,
                  `📑 Page ${page} of ${totalPages}`,
                  `💰 ₦15,000 per project`,
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 backdrop-blur-md rounded-full px-3.5 py-1 text-[12.5px] font-medium text-white/75"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Wave divider */}
        <svg
          className="w-full -mt-px block"
          style={{ fill: "#F6FAF6" }}
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
        >
          <path d="M0,54L100,44C200,34,400,14,600,10C800,6,1000,18,1160,28C1280,35,1380,42,1440,46V54H0Z" />
        </svg>

        {/* ── BODY ── */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">

          {/* Search row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#527052] text-sm pointer-events-none">
                🔍
              </span>
              <input
                className="w-full pl-9 pr-4 py-2.5 border-[1.5px] border-[#D0E8D0] rounded-xl bg-white text-sm  text-[#0f200f] outline-none focus:border-campusGreen-600 focus:ring-2 focus:ring-campusGreen-600/10 placeholder:text-[#9CB89C] transition"
                placeholder="Search project titles on this page…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {!isLoading && !error && (
              <span className="inline-flex items-center justify-center bg-campusGreen-600 text-white text-[12.5px] font-bold rounded-full px-4 py-2 whitespace-nowrap">
                {topics.length} result{topics.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Skeletons */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[58px] rounded-2xl animate-pulse"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(18,128,16,0.18) 0%, rgba(10,64,9,0.18) 100%)",
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-[1.5px] border-red-200 rounded-2xl p-6 text-red-800 text-sm font-medium">
              ⚠️ Failed to load projects. Please try again.
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && topics.length === 0 && (
            <div className="text-center py-16 text-[#527052] text-base">
              {search ? `No results for "${search}"` : "No projects found."}
            </div>
          )}

          {/* ── Topic list — green cards ── */}
          {!isLoading && !error && topics.length > 0 && (
            <ul className="flex flex-col gap-3">
              {topics.map((t: any, idx: number) => (
                <li
                  key={idx}
                  className="topic-item"
                  style={{ animationDelay: `${Math.min(idx * 28, 450)}ms` }}
                >
                  <button
                    className="group relative flex items-center gap-4 w-full rounded-2xl px-5 py-4 text-left cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(18,128,16,0.28)]"
                    style={{
                      background:
                        "linear-gradient(145deg, #128010 0%, #0d5c0c 55%, #0a4009 100%)",
                    }}
                    onClick={() =>
                      navigate(`/project?title=${encodeURIComponent(t.title)}`)
                    }
                  >
                    {/* Shine sweep */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                      }}
                    />

                    {/* Number badge */}
                    <span className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-[11px] font-black text-white flex-shrink-0 tabular-nums">
                      {String(startNum + idx).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <span className="flex-1 text-[14px] font-medium text-white leading-snug">
                      {t.title}
                    </span>

                    {/* Arrow */}
                    <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white text-sm flex-shrink-0 transition-all duration-200 group-hover:bg-white group-hover:text-campusGreen-600 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          {!isLoading && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t-[1.5px] border-[#DFF0DF] flex-wrap gap-3">
              <p className="text-[13.5px] text-[#527052]">
                Page{" "}
                <strong className="text-[#0f200f]">{page}</strong> of{" "}
                <strong className="text-[#0f200f]">{totalPages}</strong>
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    setSearch("");
                  }}
                  className="flex items-center gap-1.5 bg-white border-[1.5px] border-[#D0E8D0] rounded-xl px-4 py-2 text-[13px] font-semibold text-[#0f200f] cursor-pointer transition hover:bg-campusGreen-600 hover:border-campusGreen-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage((p) => p + 1);
                    setSearch("");
                  }}
                  className="flex items-center gap-1.5 bg-white border-[1.5px] border-[#D0E8D0] rounded-xl px-4 py-2 text-[13px] font-semibold text-[#0f200f] cursor-pointer transition hover:bg-campusGreen-600 hover:border-campusGreen-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}