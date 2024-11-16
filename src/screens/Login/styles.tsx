import { StyleSheet, Dimensions } from "react-native";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  logo: {
    width: width,
    height: 300,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: TEXT_LIGHT,
  },
  spotifyButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  spotifyIcon: {
    marginRight: 10,
    color: PRIMARY_COLOR,
  },
  inputContainer: {
    marginTop: 20,
  },
  register: {
    alignItems: "center",
    padding: 10,
    color: PRIMARY_COLOR,
    textAlign: "center",
  },
});
