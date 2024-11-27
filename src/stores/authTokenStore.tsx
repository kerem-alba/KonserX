import { create } from "zustand";
import { setTokenToAsyncStore, getTokenFromAsyncStore, removeTokenFromAsync } from "../services/asyncStorageService";

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  loadToken: () => Promise<void>;
  clearToken: () => Promise<void>;
}

export const useTokenStore = create<TokenState>((set) => ({
  token: null,
  setToken: async (token: string) => {
    set({ token });
    await setTokenToAsyncStore(token);
  },
  loadToken: async () => {
    const token = await getTokenFromAsyncStore();
    set({ token });
  },
  clearToken: async () => {
    set({ token: null });
    await removeTokenFromAsync();
  },
}));
