import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BACKGROUND_COLOR } from "../../utils/colors";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"white"} size={"large"} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});
