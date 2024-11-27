import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./type";
import HomeScreen from "../screens/Home/HomeScreen";
import ExploreScreen from "../screens/Explore/ExploreScreen";
import IntroductionScreen from "../screens/Intro/IntroductionScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import SpotifyScreen from "../screens/Login/SpotifyScreen";
import ConcertDetails from "../screens/ConcertDetails/ConcertDetails";
import PopularConcertsScreen from "../screens/Concerts/PopularConcertsScreen";
import FavoriteConcertsScreen from "../screens/Concerts/FavoriteConcertsScreen";
import LogoutScreen from "../screens/Logout/LogoutScreen";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from "../utils/colors";

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "log-out" : "log-out-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: TEXT_COLOR,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="Intro" component={IntroductionScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigation} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PopularConcerts" component={PopularConcertsScreen} />
      <Stack.Screen name="FavoriteConcerts" component={FavoriteConcertsScreen} />
      <Stack.Screen name="ConcertDetails" component={ConcertDetails} />
      <Stack.Screen name="Spotify" component={SpotifyScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
