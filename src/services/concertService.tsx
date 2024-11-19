import { getUserFavorites } from "./spotifyService";
import { getConcertsByFavoriteArtists, getConcertsByFavoriteGenres } from "../api/concertsApi";
import { ConcertWithDetails, SpotifyArtist, Concert } from "../utils/types";
import { genreMappings } from "../utils/genres";
import { startOfToday, endOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export const fetchFavoriteConcerts = async (spotifyAccessToken: string) => {
  const favoriteArtists = await getUserFavorites(spotifyAccessToken);
  const favoriteConcerts = await getConcertsByFavoriteArtists(favoriteArtists);

  const topGenres = await getMostListenedGenres(favoriteArtists);
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
    genres: [concert.genre1, concert.genre2, concert.genre3].filter(Boolean), // genre1, genre2, genre3
    ImgUrl: concert.ImgUrl,
    popularity: 0,
    Venue: concert.Venue,
  }));

  const combinedConcerts: Concert[] = [...mappedFavoriteConcerts, ...mappedGenreConcerts];

  return combinedConcerts;
};

export const filterConcerts = (
  concerts: ConcertWithDetails[],
  cities: string[],
  genres: string[],
  selectedDate: string,
  selectedCustomDate: Date | null
) => {
  const allGenres =
    genres.includes("Tüm") || genres.length === 0
      ? []
      : genres.flatMap((genre) => genreMappings[genre] || [genre]).filter((genre) => typeof genre === "string");

  const filteredConcerts = concerts.filter((concert) => {
    const cityMatch =
      cities.includes("Tüm") ||
      cities.some((city) => {
        if (city === "İstanbul") {
          return concert.City.toLowerCase() === "istanbul avrupa" || concert.City.toLowerCase() === "istanbul anadolu";
        }
        return concert.City.toLowerCase() === city.toLowerCase();
      });

    const genreMatch =
      allGenres.length === 0 ||
      allGenres.some((genre) =>
        [concert.genre1, concert.genre2, concert.genre3].some((g) => g && typeof g === "string" && g.toLowerCase().includes(genre.toLowerCase()))
      );

    const concertDate = new Date(concert.ConcertDate);
    let dateMatch = true;

    if (selectedDate === "Bugün") {
      dateMatch = isWithinInterval(concertDate, { start: startOfToday(), end: endOfToday() });
    } else if (selectedDate === "Bu Hafta") {
      dateMatch = isWithinInterval(concertDate, { start: startOfWeek(new Date()), end: endOfWeek(new Date()) });
    } else if (selectedDate === "Bu Ay") {
      dateMatch = isWithinInterval(concertDate, { start: startOfMonth(new Date()), end: endOfMonth(new Date()) });
    } else if (selectedDate === "Tarih Seç" && selectedCustomDate) {
      dateMatch = concertDate.toDateString() === selectedCustomDate.toDateString();
    }

    return cityMatch && genreMatch && dateMatch;
  });

  return filteredConcerts.sort((a, b) => new Date(a.ConcertDate).getTime() - new Date(b.ConcertDate).getTime());
};

export const getMostListenedGenres = async (artists: SpotifyArtist[]) => {
  const genres = artists.flatMap((artist) => [artist.genre1, artist.genre2, artist.genre3]).filter(Boolean);
  const genreCounts = genres.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([genre]) => genre);
};
