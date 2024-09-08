import { create } from "zustand";
import axios from "../api/axiosConfig";
import { useAuthStore } from "./authStore";

export enum Role {
  USER,
  ADMIN,
}

interface User {
  id: number;
  email: string;
  role: Role;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,

  fetchUsers: async () => {
    const { accessToken } = useAuthStore.getState();
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await axios.get("/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set({ users: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },

  fetchUserById: async (id: number) => {
    const { accessToken } = useAuthStore.getState();
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await axios.get(`/user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set({ currentUser: response.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },

  createUser: async (email: string, password: string) => {
    try {
      const response = await axios.post("/user/create", { email, password });
      const newUser = response.data;
      set((state) => ({
        users: [...state.users, newUser],
      }));
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  },
}));