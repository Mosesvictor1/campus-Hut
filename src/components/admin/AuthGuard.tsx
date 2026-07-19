import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const clear = useAuthStore((s) => s.clear);

  const authed = !!token && !!expiresAt && expiresAt > Date.now();

  useEffect(() => {
    if (token && expiresAt && expiresAt <= Date.now()) clear();
  }, [token, expiresAt, clear]);

  if (!authed) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}
