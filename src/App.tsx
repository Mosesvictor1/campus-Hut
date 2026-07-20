import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Projects from "./pages/Projects";
import DepartmentProjects from "./pages/DepartmentProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import Categories from "./pages/admin/Categories";
import Comments from "./pages/admin/Comments";
import NewsList from "./pages/admin/NewsList";
import NewsEditor from "./pages/admin/NewsEditor";
import Settings from "./pages/admin/Settings";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const queryClient = new QueryClient();

const PublicChrome = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/dashboard") || pathname === "/login";
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

const AppRoutes = () => (
  <PublicChrome>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="blogs/new" element={<BlogEditor />} />
        <Route path="blogs/:id/edit" element={<BlogEditor />} />
        <Route path="categories" element={<Categories />} />
        <Route path="comments" element={<Comments />} />
        <Route path="news" element={<NewsList />} />
        <Route path="news/new" element={<NewsEditor />} />
        <Route path="news/:id/edit" element={<NewsEditor />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:department" element={<DepartmentProjects />} />
      <Route path="/project" element={<ProjectDetail />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </PublicChrome>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
