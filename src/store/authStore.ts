import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  expiresAt: number | null;
  admin: AdminUser | null;
  setAuth: (data: { token: string; expiresAt: number; admin: AdminUser }) => void;
  clear: () => void;
  isAuthed: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: null,
      admin: null,
      setAuth: ({ token, expiresAt, admin }) => set({ token, expiresAt, admin }),
      clear: () => set({ token: null, expiresAt: null, admin: null }),
      isAuthed: () => {
        const { token, expiresAt } = get();
        if (!token || !expiresAt) return false;
        return expiresAt > Date.now();
      },
    }),
    { name: "campushut-admin-auth" }
  )
);
