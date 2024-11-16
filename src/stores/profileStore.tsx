import { create } from "zustand";

export interface Profile {
  name: string | null;
  email: string | null;
  spotifyId: string | null;
  imageUrl: string | null;
}
interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile: Profile) => set({ profile }),
}));
