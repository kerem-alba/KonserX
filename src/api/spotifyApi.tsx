import { formatArtistData } from "../services/spotifyService";

export const getUserProfileFromSpotify = async (accessToken: string) => {
  const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userProfile = await userProfileResponse.json();
  return userProfile;
};

export const getArtistByIdFromSpotify = async (accessToken: string, artistId: string) => {
  const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const artist = await artistResponse.json();
  return artist;
};

export const getFollowedArtistsFromSpotify = async (accessToken: string) => {
  const followedArtistsResponse = await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const response = await followedArtistsResponse.json();
  const followedArtistsData = response.artists.items.map(formatArtistData);
  return followedArtistsData;
};

export const getMostListenedArtistsFromSpotify = async (accessToken: string) => {
  const userTopArtistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const response = await userTopArtistsResponse.json();
  const userTopArtistsData = response.items.map(formatArtistData);
  return userTopArtistsData;
};

export const getRelatedArtistNames = async (artists: any[], accessToken: string) => {
  const uniqueArtistNames = new Set<string>();

  for (const artist of artists) {
    try {
      const relatedArtistsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!relatedArtistsResponse.ok) {
        console.error(`Error fetching related artists for ${artist.name}`);
        continue;
      }

      const response = await relatedArtistsResponse.json();
      const relatedArtistsNames = response.artists.slice(0, 3).map((relatedArtist: any) => relatedArtist.name);

      relatedArtistsNames.forEach((name: string) => uniqueArtistNames.add(name));
    } catch (error) {
      console.error(`Error fetching related artists for ${artist.name}: ${error}`);
    }
  }

  return Array.from(uniqueArtistNames);
};
