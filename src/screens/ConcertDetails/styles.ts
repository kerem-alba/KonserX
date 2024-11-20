import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, TEXT_LIGHT } from "../../utils/colors";
import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  imageContainer: {
    alignItems: "center",
    height: 370,
  },
  backgroundImage: {
    width: width,
    height: 550,
  },
  artistImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: SECONDARY_COLOR,
    position: "absolute",
    marginTop: 130,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  artistNameContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    width: "100%",
    height: 80,
  },
  artistName: {
    fontSize: 28,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
    paddingTop: 20,
  },
  textContainer: {
    padding: 10,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  adressContainer: {
    width: width * 0.55,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  adressInnerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    width: "80%",
  },
  venue: {
    color: SECONDARY_COLOR,
  },
  city: {
    fontWeight: "bold",
    fontSize: 20,
    color: PRIMARY_COLOR,
    paddingTop: 5,
  },
  dateContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
    width: width * 0.35,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    alignItems: "center",
  },
  dateTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.35,
  },
  dayName: {
    fontSize: 16,
    fontWeight: "bold",
    color: SECONDARY_COLOR,
  },
  day: {
    fontSize: 30,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  month: {
    fontSize: 16,
    color: SECONDARY_COLOR,
  },
  year: {
    fontSize: 12,
    color: TEXT_LIGHT,
  },
});
