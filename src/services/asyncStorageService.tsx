import AsyncStorage from "@react-native-async-storage/async-storage";
import { header } from "../utils/constants";

export const setTokenToAsyncStore = async (token: string) => {
  await AsyncStorage.setItem("token", token);
  header.token = token;
  console.log("Token set in async store:", token);
};

export const getTokenFromAsyncStore = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    header.token = token;
    console.log("Token found in async store:", token);
    return token;
  }
  console.log("Token not found in async store");
  return "";
};

export const removeTokenFromAsync = async () => {
  await AsyncStorage.removeItem("token");
  header.token = "";
  console.log("Token removed from async store");
};
