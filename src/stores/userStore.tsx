import { create } from "zustand";

export interface User {
  id: number | null;
  displayName: string | null;
  email: string | null;
  profileImage: string | null;
  favorites: string[] | null;
}
interface UserState {
  User: User | null;
  setUser: (User: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  User: null,
  setUser: (User: User) => set({ User }),
}));
