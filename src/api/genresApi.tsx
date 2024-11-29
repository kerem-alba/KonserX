import { BASE_URL } from "../config/localhostConfig";

export const getGenresList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genres`);
    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};
