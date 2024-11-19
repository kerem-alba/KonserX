import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  innerContainer: {
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: TEXT_LIGHT,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: TEXT_LIGHT,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    marginEnd: 30,
  },
  locationText: {
    fontSize: 12,
    color: TEXT_LIGHT,
    paddingHorizontal: 8,
  },
});
