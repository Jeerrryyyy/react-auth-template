import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../api/axios";

export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<string>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        try {
          const response = await axios.post<{
            accessToken: string;
            refreshToken: string;
            user: User;
          }>("/auth/login", { email, password });
          set({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            user: response.data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
      refreshAuthToken: async () => {
        try {
          const response = await axios.post<{ accessToken: string }>(
            "/auth/refresh",
            null,
            {
              headers: { Authorization: `Bearer ${get().refreshToken}` },
            }
          );
          set({ accessToken: response.data.accessToken });
          return response.data.accessToken;
        } catch (error) {
          console.error("Token refresh failed:", error);
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
