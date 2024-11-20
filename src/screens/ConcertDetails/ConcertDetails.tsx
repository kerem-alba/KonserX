import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";
import { getConcertWithArtistInfoById } from "../../api/concertsApi";
import { ConcertWithDetails } from "../../utils/types";
import UserHeader from "../../components/Header/UserHeader";
import { BlurView } from "expo-blur";
import { styles } from "./styles";
import Entypo from "@expo/vector-icons/Entypo";

type RouteProps = RouteProp<RootStackParamList, "ConcertDetails">;

export default function ConcertDetails() {
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const [concert, setConcert] = useState<ConcertWithDetails | null>(null);
  const [dateParts, setDateParts] = useState<{ dayName: string; day: number; month: string; year: number }>({
    dayName: "",
    day: 0,
    month: "",
    year: 0,
  });

  useEffect(() => {
    const fetchConcert = async () => {
      const concert = await getConcertWithArtistInfoById(id);
      setConcert(concert);

      if (concert?.ConcertDate) {
        const parts = formatDateParts(concert.ConcertDate);
        setDateParts(parts);
      }
    };
    fetchConcert();
  }, [id]);

  const formatDateParts = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" }); // Gün ismi
    const day = date.getDate(); // Gün
    const month = date.toLocaleDateString("tr-TR", { month: "long" }); // Ay ismi
    const year = date.getFullYear(); // Yıl

    return {
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1), // İlk harfi büyük
      day,
      month,
      year,
    };
  };

  return (
    <View style={styles.container}>
      <UserHeader />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: concert?.ImgUrl }} style={styles.backgroundImage} resizeMode="cover">
            <BlurView intensity={20} style={styles.blurView} tint="dark" experimentalBlurMethod="dimezisBlurView" />
          </ImageBackground>
          <Image source={{ uri: concert?.imageUrl }} style={styles.artistImage} />
        </View>
        <View style={styles.artistNameContainer}>
          <Text style={styles.artistName}>{concert?.ArtistName}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.adressContainer}>
            <Entypo name="location-pin" size={44} color="lightgray" />
            <View style={styles.adressInnerContainer}>
              <Text style={styles.venue}>{concert?.Venue}</Text>
              <Text style={styles.city}>{concert?.City}</Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Entypo name="calendar" size={44} color="lightgray" />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dayName}>{dateParts.dayName}</Text>
              <Text style={styles.day}>{dateParts.day}</Text>
              <Text style={styles.month}>{dateParts.month}</Text>
              <Text style={styles.year}>{dateParts.year}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
