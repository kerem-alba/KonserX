import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import UserHeader from "../../components/Header/UserHeader";
import ConcertGrid from "../../components/ConcertGrid/ConcertGrid";
import ConcertCarousel from "../../components/ConcertCarousel/ConcertCarousel";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { useTokenStore } from "../../stores/tokenStore";
import { fetchFavoriteConcerts } from "../../services/concertService";
import { getConcertsByUpcoming } from "../../api/concertsApi";
import { getConcertsByPopularity } from "../../api/concertsApi";
import { Concert } from "../../utils/types";
import { styles } from "./styles";

type NavigationProps = StackNavigationProp<RootStackParamList, "PopularConcerts">;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [favoriteConcerts, setFavoriteConcerts] = useState<Concert[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<Concert[]>([]);
  const [popularConcerts, setPopularConcerts] = useState<Concert[]>([]);

  const accessToken = useTokenStore((state) => state.token);

  useEffect(() => {
    const fetchConcerts = async () => {
      if (accessToken) {
        const upcomingConcerts = await getConcertsByUpcoming(10);
        const favoriteConcerts = await fetchFavoriteConcerts(accessToken);
        const popularConcerts = await getConcertsByPopularity(6);
        setPopularConcerts(popularConcerts);
        setFavoriteConcerts(favoriteConcerts);
        setUpcomingConcerts(upcomingConcerts);
      }
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
        <ConcertCarousel concerts={favoriteConcerts} header="Favorite Concerts" text="See all" onPress={() => navigateToFavoriteConcerts()} />
        <ConcertGrid concerts={popularConcerts} header="Popular Concerts" text="See all" onPress={() => navigateToPopularConcerts()} />
        <ConcertCarousel concerts={upcomingConcerts} header="Upcoming Concerts" text="See all" onPress={() => navigateToExplore()} />
        <View style={styles.footer}></View>
      </ScrollView>
    </View>
  );
}
