import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101510",
    paddingBottom: 262,
  },
  gridContainer: {
    marginHorizontal: 10,
  },
  citySelection: {
    flexDirection: "row",
    marginVertical: 10,
  },
  cityText: {
    marginRight: 15,
    fontSize: 14,
    color: "#FF8F00",
    borderWidth: 1,
    borderColor: "#FF8F00",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  genreSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 3,
  },
  genreText: {
    marginRight: 10,
    fontSize: 14,
    color: "#06D001",
    borderWidth: 1,
    borderColor: "#06D001",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 3,
  },
  dateSelection: {
    flexDirection: "row",
    marginVertical: 5,
  },
  dateText: {
    marginRight: 10,
    fontSize: 14,
    color: "#1A73E8",
    borderWidth: 1,
    borderColor: "#1A73E8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 3,
  },
  selectedGenreText: {
    fontWeight: "bold",
    color: "#101510",
    backgroundColor: "#06D001",
  },
  selectedCityText: {
    fontWeight: "bold",
    color: "#101510",
    backgroundColor: "#FF8F00",
  },
  selectedDateText: {
    fontWeight: "bold",
    color: "#101510",
    backgroundColor: "#1A73E8",
  },
});
