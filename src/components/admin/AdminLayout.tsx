import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { useAuthStore } from "@/store/authStore";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/blogs": "Blog Posts",
  "/dashboard/blogs/new": "New Blog Post",
  "/dashboard/categories": "Categories",
  "/dashboard/comments": "Comments",
  "/dashboard/news": "News Articles",
  "/dashboard/news/new": "New News Article",
  "/dashboard/settings": "Settings",
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = useAuthStore((s) => s.admin);

  let title = titleMap[pathname];
  if (!title) {
    if (pathname.includes("/blogs/") && pathname.endsWith("/edit")) title = "Edit Blog Post";
    else if (pathname.includes("/news/") && pathname.endsWith("/edit")) title = "Edit News Article";
    else title = "Dashboard";
  }

  const initials = admin?.username?.slice(0, 2).toUpperCase() || "AD";

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
            <button
              className="absolute top-4 right-[-40px] text-white p-2"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-neutral-400"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-white font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-neutral-400" />
            <div className="w-8 h-8 rounded-full bg-campusGreen-600 text-white flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
