import { StyleSheet } from "react-native";
import { PRIMARY_COLOR, TEXT_COLOR } from "../../utils/colors";

export const styles = StyleSheet.create({
  btn: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn_text: {
    color: TEXT_COLOR,
    fontSize: 16,
    textAlign: "center",
  },
});
