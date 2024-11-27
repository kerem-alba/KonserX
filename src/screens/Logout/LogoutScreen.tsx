import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { useTokenStore } from "../../stores/authTokenStore";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<RootStackParamList, "Logout">;

export default function LogoutScreen() {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    useTokenStore.getState().clearToken();
    navigation.navigate("Login");
  }, []);

  return (
    <View>
      <Text>LogoutScreen</Text>
    </View>
  );
}
