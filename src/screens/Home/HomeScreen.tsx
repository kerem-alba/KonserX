import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import UserHeader from "../../components/Header/UserHeader";
import ConcertGrid from "../../components/ConcertGrid/ConcertGrid";
import ConcertCarousel from "../../components/ConcertCarousel/ConcertCarousel";
import { useTokenStore } from "../../stores/tokenStore";
import { fetchFavoriteConcerts } from "../../services/concertService";
import { getConcertsByUpcoming } from "../../api/concertsApi";
import { getConcertsByPopularity } from "../../api/concertsApi";
import { Concert } from "../../utils/types";
import { styles } from "./styles";

export default function HomeScreen() {
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

  return (
    <ScrollView style={styles.container}>
      <UserHeader />
      <ConcertCarousel concerts={favoriteConcerts} header="Favorite Concerts" text="See all" />
      <ConcertGrid concerts={popularConcerts} header="Popular Concerts" text="See all" />
      <ConcertCarousel concerts={upcomingConcerts} header="Upcoming Concerts" text="See all" />
      <Text>HomeScreen</Text>
    </ScrollView>
  );
}
