import { create } from "zustand";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  formattedAddress: string | null;
  setLocation: (latitude: number, longitude: number, formattedAddress: string) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  latitude: null,
  longitude: null,
  formattedAddress: null,
  setLocation: (latitude, longitude, formattedAddress) => {
    set({ latitude, longitude, formattedAddress });
  },
}));
