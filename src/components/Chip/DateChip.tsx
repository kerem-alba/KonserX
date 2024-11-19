import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../utils/colors";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });
};

const DateChip = ({ date }: { date: string }) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{formatDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  chipText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default DateChip;
