import { BASE_URL } from "../config/localhostConfig";

export const getAllArtists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/artists`);
    if (!response.ok) {
      throw new Error("Sanatçıları getirirken hata oluştu");
    }
    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const getArtistBySpotifyId = async (spotifyId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/artists/${spotifyId}`);
    if (!response.ok) {
      throw new Error("Sanatçıyı getirirken hata oluştu");
    }
    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};
