import { StyleSheet, Dimensions } from "react-native";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    flex: 1,
    width: width,
    resizeMode: "cover",
    marginBottom: -40,
  },
});
