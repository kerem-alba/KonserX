import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import ConcertCard2 from "../ConcertCards/ConcertCard2";
import { ConcertCarouselProps } from "../../utils/types";
import { styles } from "./style";

export default function ConcertCarousel({ concerts, header, text }: ConcertCarouselProps) {
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
        renderItem={({ item }) => <ConcertCard2 concert={item} />}
        keyExtractor={(item) => item.Id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
