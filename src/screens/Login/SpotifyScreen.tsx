import { View, Text, Alert } from "react-native";
import { fetchAccessToken } from "../../services/spotifyAuthService";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { useSpotifyTokenStore } from "../../stores/spotifyTokenStore";
import { useProfileStore } from "../../stores/profileStore";
import { getUserProfileFromSpotify } from "../../api/spotifyApi";
import { spotifyAuthConfig, spotifyEndpoints } from "../../config/spotifyAuthConfig";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { BACKGROUND_COLOR } from "../../utils/colors";
import { syncSpotifyUser } from "../../api/usersApi";

type NavigationProps = StackNavigationProp<RootStackParamList, "Spotify">;

export default function SpotifyScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [request, response, promptAsync] = useAuthRequest(spotifyAuthConfig, spotifyEndpoints);

  useEffect(() => {
    if (request) {
      promptAsync();
    }
  }, [request]);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("Spotify authorization Code taken: ", code);
      handleSpotifyLogin(code);
    }
  }, [response]);

  const handleSpotifyLogin = async (code: string) => {
    console.log("Logging in with Spotify");
    try {
      const redirectUri = makeRedirectUri({ scheme: "exp" });
      const accessToken = await fetchAccessToken(code, redirectUri);
      console.log("Access Token taken: ", accessToken);
      useSpotifyTokenStore.getState().setSpotifyToken(accessToken);

      const userProfile = await getUserProfileFromSpotify(accessToken);
      useProfileStore.getState().setProfile({
        name: userProfile.display_name,
        email: userProfile.email,
        imageUrl: userProfile.images[0].url,
        spotifyId: userProfile.id,
      });

      syncSpotifyUser(userProfile)
        .then((data) => {
          console.log("Kullanıcı Senkronize Edildi:", data);
        })
        .catch((error) => {
          console.error("Kullanıcı senkronizasyon hatası:", error);
        });

      navigation.navigate("Main", { screen: "Home" });
    } catch (error) {
      Alert.alert("Error", "Failed to login with Spotify.");
    }
  };
  return (
    <View style={{ backgroundColor: BACKGROUND_COLOR }}>
      <Text></Text>
    </View>
  );
}
