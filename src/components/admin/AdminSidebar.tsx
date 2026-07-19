import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tag,
  MessageSquare,
  Newspaper,
  Settings,
  LogOut,
  Feather,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { blogRequest } from "@/lib/api";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Overview",
    items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Blog Management",
    items: [
      { to: "/dashboard/blogs", label: "Blog Posts", icon: FileText },
      { to: "/dashboard/categories", label: "Categories", icon: Tag },
      { to: "/dashboard/comments", label: "Comments", icon: MessageSquare },
    ],
  },
  {
    label: "News Management",
    items: [{ to: "/dashboard/news", label: "News Articles", icon: Newspaper }],
  },
  {
    label: "Account",
    items: [{ to: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const admin = useAuthStore((s) => s.admin);
  const token = useAuthStore((s) => s.token);
  const clear = useAuthStore((s) => s.clear);

  const initials = admin?.username?.slice(0, 2).toUpperCase() || "AD";

  const handleLogout = async () => {
    try {
      await blogRequest("auth/logout", { method: "POST", token, body: {} });
    } catch {
      /* ignore */
    }
    clear();
    navigate("/login");
  };

  return (
    <aside className="w-[260px] shrink-0 bg-[#111111] border-r border-[#2a2a2a] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-campusGreen-600 flex items-center justify-center">
            <Feather className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-bold leading-tight">CampusHut</div>
            <div className="text-neutral-400 text-xs">CMS Dashboard</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-campusGreen-600 text-white flex items-center justify-center text-sm font-semibold">
            {initials}
          </div>
          <div>
            <div className="text-white text-sm font-medium leading-tight">
              {admin?.username || "Admin"}
            </div>
            <div className="text-neutral-500 text-xs">{admin?.email || ""}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {sections.map((section) => (
          <div key={section.label} className="mb-2">
            <div className="text-neutral-500 text-xs uppercase px-3 mt-4 mb-1 tracking-wider">
              {section.label}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={(item as any).end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 relative",
                    isActive
                      ? "bg-campusGreen-600 text-white border-l-4 border-orange-400 pl-2"
                      : "text-neutral-400 hover:bg-[#1a1a1a] hover:text-white"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-[#2a2a2a] p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-[#1a1a1a]"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
