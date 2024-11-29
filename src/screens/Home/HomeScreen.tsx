import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import UserHeader from "../../components/Header/UserHeader";
import ConcertGrid from "../../components/ConcertGrid/ConcertGrid";
import ConcertCarousel from "../../components/ConcertCarousel/ConcertCarousel";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { useSpotifyTokenStore } from "../../stores/spotifyTokenStore";
import { fetchFavoriteConcerts } from "../../services/concertService";
import { getConcertsByUpcoming } from "../../api/concertsApi";
import { getConcertsByPopularity } from "../../api/concertsApi";
import { Concert } from "../../utils/types";
import { styles } from "./styles";

type NavigationProps = StackNavigationProp<RootStackParamList, "PopularConcerts">;

export default function HomeScreen() {
  console.log("HomeScreen");
  const navigation = useNavigation<NavigationProps>();
  const [appIsReady, setAppIsReady] = useState(false);

  const [favoriteConcerts, setFavoriteConcerts] = useState<Concert[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<Concert[]>([]);
  const [popularConcerts, setPopularConcerts] = useState<Concert[]>([]);

  const accessToken = useSpotifyTokenStore((state) => state.spotifyToken);
  console.log("accessToken", accessToken);

  useEffect(() => {
    const fetchConcerts = async () => {
      const upcomingConcerts = await getConcertsByUpcoming(10);
      const popularConcerts = await getConcertsByPopularity(6);
      setUpcomingConcerts(upcomingConcerts);
      setPopularConcerts(popularConcerts);
      if (accessToken) {
        const favoriteConcerts = await fetchFavoriteConcerts(accessToken);
        setFavoriteConcerts(favoriteConcerts);
      }
      setAppIsReady(true);
    };
    fetchConcerts();
  }, [accessToken]);

  const navigateToPopularConcerts = () => {
    navigation.navigate("PopularConcerts");
  };

  const navigateToFavoriteConcerts = () => {
    navigation.navigate("FavoriteConcerts");
  };

  const navigateToExplore = () => {
    navigation.navigate("Main", { screen: "Explore" });
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      <ScrollView>
        <ConcertCarousel
          concerts={favoriteConcerts}
          header="İlgini çekebilecek konserler"
          text="Tümünü gör"
          onPress={() => navigateToFavoriteConcerts()}
        />
        <ConcertGrid concerts={popularConcerts} header="Popüler konserler" text="Tümünü gör" onPress={() => navigateToPopularConcerts()} />
        <ConcertCarousel concerts={upcomingConcerts} header="Yaklaşan konserler" text="Tümünü gör" onPress={() => navigateToExplore()} />
        <View style={styles.footer}></View>
      </ScrollView>
    </View>
  );
}
