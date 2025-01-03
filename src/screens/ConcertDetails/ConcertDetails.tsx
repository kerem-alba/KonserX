import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";
import { getConcertWithArtistInfoById } from "../../api/concertsApi";
import UserHeader from "../../components/Header/UserHeader";
import { BlurView } from "expo-blur";
import { styles } from "./styles";
import Entypo from "@expo/vector-icons/Entypo";
import { formatDateParts } from "../../services/dateService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import { useUserStore } from "../../stores/userStore";
import { addFavoriteConcert } from "../../api/usersApi";

type RouteProps = RouteProp<RootStackParamList, "ConcertDetails">;

export default function ConcertDetails() {
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const [isValid, setIsValid] = useState(true);

  const user = useUserStore((state) => state.User);

  console.log("user", user);

  const { data, isPending, error, isSuccess, isError, isLoading, refetch } = useQuery({
    queryKey: ["ConcertDetails", id],
    queryFn: () => getConcertWithArtistInfoById(id),
  });

  const dateParts = data?.ConcertDate ? formatDateParts(data.ConcertDate) : null;

  useEffect(() => {
    if (user && user.favorites && user.favorites.includes(id.toString())) {
      setIsValid(false);
    }
  }, []);

  const handleFollow = async () => {
    setIsValid(false);
    if (user && user.id !== null) {
      const currentFavorites = user.favorites || [];
      if (!currentFavorites.includes(id.toString())) {
        const updatedFavorites = [...currentFavorites, id.toString()];
        useUserStore.getState().setUser({ ...user, favorites: updatedFavorites });
        await addFavoriteConcert(user.id, id);
      }
    }
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      {isPending ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground source={{ uri: data?.ImgUrl }} style={styles.backgroundImage} resizeMode="cover">
              <BlurView intensity={20} style={styles.blurView} tint="dark" experimentalBlurMethod="dimezisBlurView" />
            </ImageBackground>
            <Image source={{ uri: data?.imageUrl }} style={styles.artistImage} />
          </View>
          <View style={styles.artistNameContainer}>
            <Text style={styles.artistName}>{data?.ArtistName}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.adressContainer}>
              <Entypo name="location-pin" size={44} color="lightgray" />
              <View style={styles.adressInnerContainer}>
                <Text style={styles.venue}>{data?.Venue}</Text>
                <Text style={styles.city}>{data?.City}</Text>
              </View>
            </View>
            {dateParts && (
              <View style={styles.dateContainer}>
                <Entypo name="calendar" size={44} color="lightgray" />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dayName}>{dateParts.dayName}</Text>
                  <Text style={styles.day}>{dateParts.day}</Text>
                  <Text style={styles.month}>{dateParts.month}</Text>
                  <Text style={styles.year}>{dateParts.year}</Text>
                </View>
              </View>
            )}
          </View>
          <Button onPress={handleFollow} text="Takip Et" disabled={!isValid} />
        </ScrollView>
      )}
    </View>
  );
}
