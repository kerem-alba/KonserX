import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { styles } from "./styles";
import React, { useState, useEffect } from "react";
import { useProfileStore } from "../../stores/profileStore";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_COLOR } from "../../utils/colors";
import { StatusBar } from "expo-status-bar";
import { useLocationStore } from "../../stores/locationStore";

export default function UserHeader() {
  const userProfile = useProfileStore.getState().profile;
  const formattedAddress = useLocationStore.getState().formattedAddress;

  return (
    <View>
      <StatusBar style="light" />
      <LinearGradient style={styles.container} colors={[PRIMARY_COLOR, "transparent"]} end={[0.5, 0.8]}>
        <View style={styles.innerContainer}>
          <View style={styles.location}>
            <Entypo name="location" size={16} color="lightgray" />
            <Text style={styles.locationText}>{formattedAddress || "Waiting for location..."}</Text>
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.text}>{userProfile ? userProfile.name : "User"}</Text>
            <Pressable>
              <Image source={{ uri: userProfile?.imageUrl || "default_image_url" }} style={styles.image} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
