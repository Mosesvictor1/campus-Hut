import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetailByTitle } from "@/apiServices/projectService";
import { useLocation, useNavigate } from "react-router-dom";

const ORIGINAL_PRICE = 50000;
const STUDENT_PRICE = 15000;

// Valid Unsplash campus/study image
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1800&q=80&auto=format&fit=crop";

function useQueryParam() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function parseToc(html: string): { heading: string; items: string[] }[] {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const chapters: { heading: string; items: string[] }[] = [];
  let current: { heading: string; items: string[] } | null = null;

  const walk = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      if (tag === "h3") {
        if (current) chapters.push(current);
        current = { heading: el.textContent?.trim() || "", items: [] };
        return;
      }
      el.childNodes.forEach(walk);
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text && current) current.items.push(text);
    }
  };

  doc.body.childNodes.forEach(walk);
  if (current) chapters.push(current);
  return chapters;
}

export default function ProjectDetail() {
  const params = useQueryParam();
  const title = params.get("title") || "";
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["projectDetail", title],
    queryFn: () => getProjectDetailByTitle(title),
    enabled: Boolean(title),
  });

  const result = (data as any)?.Title?.results?.[0];
  const chapters = result?.toc ? parseToc(result.toc) : [];

  const handleOrder = () => {
    const phone = "07030250057";
    const message = `Hello Campushut, I want to order the project: ${
      result?.title || title
    } (Dept: ${result?.dept || "N/A"}). Price: NGN ${STUDENT_PRICE}.`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.07); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ch-block { animation: fadeUp 0.4s ease both; }
        .hero-bg { animation: heroZoom 22s ease-in-out infinite alternate; }
      `}</style>

      <div className="min-h-screen bg-[#F6FAF6] ">

        {/* ══════════ HERO ══════════ */}
        <div
          className="relative flex items-end overflow-hidden"
          style={{ height: "clamp(380px, 50vw, 480px)", paddingTop: "72px" }}
        >
          {/* Hero background — reliable div-based bg image */}
          <div
            className="hero-bg absolute inset-0"
            style={{
              backgroundImage: `url('${HERO_IMAGE}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(6,24,6,0.12) 0%, rgba(8,44,8,0.60) 42%, rgba(4,16,4,0.96) 100%)",
            }}
          />

          {/* Diagonal shimmer texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(130deg, rgba(18,128,16,0.05) 0px, rgba(18,128,16,0.05) 1px, transparent 1px, transparent 60px)",
            }}
          />

          {/* Bottom green glow bleeding into page */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-48 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(18,128,16,0.22) 0%, transparent 68%)",
            }}
          />

          {/* Top-right corner accent */}
          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(18,128,16,0.18) 0%, transparent 65%)",
            }}
          />

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-10 pb-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/20 hover:text-white transition mb-5 cursor-pointer"
            >
              ← Back to projects
            </button>

            {isLoading && (
              <div className="space-y-3">
                <div className="h-4 w-36 bg-white/15 rounded-full animate-pulse" />
                <div className="h-8 w-3/4 bg-white/15 rounded-xl animate-pulse" />
              </div>
            )}

            {result && (
              <>
                {/* Dept badge */}
                <div className="inline-flex items-center gap-2 bg-campusGreen-600/30 border border-campusGreen-400/35 rounded-full px-3.5 py-1 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-campusGreen-400"
                    style={{ animation: "blink 2s ease-in-out infinite" }}
                  />
                  <span className="text-campusGreen-300 text-[10.5px] font-bold tracking-[0.12em] uppercase">
                    {result.dept}
                  </span>
                </div>

                {/* Project title */}
                <h1
                  className=" text-white font-black leading-[1.2]"
                  style={{
                    fontSize: "clamp(18px, 2.8vw, 28px)",
                    textShadow: "0 2px 20px rgba(0,0,0,0.35)",
                    maxWidth: "680px",
                  }}
                >
                  {result.title}
                </h1>
              </>
            )}
          </div>
        </div>

        {/* Wave divider */}
        <svg
          className="w-full -mt-px block"
          style={{ fill: "#F6FAF6" }}
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
        >
          <path d="M0,50L120,40C240,30,480,10,720,8C960,6,1200,22,1320,32L1440,42V50H0Z" />
        </svg>

        {/* ══════════ BODY ══════════ */}
        <div className="max-w-4xl mx-auto px-6 lg:px-10 pb-36">

          {/* Loading */}
          {isLoading && (
            <div className="space-y-4">
              <div className="h-20 rounded-2xl animate-pulse" style={{ background: "rgba(18,128,16,0.12)" }} />
              <div className="h-64 rounded-2xl bg-white border-[1.5px] border-[#E8F0E8] animate-pulse" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-[1.5px] border-red-200 rounded-2xl p-6 text-red-800 text-sm font-medium">
              ⚠️ Failed to load project details. Please refresh and try again.
            </div>
          )}

          {/* Not found */}
          {!isLoading && !result && !error && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-[#527052] text-base">
                No details available for this project.
              </p>
            </div>
          )}

          {result && (
            <>
              {/* Lock notice */}
              <div
                className="flex items-start gap-3 rounded-2xl p-5 mb-6 shadow-[0_4px_24px_rgba(18,128,16,0.18)]"
                style={{
                  background:
                    "linear-gradient(135deg, #128010 0%, #0d5c0c 100%)",
                }}
              >
                <span className="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <p className="text-white font-bold text-[14px] mb-0.5">
                    Full project available after purchase
                  </p>
                  <p className="text-campusGreen-100 text-[12.5px] leading-snug">
                    Preview the table of contents below, then order via WhatsApp
                    to receive the complete project instantly.
                  </p>
                </div>
              </div>

              {/* Table of Contents */}
              {chapters.length > 0 ? (
                <div className="bg-white border-[1.5px] border-[#DFF0DF] rounded-2xl overflow-hidden mb-6">
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-7 py-5 border-b border-[#EFF7EF]">
                    <span className="text-lg">📑</span>
                    <h2 className="text-[11px] font-bold tracking-[0.13em] uppercase text-campusGreen-600">
                      Table of Contents
                    </h2>
                    <span className="ml-auto bg-campusGreen-600 text-white text-[10.5px] font-bold px-2.5 py-0.5 rounded-full">
                      {chapters.length} chapters
                    </span>
                  </div>

                  {/* Chapter blocks */}
                  <div className="divide-y divide-[#EFF7EF]">
                    {chapters.map((ch, ci) => (
                      <div
                        key={ci}
                        className="ch-block"
                        style={{ animationDelay: `${ci * 60}ms` }}
                      >
                        {/* Chapter heading row */}
                        <div
                          className="flex items-center gap-3 px-6 py-3"
                          style={{ background: "linear-gradient(135deg, #128010 0%, #0d5c0c 100%)" }}
                        >
                          <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                            {ci + 1}
                          </div>
                          <span className="text-[12px] font-black tracking-wide text-white uppercase">
                            {ch.heading}
                          </span>
                        </div>

                        {/* Section items */}
                        <ul className="px-6 py-2">
                          {ch.items.map((item, ii) => (
                            <li
                              key={ii}
                              className="flex items-start gap-3 py-2.5 border-b border-dashed border-[#EFF7EF] last:border-0"
                            >
                              <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-campusGreen-500 flex-shrink-0" />
                              <span className="text-[13.5px] text-[#3a523a] leading-snug">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                result.toc && (
                  <div className="bg-white border-[1.5px] border-[#DFF0DF] rounded-2xl p-7 mb-6">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-campusGreen-600">
                        📑 Table of Contents
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-[#DFF0DF] to-transparent" />
                    </div>
                    <div
                      className="text-[13.5px] text-[#3a523a] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: result.toc }}
                    />
                  </div>
                )
              )}

              {/* Sticky order bar */}
              <div className="sticky bottom-6 bg-white border-2 border-[#DFF0DF] rounded-2xl px-6 py-5 shadow-[0_12px_48px_rgba(18,128,16,0.14)] flex items-center justify-between gap-5 flex-wrap relative overflow-hidden">
                {/* Green left bar */}
                <div className="absolute left-0 top-[18%] bottom-[18%] w-1 bg-gradient-to-b from-campusGreen-600 to-campusGreen-500 rounded-r-full" />

                {/* Price block */}
                <div className="flex flex-col gap-0.5 pl-3">
                  <span className="text-[12px] text-gray-400 line-through">
                    Original: ₦{ORIGINAL_PRICE.toLocaleString()}
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className=" text-[36px] font-black text-campusGreen-600 leading-none">
                      ₦{STUDENT_PRICE.toLocaleString()}
                    </span>
                    <span className="bg-[#e8f7e8] text-campusGreen-700 border border-[#B8D8B8] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full">
                      70% OFF
                    </span>
                  </div>
                  <span className="text-[11px] text-[#527052] mt-0.5">
                    Student price · Instant WhatsApp delivery
                  </span>
                </div>

                {/* WhatsApp order button */}
                <button
                  onClick={handleOrder}
                  className="flex items-center gap-2.5 bg-[#128C7E] hover:bg-[#0b6e63] active:scale-95 text-white font-bold text-[15px] rounded-2xl px-7 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(18,140,126,0.38)] cursor-pointer whitespace-nowrap"
                >
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#25D366" />
                    <path
                      d="M21 18.5c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.62.14-.19.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.24-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.62-1.52-.85-2.08-.23-.55-.46-.47-.62-.48-.16-.01-.35-.01-.53-.01-.19 0-.49.07-.74.35-.25.28-.97.95-.97 2.3s.99 2.67 1.13 2.86c.14.19 1.95 2.97 4.72 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.63-.67 1.86-1.31.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.54-.33z"
                      fill="#fff"
                    />
                  </svg>
                  Order via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}