import { getAddressFromCoordinates } from "../api/locationApi";
import * as Location from "expo-location";
import { useLocationStore } from "../stores/locationStore";
import { currentCity } from "../utils/constants";

export const initializeLocation = async () => {
  const { setLocation } = useLocationStore.getState();

  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocation(41.0082, 28.9784, "İstanbul, Turkey");
      currentCity.value = "İstanbul";
      console.log("Default location set: İstanbul");
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    const address = await getAddressFromCoordinates(userLocation.coords.latitude, userLocation.coords.longitude);

    // Adresi  'a kaydet
    const formattedAddress = `${address.city || ""}, ${address.country || ""}`;
    setLocation(userLocation.coords.latitude, userLocation.coords.longitude, formattedAddress);
    currentCity.value = address.city;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error initializing location:", error.message);
    } else {
      console.error("Error initializing location:", error);
    }
  }
};
