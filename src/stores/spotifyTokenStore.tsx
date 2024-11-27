import { create } from "zustand";
import { setTokenToAsyncStore, getTokenFromAsyncStore, removeTokenFromAsync } from "../services/asyncStorageService";

interface SpotifyTokenState {
  spotifyToken: string | null;
  setSpotifyToken: (token: string) => void;
  loadSpotifyToken: () => Promise<void>;
  clearSpotifyToken: () => Promise<void>;
}

export const useSpotifyTokenStore = create<SpotifyTokenState>((set) => ({
  spotifyToken: null,
  setSpotifyToken: async (spotifyToken: string) => {
    set({ spotifyToken });
    await setTokenToAsyncStore(spotifyToken);
  },
  loadSpotifyToken: async () => {
    const spotifyToken = await getTokenFromAsyncStore();
    set({ spotifyToken });
  },
  clearSpotifyToken: async () => {
    set({ spotifyToken: null });
    await removeTokenFromAsync();
  },
}));
