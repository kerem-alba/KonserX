import { BASE_URL } from "../config/localhostConfig";
import { Artist, Concert, ConcertWithDetails } from "../utils/types";

export const getAllConcerts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/concerts`);
    return await response.json();
  } catch (error) {
    console.error("Konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByCity = async (city: string) => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/city?city=${city}`);
    return await response.json();
  } catch (error) {
    console.error("Şehir bazlı konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByFavoriteArtists = async (favorites: Artist[]) => {
  const favoriteArtists = favorites.map((artist) => artist.name).join(",");
  try {
    const response = await fetch(`${BASE_URL}/concerts/favorites?favoriteArtists=${encodeURIComponent(favoriteArtists)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Favori sanatçılara göre konserleri getirirken hata oluştu");
    }

    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const getConcertsByRelatedArtistNames = async (relatedArtists: Concert[]) => {
  const relatedArtistNames = relatedArtists.join(",");
  try {
    const response = await fetch(`${BASE_URL}/concerts/favorites?favoriteArtists=${encodeURIComponent(relatedArtistNames)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Benzer sanatçılara göre konserleri getirirken hata oluştu");
    }

    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const getConcertsByPopularity = async (limit: number) => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/populars?limit=${limit}`);
    return await response.json();
  } catch (error) {
    console.error("Popüler konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByUpcoming = async (limit: number) => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/upcoming?limit=${limit}`);
    return await response.json();
  } catch (error) {
    console.error("Yaklaşan konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertWithArtistInfoById = async (id: number): Promise<ConcertWithDetails> => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/withdetails/${id}`);
    if (!response.ok) {
      throw new Error(`API Hatası: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Belirtilen konser ve sanatçı bilgilerini getirirken hata oluştu:", error);
    throw error;
  }
};

export const getAllConcertsWithArtistInfo = async (): Promise<ConcertWithDetails[]> => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/allwithdetails`);
    if (!response.ok) {
      throw new Error(`API Hatası: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Tüm konser ve sanatçı bilgilerini getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByFavoriteGenres = async (genres: string[]): Promise<any> => {
  if (!Array.isArray(genres) || genres.length === 0) {
    throw new Error("Türler listesi boş veya tanımlanmamış.");
  }

  const favoriteGenres = genres.join(",");

  try {
    const response = await fetch(`${BASE_URL}/concerts/bygenres?genres=${encodeURIComponent(favoriteGenres)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Favori türlere göre konserleri getirirken hata oluştu: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hata:", error instanceof Error ? error.message : error);
    throw error;
  }
};
