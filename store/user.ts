import { create } from "zustand";

type auth = {
  user: string;
  isLoggedIn: boolean;
  setUser: (name: string) => void;
  setIsLoggedIn: (x: boolean) => void;
};

export const useAuthStore = create<auth>((set) => ({
  user: "",
  isLoggedIn: false,
  setUser: (name: string) => {
    set({ user: name });
  },
  setIsLoggedIn: (x: boolean) => {
    set({ isLoggedIn: x });
  },
}));
