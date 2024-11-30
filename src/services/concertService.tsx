import { getUserFavorites } from "./spotifyService";
import { getConcertsByFavoriteArtists, getConcertsByFavoriteGenres } from "../api/concertsApi";
import { ConcertWithDetails, SpotifyArtist, Concert } from "../utils/types";
import { getGenresList } from "../api/genresApi";
import { genres } from "../utils/constants";

export const fetchFavoriteConcerts = async (spotifyAccessToken: string) => {
  const favoriteArtists = await getUserFavorites(spotifyAccessToken);
  const favoriteConcerts = await getConcertsByFavoriteArtists(favoriteArtists);

  const topGenres = await getMostListenedGenres(favoriteArtists);
  console.log("Top genres:", topGenres);
  const genreConcerts = await getConcertsByFavoriteGenres(topGenres);

  const mappedFavoriteConcerts: Concert[] = favoriteConcerts.map((concert: any) => ({
    ArtistName: concert.ArtistName,
    City: concert.City,
    Id: concert.Id,
    ConcertDate: concert.ConcertDate,
    genres: [],
    ImgUrl: concert.ImgUrl,
    popularity: 0,
    Venue: concert.Venue,
  }));

  const mappedGenreConcerts: Concert[] = genreConcerts.map((concert: any) => ({
    ArtistName: concert.ArtistName,
    City: concert.City,
    Id: concert.ConcertId,
    ConcertDate: concert.ConcertDate,
    genres: [concert.genre1, concert.genre2, concert.genre3].filter(Boolean),
    ImgUrl: concert.ImgUrl,
    popularity: 0,
    Venue: concert.Venue,
  }));

  const combinedConcerts: Concert[] = [...mappedFavoriteConcerts, ...mappedGenreConcerts].filter(
    (concert, index, self) => index === self.findIndex((c) => c.Id === concert.Id)
  );
  return combinedConcerts;
};

export const getMostListenedGenres = async (artists: SpotifyArtist[]) => {
  const genres = artists.flatMap((artist) => [artist.genre1, artist.genre2, artist.genre3]).filter(Boolean);
  const genreCounts = genres.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 13)
    .map(([genre]) => genre);
};

export const fetchGenres = async (): Promise<string[]> => {
  try {
    const genresFetched = await getGenresList();
    genres.value = genresFetched;
    return genresFetched;
  } catch (error) {
    console.error("Türler alınamadı:", error);
    throw error;
  }
};
