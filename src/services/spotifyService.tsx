import { getFollowedArtistsFromSpotify, getMostListenedArtistsFromSpotify } from "../api/spotifyApi";

export const getUserFavorites = async (accessToken: string) => {
  const followedArtists = await getFollowedArtistsFromSpotify(accessToken);
  const mostListenedArtists = await getMostListenedArtistsFromSpotify(accessToken);
  const favorites = [...mostListenedArtists, ...followedArtists];
  return favorites;
};
