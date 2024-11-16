import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_LIGHT } from "../../utils/colors";

export const styles = StyleSheet.create({
  input_container: {
    marginBottom: 8,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },

  password_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  errorText: {
    color: "red",
    paddingTop: 6,
    fontSize: 12,
  },
});
