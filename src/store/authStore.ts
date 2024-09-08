import { create } from "zustand";
import axios from "../api/axiosConfig";
import { Role } from "./userStore";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  role: Role;
  login: (email: string, password: string) => Promise<void>;
  refreshTokens: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  userId: null,
  role: Role.USER,

  login: async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { accessToken, refreshToken, userId, role } = response.data;

      set({
        accessToken,
        refreshToken,
        userId,
        role,
      });

      console.log(accessToken, refreshToken, userId, role)

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Login failed", error);
    }
  },

  refreshTokens: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("/auth/refresh", {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const { accessToken } = response.data;
      set({ accessToken });

      localStorage.setItem("accessToken", accessToken);
    } catch {
      set({
        accessToken: null,
        refreshToken: null,
        userId: null,
        role: Role.USER,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  logout: () => {
    set({
      accessToken: null,
      refreshToken: null,
      userId: null,
      role: Role.USER,
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
}));
