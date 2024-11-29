import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../navigations/type";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { getTokenFromAsyncStore } from "../../services/asyncStorageService";
import { initializeLocation } from "../../services/locationService";
import { fetchGenres } from "../../services/concertService";

type NavigationProps = BottomTabScreenProps<RootStackParamList, "Intro">["navigation"];

export default function IntroductionScreen() {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getTokenFromAsyncStore();
      if (token == null || token == "") {
        console.log("token empty, going to login");
        navigation.navigate("Login");
      } else {
        navigation.navigate("Login");

        //navigation.navigate("Main", { screen: "Home" });
        console.log("token found going home");
      }
    };

    checkToken();
    initializeLocation();
    fetchGenres();
  }, []);

  return (
    <View>
      <Text>IntroductionScreen</Text>
    </View>
  );
}
