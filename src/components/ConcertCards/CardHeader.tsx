import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";

const formatDateParts = (dateString: string) => {
  let date: Date;

  if (dateString.includes("T")) {
    date = new Date(dateString);
  } else if (dateString.includes(".")) {
    const [day, month, year] = dateString.split(".").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    throw new Error(`Unsupported date format: ${dateString}`);
  }

  const dayName = date.toLocaleDateString("tr-TR", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("tr-TR", { month: "long" });
  return { dayName: dayName.toUpperCase(), day, month };
};

const CardHeader = ({ artistName, date }: { artistName: string; date: string }) => {
  const { dayName, day, month } = formatDateParts(date);

  return (
    <BlurView style={styles.headerContainer} intensity={30} tint="dark" experimentalBlurMethod="dimezisBlurView">
      <View style={styles.dateContainer}>
        <Text style={styles.dayName}>{dayName}</Text>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
      <Text style={styles.artistName}>{artistName}</Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    backgroundColor: TEXT_COLOR,
  },
  dayName: {
    fontSize: 8,
    fontWeight: "bold",
    color: TEXT_LIGHT,
  },
  day: {
    fontSize: 22,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    margin: -5,
  },
  month: {
    fontSize: 8,
    color: PRIMARY_COLOR,
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
    color: SECONDARY_COLOR,
    textAlign: "center",
    flex: 1,
    marginLeft: 10,
  },
});

export default CardHeader;
