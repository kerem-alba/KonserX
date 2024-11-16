import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../navigations/type";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = BottomTabScreenProps<RootStackParamList, "Intro">["navigation"];

export default function IntroductionScreen() {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }, []);

  return (
    <View>
      <Text>IntroductionScreen</Text>
    </View>
  );
}
