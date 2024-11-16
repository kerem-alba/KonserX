import AsyncStorage from "@react-native-async-storage/async-storage";
//import { header } from "../utils/constants";

export const setTokenToAsyncStore = async (token: string) => {
  await AsyncStorage.setItem("token", token);
  //header.token = token;
  console.log("Token set:", token);
};

export const getTokenFromAsyncStore = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    //header.token = token;
    return token;
  }
  return "";
};

export const removeTokenFromAsync = async () => {
  await AsyncStorage.removeItem("token");
  //header.token = "";
};
