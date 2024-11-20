import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ConcertCard1 from "../ConcertCards/ConcertCard1";
import { ConcertGridProps } from "../../utils/types";
import { styles } from "./styles";

export default function ConcertGrid({ concerts, header, text, onPress }: ConcertGridProps) {
  const [visibleConcertCount, setVisibleConcertCount] = useState(8);
  const loadMoreConcerts = () => {
    setVisibleConcertCount((prevCount) => prevCount + 8);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}> {header} </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}> {text} </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={concerts.slice(0, visibleConcertCount)}
        keyExtractor={(item) => item.Id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            <ConcertCard1 concert={item} />
          </View>
        )}
        onEndReached={loadMoreConcerts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
