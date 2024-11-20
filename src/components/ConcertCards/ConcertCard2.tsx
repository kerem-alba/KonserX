import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, Pressable } from "react-native";
import { Concert } from "../../utils/types";
import CartHeader from "./CardHeader";
import { TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";
import { RootStackParamList } from "../../navigations/type";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ConcertCard2({ concert }: { concert: Concert }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { ArtistName, Venue, City, ConcertDate, ImgUrl } = concert;
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate("ConcertDetails", { id: concert.Id })}>
      <ImageBackground source={{ uri: ImgUrl }} style={styles.image} resizeMode="cover">
        <CartHeader artistName={ArtistName} date={ConcertDate} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.city}>{City}</Text>
        <Text style={styles.venue} numberOfLines={1}>
          {Venue}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: width * 0.35,
    height: 250,
    marginVertical: 10,
    backgroundColor: TEXT_COLOR,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 2,
  },
  city: {
    fontSize: 14,
    color: TEXT_LIGHT,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  venue: {
    fontSize: 12,
    color: TEXT_LIGHT,
    marginTop: 5,
    textAlign: "center",
  },

  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },
});
