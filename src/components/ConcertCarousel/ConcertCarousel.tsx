import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import ConcertCard2 from "../ConcertCards/ConcertCard2";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";
import { ConcertCarouselProps } from "../../utils/types";
import { styles } from "../ConcertGrid/styles";

export default function ConcertCarousel({ concerts, header, text }: ConcertCarouselProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}> {header} </Text>
        <TouchableOpacity>
          <Text style={styles.text}> {text} </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={concerts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ConcertDetails", { id: item.Id })}>
            <ConcertCard2 concert={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.Id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
