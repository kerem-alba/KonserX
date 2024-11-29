import { Artist } from "./types";

export const formatArtistData = (artist: Artist) => {
  return {
    name: artist.name,
    id: artist.id,
    popularity: artist.popularity || null,
    genre1: artist.genres[0] || null,
    genre2: artist.genres[1] || null,
    genre3: artist.genres[2] || null,
    imageUrl1: artist.images[0] ? artist.images[0].url : null,
    imageUrl2: artist.images[1] ? artist.images[1].url : null,
  };
};
