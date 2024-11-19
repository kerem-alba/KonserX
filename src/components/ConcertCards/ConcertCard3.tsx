import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Concert } from "../../utils/types";
import { ConcertWithDetails } from "../../utils/types";

const { width } = Dimensions.get("window");

export default function ConcertCard3({ concert }: { concert: ConcertWithDetails }) {
  return (
    <View style={styles.box}>
      <Image source={{ uri: concert.ImgUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artistName}>{concert.ArtistName}</Text>
        <Text style={styles.city}>{concert.City}</Text>
        <Text style={styles.venue}>{concert.Venue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: width * 0.4,
    height: 250,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    padding: 10,
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  venue: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },
  city: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});