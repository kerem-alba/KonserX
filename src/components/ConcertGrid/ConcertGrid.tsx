import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import ConcertCard1 from "../ConcertCards/ConcertCard1";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";
import { ConcertGridProps } from "../../utils/types";
import { styles } from "./styles";

export default function ConcertGrid({ concerts, header, text }: ConcertGridProps) {
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
        style={styles.flatList}
        data={concerts}
        keyExtractor={(item) => item.Id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ConcertDetails", { id: item.Id })}>
            <ConcertCard1 concert={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
