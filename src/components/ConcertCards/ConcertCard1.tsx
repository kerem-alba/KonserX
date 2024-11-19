import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Concert } from "../../utils/types";
import { TEXT_LIGHT } from "../../utils/colors";
import { BlurView } from "expo-blur";
import DateChip from "../../components/Chip/DateChip";
import Entypo from "@expo/vector-icons/Entypo";

const { width } = Dimensions.get("window");

export default function ConcertCard1({ concert }: { concert: Concert }) {
  const { ArtistName, Venue, City, ConcertDate, ImgUrl } = concert;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: ImgUrl }} style={styles.image} resizeMode="cover">
        <View style={styles.date}>
          <DateChip date={ConcertDate} />
        </View>
        <BlurView style={styles.textOverlay} intensity={30} tint="dark" experimentalBlurMethod="dimezisBlurView">
          <Text style={styles.artistName}>{ArtistName}</Text>
          <Text style={styles.city}>{City}</Text>

          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={16} color="#aaa" />
            <Text style={styles.venue} numberOfLines={1}>
              {Venue}
            </Text>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.45,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
    flex: 1,
  },
  textOverlay: {
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 5,
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_LIGHT,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  city: {
    fontSize: 14,
    marginTop: 5,
    color: TEXT_LIGHT,
  },
  venue: {
    fontSize: 10,
    color: TEXT_LIGHT,
    width: width * 0.388,
  },
  date: {
    marginTop: 5,
    alignSelf: "flex-end",
  },
});
