import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Admin } from "@/types/index"

interface AuthState {
  token: string | null
  admin: Admin | null
  isLoading: boolean
  setAuth: (token: string, admin: Admin) => void
  clearAuth: () => void
  setToken: (token: string) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isLoading: false,
      setAuth: (token, admin) => set({ token, admin }),
      clearAuth: () => set({ token: null, admin: null }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
