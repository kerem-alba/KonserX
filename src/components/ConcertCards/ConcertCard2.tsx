import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Concert } from "../../utils/types";
import CartHeader from "./CardHeader";
import { TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";

const { width } = Dimensions.get("window");

export default function ConcertCard2({ concert }: { concert: Concert }) {
  const { ArtistName, Venue, City, ConcertDate, ImgUrl } = concert;
  return (
    <View style={styles.box}>
      <ImageBackground source={{ uri: ImgUrl }} style={styles.image} resizeMode="cover">
        <CartHeader artistName={ArtistName} date={ConcertDate} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.city}>{City}</Text>
        <Text style={styles.venue} numberOfLines={1}>
          {Venue}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
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
