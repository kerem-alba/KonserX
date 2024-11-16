import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";
import { getConcertWithArtistInfoById } from "../../api/concertsApi";
import { ConcertWithDetails } from "../../utils/types";

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
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: concert?.ImgUrl || concert?.imageUrl }} style={styles.image} />

      <Text style={styles.title}>{concert?.name || concert?.ArtistName}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Artist:</Text> {concert?.ArtistName}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>City:</Text> {concert?.City}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Venue:</Text> {concert?.Venue}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Date:</Text> {concert?.ConcertDate}
        </Text>
        {concert?.genre1 && (
          <Text style={styles.detailText}>
            <Text style={styles.label}>Genres:</Text> {concert?.genre1}, {concert.genre2 || ""}, {concert.genre3 || ""}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#D3D3D3",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "white",
  },
});
