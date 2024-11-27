import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ConcertGrid from "../../components/ConcertGrid/ConcertGrid";
import { Concert } from "../../utils/types";
import { getConcertsByPopularity } from "../../api/concertsApi";
import UserHeader from "../../components/Header/UserHeader";
import { styles } from "./styles";

export default function PopularConcertsScreen() {
  const [popularConcerts, setPopularConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      const popularConcerts = await getConcertsByPopularity(40);
      setPopularConcerts(popularConcerts);
    };
    fetchConcerts();
  }, []);

  return (
    <View style={styles.container}>
      <UserHeader />
      <ConcertGrid concerts={popularConcerts} header="Populer Konserler" text="" />
    </View>
  );
}
