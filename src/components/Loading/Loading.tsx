import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
