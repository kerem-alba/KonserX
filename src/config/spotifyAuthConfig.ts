import { makeRedirectUri } from "expo-auth-session";
import { SPOTIFY_CLIENT_ID } from "../../secrets/secrets.json";

export const spotifyAuthConfig = {
  clientId: SPOTIFY_CLIENT_ID,
  scopes: ["user-read-email", "playlist-modify-public", "user-top-read", "user-follow-read"],
  usePKCE: false,
  redirectUri: makeRedirectUri({ scheme: "exp" }),
};

export const spotifyEndpoints = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
