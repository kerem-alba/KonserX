import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";
import { getConcertWithArtistInfoById } from "../../api/concertsApi";
import { ConcertWithDetails } from "../../utils/types";
import UserHeader from "../../components/Header/UserHeader";
import { BlurView } from "expo-blur";
import { BACKGROUND_COLOR } from "../../utils/colors";

type RouteProps = RouteProp<RootStackParamList, "ConcertDetails">;

export default function ConcertDetails() {
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const [concert, setConcert] = useState<ConcertWithDetails | null>(null);

  useEffect(() => {
    const fetchConcert = async () => {
      const concert = await getConcertWithArtistInfoById(id);
      setConcert(concert);
    };
    fetchConcert();
  }, [id]);

  return (
    <View style={styles.container}>
      <UserHeader />
      <ImageBackground source={{ uri: concert?.ImgUrl }} resizeMode="cover">
        <View>
          <Image source={{ uri: concert?.imageUrl }} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
