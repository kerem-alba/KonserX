import { BASE_URL } from "../config/localhostConfig";

export const getUserByEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}/users/email/${email}`);
  const data = await response.json();
  console.log("data by getUserByEmail", data);
  return data;
};

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

export const addFavoriteConcert = async (userId: number, concertId: number) => {
  const response = await fetch(`${BASE_URL}/users/add-favorite-concert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, concertId }),
  });

  const data = await response.json();
  return data;
};
