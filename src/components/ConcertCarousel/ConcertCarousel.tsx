import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ConcertCard2 from "../ConcertCards/ConcertCard2";
import { ConcertCarouselProps } from "../../utils/types";
import { styles } from "../ConcertGrid/styles";

export default function ConcertCarousel({ concerts, header, text, onPress }: ConcertCarouselProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}> {header} </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}> {text} </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={concerts}
        renderItem={({ item }) => (
          <View>
            <ConcertCard2 concert={item} />
          </View>
        )}
        keyExtractor={(item) => item.Id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
