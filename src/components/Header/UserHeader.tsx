import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { styles } from "./styles";
import React, { useState, useEffect } from "react";
import { useProfileStore } from "../../stores/profileStore";
import { getAddressFromCoordinates } from "../../services/locationService";
import * as Location from "expo-location";
import Entypo from "@expo/vector-icons/Entypo";

export default function UserHeader() {
  const [locationText, setLocationText] = useState<string>("Waiting for location...");
  const userProfile = useProfileStore.getState().profile;

  useEffect(() => {
    handleLocation();
  }, []);

  const handleLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationText("İstanbul, Turkey");
      return;
    }
    let userLocation = await Location.getCurrentPositionAsync({});

    const address = await getAddressFromCoordinates(userLocation.coords.latitude, userLocation.coords.longitude);
    const formattedAddress = ` ${address.city || ""}, ${address.country || ""}`;
    setLocationText(formattedAddress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <Entypo name="location" size={16} color="#aaa" />
        <Text style={styles.locationText}>{locationText}</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.text}>{userProfile ? userProfile.name : "User"}</Text>
        <Pressable>
          <Image source={{ uri: userProfile?.imageUrl || "default_image_url" }} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
}
