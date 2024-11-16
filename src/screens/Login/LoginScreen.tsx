import { View, Text, Image, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { fetchAccessToken } from "../../services/spotifyAuthService";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
const logoSource = require("../../../assets/LoginLogo.jpg");
import Entypo from "@expo/vector-icons/Entypo";
import { useTokenStore } from "../../stores/tokenStore";
import { useProfileStore } from "../../stores/profileStore";
import { getUserProfileFromSpotify } from "../../services/spotifyService";
import { spotifyAuthConfig, spotifyEndpoints } from "../../config/spotifyAuthConfig";

type NavigationProps = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const handleRegister = () => {
    console.log("Register");
  };

  const [request, response, promptAsync] = useAuthRequest(spotifyAuthConfig, spotifyEndpoints);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("Authorization Code taken: ", code);
      handleSpotifyLogin(code);
    }
  }, [response]);

  const handleSpotifyLogin = async (code: string) => {
    console.log("Logging in with Spotify");
    try {
      const redirectUri = makeRedirectUri({ scheme: "exp" });
      const accessToken = await fetchAccessToken(code, redirectUri);
      console.log("Access Token taken: ", accessToken);
      useTokenStore.getState().setToken(accessToken);

      const userProfile = await getUserProfileFromSpotify(accessToken);
      useProfileStore.getState().setProfile({
        name: userProfile.display_name,
        email: userProfile.email,
        imageUrl: userProfile.images[0].url,
        spotifyId: userProfile.id,
      });

      navigation.navigate("Main");
    } catch (error) {
      Alert.alert("Error", "Failed to login with Spotify.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoSource} style={styles.logo} />
      <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => console.log(values)}>
        {({ handleChange, handleSubmit, values, isValid }) => (
          <ScrollView style={styles.inputContainer}>
            <Input
              labelText="Email"
              placeholder="Please enter your email address"
              value={values.email}
              onChangeText={handleChange("email")}
              errorText="Email is required"
            />
            <PasswordInput labelText="Password" value={values.password} onChangeText={handleChange("password")} errorText="Password is required" />
            <Button onPress={handleSubmit} text="Login" disabled={!isValid} />
            <Text style={styles.text}> Sign Up With</Text>
            <TouchableOpacity style={styles.spotifyButton} onPress={() => promptAsync()}>
              <Entypo name="spotify" size={64} style={styles.spotifyIcon} />
            </TouchableOpacity>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.register}>Register Now</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
