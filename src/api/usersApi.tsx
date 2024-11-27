import { BASE_URL } from "../config/localhostConfig";

export const syncSpotifyUser = async (profile: any) => {
  const response = await fetch(`${BASE_URL}/users/spotify-sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  const data = await response.json();
  return data;
};
