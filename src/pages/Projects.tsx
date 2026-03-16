import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllDepartments } from "@/apiServices/projectService";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1800&q=80&auto=format&fit=crop";

const deptIconMap: Record<string, string> = {
  accounting: "🧾",
  "adult education": "👩‍🎓",
  "agric and bioresources engineering": "🌿",
  "agric economics": "🌾",
  "agric extension": "🚜",
  "agricultural education": "🌱",
  "agricultural science education": "🌻",
  "agriculture and forestry": "🌲",
  anatomy: "🦴",
  "animal science": "🐄",
  "applied science": "🔬",
  "archaeology and tourism": "🏺",
  architecture: "🏛️",
  "art and design": "🎨",
  "art education": "🖌️",
  "banking and finance": "💰",
  biochemistry: "🧬",
  "biology edcuation": "🔭",
  botany: "🌿",
  building: "🏗️",
  "business administration": "📊",
  "business administration and management": "📊",
  "business edcuation": "📋",
  "chemical engineering": "⚗️",
  chemistry: "🧪",
  "chemistry edcuation": "🧫",
  "civil engineering": "🏗️",
  "co-operative economics and management": "🤝",
  "communication and linguistics": "💬",
  "computer education": "🖥️",
  "computer engineering": "💾",
  "computer science": "💻",
  criminology: "⚖️",
  "crop science": "🌽",
  dentistry: "🦷",
  dermatology: "🩺",
  economics: "📈",
  "economics education": "📉",
  "electrical electronics engineering": "⚡",
  "english and literary studies": "📖",
  entrepreneurship: "💡",
  "environmental management": "♻️",
  "environmental science": "🌍",
  "estate management": "🏘️",
  "fine and applied arts": "🖼️",
  "food science and technology": "🍽️",
  "food technology": "🥗",
  french: "🇫🇷",
  "general studies": "📚",
  "geo-science": "🌐",
  geography: "🗺️",
  geology: "🪨",
  geophysics: "🌋",
  "guidance and counselling": "🧠",
  "health and physical education": "🏃",
  "history and international studies": "📜",
  "home and rural economics": "🏡",
  "human nutrition and dietetics": "🥦",
  "human resource management": "👥",
  "industrial and production engineering": "🏭",
  "industrial chemistry": "🧲",
  insurance: "🛡️",
  "international relation": "🌐",
  law: "⚖️",
  "library and information science": "📚",
  "library science education": "📕",
  linguistics: "🔤",
  "m.sc accounting": "🧾",
  "m.sc management": "📊",
  marketing: "📣",
  "mass communication": "📡",
  "materials and metallurgical engineering": "🔩",
  mathematics: "∑",
  "mechanical engineering": "⚙️",
  "medical laboratory science": "🔬",
  "medical rehabilitation": "🏥",
  microbiology: "🦠",
  music: "🎵",
  nursing: "💊",
  "office technology": "🖨️",
  paediatrics: "👶",
  "petroleum engineering": "🛢️",
  pharmacy: "💉",
  philosophy: "🤔",
  physiology: "❤️",
  physiotheraphy: "🤸",
  "political science": "🗳️",
  psychology: "🧠",
  "public administration": "🏛️",
  "purchasing and supply": "📦",
  "pure and industrial chemistry": "🧪",
  "quantity surveying": "📐",
  radiography: "🩻",
  "religious and cultural studies": "🕌",
  "science education": "🔭",
  "secretarial administration and management": "🗂️",
  "secretarial studies": "📝",
  "sociology and anthropology": "👥",
  "soil science": "🌱",
  statistics: "📊",
  "surveying and geo-informatics": "📍",
  "technical education": "🔧",
  "theatre art": "🎭",
  "urban and regional planning": "🏙️",
  "veterinary medicine": "🐾",
  zoology: "🦁",
};

const getIcon = (dept: string): string => {
  const key = dept.toLowerCase().trim();
  if (deptIconMap[key]) return deptIconMap[key];
  for (const [k, v] of Object.entries(deptIconMap)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return "📁";
};

export default function Projects() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  const all: string[] = (data as any)?.Department?.departments || [];
  const departments = search
    ? all.filter((d) => d.toLowerCase().includes(search.toLowerCase()))
    : all;

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
        @keyframes cardUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dept-card { animation: cardUp 0.42s cubic-bezier(0.34,1.2,0.64,1) both; }
      `}</style>

      <div className="min-h-screen bg-[#F6FAF6] ">
        {/* ── HERO ── */}
        <div
          className="relative flex items-end overflow-hidden"
          style={{ height: "clamp(480px, 58vw, 580px)", paddingTop: "72px" }}
        >
          {/* BG image via div so it always renders */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${HERO_IMAGE}')`,
              backgroundPosition: "center 35%",
              animation: "heroZoom 18s ease-in-out infinite alternate",
            }}
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg, rgba(6,26,6,0.18) 0%, rgba(8,48,8,0.58) 40%, rgba(5,18,5,0.94) 100%)",
            }}
          />

          {/* Diagonal shimmer lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(120deg, rgba(18,128,16,0.06) 0px, rgba(18,128,16,0.06) 1px, transparent 1px, transparent 72px)",
            }}
          />

          {/* Top-left glow */}
          <div
            className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(18,128,16,0.28) 0%, transparent 65%)",
            }}
          />

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 pb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/40 rounded-full px-4 py-1.5 mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                style={{ animation: "blink 2s ease-in-out infinite" }}
              />
              <span className="text-yellow-400 text-[10.5px] font-bold tracking-[0.14em] uppercase">
                Campushut Research Portal
              </span>
            </div>

            <h1
              className=" text-white font-black leading-[1.07] mb-5"
              style={{
                fontSize: "clamp(36px,5.5vw,66px)",
                textShadow: "0 3px 32px rgba(0,0,0,0.35)",
              }}
            >
              Find Your{" "}
              <span className="text-campusGreen-500 italic">Perfect</span>
              <br />
              Research Resources
            </h1>

            <p className="text-white/70 text-[15.5px] leading-relaxed max-w-[500px] mb-8">
              <span>
                Browse thousands of educational research topics across all
                departments
              </span>{" "}
              <br />
              Get structured project materials instantly at affordable student
              prices
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: "🎓", label: "Student Friendly", accent: true },
                { icon: "📚", label: "Structured Material" },
                { icon: "📲", label: "WhatsApp Delivery" },
                { icon: "📚", label: "All Departments" },
              ].map(({ icon, label, accent }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold backdrop-blur-md border ${
                    accent
                      ? "bg-campusGreen-600 border-campusGreen-500 text-white"
                      : "bg-white/10 border-white/18 text-white"
                  }`}
                >
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg
          className="w-full -mt-px block"
          style={{ fill: "#F6FAF6" }}
          viewBox="0 0 1440 58"
          preserveAspectRatio="none"
        >
          <path d="M0,58L80,48C160,38,320,18,480,14C640,10,800,22,960,32C1120,42,1280,50,1360,54L1440,56V58H0Z" />
        </svg>

        {/* ── BODY ── */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
          {/* Section header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className=" text-2xl font-bold text-[#0f200f]">
                Browse by{" "}
                <span className="text-campusGreen-600 italic">Department</span>
              </h2>
              {!isLoading && !error && (
                <p className="text-sm text-[#527052] mt-1">
                  {departments.length} department
                  {departments.length !== 1 ? "s" : ""} available
                </p>
              )}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#527052] text-sm pointer-events-none">
                🔍
              </span>
              <input
                className="w-full pl-9 pr-4 py-2.5 border-[1.5px] border-[#D0E8D0] rounded-xl bg-white text-sm  text-[#0f200f] outline-none focus:border-campusGreen-600 focus:ring-2 focus:ring-campusGreen-600/10 placeholder:text-[#9CB89C] transition"
                placeholder="Search department…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 animate-pulse"
                  style={{ background: "rgba(18,128,16,0.12)" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-white/20 mb-4" />
                  <div className="h-2.5 w-2/5 rounded-full bg-white/20 mb-2.5" />
                  <div className="h-4 w-3/4 rounded-full bg-white/20 mb-2" />
                  <div className="h-3 w-1/2 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-[1.5px] border-red-200 rounded-2xl p-6 text-red-800 text-sm font-medium">
              ⚠️ Failed to load departments. Please refresh the page.
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && departments.length === 0 && (
            <div className="text-center py-20 text-[#527052] text-base">
              No departments match "<strong>{search}</strong>"
            </div>
          )}

          {/* ── GRID ── */}
          {!isLoading && !error && departments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {departments.map((dept: string, idx: number) => (
                <button
                  key={dept}
                  onClick={() =>
                    navigate(`/projects/${encodeURIComponent(dept)}`)
                  }
                  className="dept-card group relative rounded-2xl p-6 text-left overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(18,128,16,0.30)]"
                  style={{
                    background:
                      "linear-gradient(145deg, #128010 0%, #0d5c0c 55%, #0a4009 100%)",
                    animationDelay: `${Math.min(idx * 38, 500)}ms`,
                  }}
                >
                  {/* Shine sweep on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 50%)",
                    }}
                  />

                  {/* Watermark icon */}
                  <div className="absolute -bottom-2 -right-2 text-[72px] opacity-[0.08] group-hover:opacity-[0.14] pointer-events-none leading-none transition-opacity duration-200 select-none">
                    {getIcon(dept)}
                  </div>

                  {/* Icon box */}
                  <div className="w-12 h-12 rounded-[13px] bg-white/15 border border-white/20 flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-white/25">
                    {getIcon(dept)}
                  </div>

                  {/* Label */}
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/55 mb-1">
                    Department
                  </p>

                  {/* Name */}
                  <p className="text-[15px] font-bold text-white leading-snug">
                    {dept}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/15">
                    <span className="text-[12px] font-semibold text-white/70">
                      Browse projects
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-sm text-white transition-all duration-200 group-hover:bg-white group-hover:text-campusGreen-600 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
