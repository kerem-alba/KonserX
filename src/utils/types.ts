export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: { url: string }[];
}

export interface SpotifyArtist {
  genre1: string;
  genre2: string;
  genre3: string;
  id: string;
  imageUrl1: string;
  imageUrl2: string;
  name: string;
  popularity: number;
}

export interface Concert {
  ArtistName: string;
  City: string;
  Id: number;
  ConcertDate: string;
  genres: string[];
  ImgUrl: string;
  popularity: number;
  Venue: string;
}

export type ConcertWithDetails = {
  ArtistName: string;
  City: string;
  ConcertDate: string;
  ConcertUrl: string;
  Id: number;
  ImgUrl: string;
  Venue: string;
  genre1: string | null;
  genre2: string | null;
  genre3: string | null;
  imageUrl: string;
  name: string;
  popularity: number;
  spotifyId: string;
};

export type User = {
  email: string;
  id: number;
  password: string;
  spotifyId: string;
};

export interface ConcertCarouselProps {
  concerts: Concert[];
  header: string;
  text: string;
  onPress?: () => void;
}

export interface ConcertGridProps {
  concerts: Concert[];
  header: string;
  text: string;
  onPress?: () => void;
}
