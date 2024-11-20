import { StyleSheet } from "react-native";
import { TEXT_LIGHT } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "gray",
    textAlign: "left",
    paddingLeft: 10,
  },
  flatList: {
    padding: 10,
  },
});
