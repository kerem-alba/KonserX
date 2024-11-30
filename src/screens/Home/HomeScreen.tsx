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
import Loading from "../../components/Loading/Loading";
import { styles } from "./styles";

type NavigationProps = StackNavigationProp<RootStackParamList, "PopularConcerts">;

export default function HomeScreen() {
  console.log("HomeScreen");
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    fetchConcerts();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <UserHeader />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <ConcertCarousel
            concerts={favoriteConcerts}
            header="İlgini çekebilecek konserler"
            text="Tümünü gör"
            onPress={() => navigation.navigate("FavoriteConcerts")}
          />
          <ConcertGrid
            concerts={popularConcerts}
            header="Popüler konserler"
            text="Tümünü gör"
            onPress={() => navigation.navigate("PopularConcerts")}
          />
          <ConcertCarousel
            concerts={upcomingConcerts}
            header="Yaklaşan konserler"
            text="Tümünü gör"
            onPress={() => navigation.navigate("Main", { screen: "Explore" })}
          />
          <View style={styles.footer}></View>
        </ScrollView>
      )}
    </View>
  );
}
