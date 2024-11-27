import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: TEXT_LIGHT,
  },
  inputContainer: {
    flex: 1,
  },
});
