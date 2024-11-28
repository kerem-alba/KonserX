import { View, Text, Image, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
const logoSource = require("../../../assets/LoginLogo.jpg");
import Entypo from "@expo/vector-icons/Entypo";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../../api/authApi";
import { useTokenStore } from "../../stores/authTokenStore";
import { LoginSchema } from "../../utils/LoginSchema";

type NavigationProps = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const login = (email: string, password: string) => {
    mutate({ email, password });
  };

  const { data, mutate, isSuccess, isError, isPending } = useMutation({
    mutationKey: ["Login"],
    mutationFn: loginService,
  });

  useEffect(() => {
    console.log("data", data);
    console.log("isSuccess", isSuccess);

    if (isSuccess && data?.token) {
      useTokenStore.getState().setToken(data.token);
      console.log("Login Success going home");
      navigation.navigate("Main", { screen: "Home" });
    }
    if (isError) {
      console.log("Login Error");
      Alert.alert("Login Error", "Email or password is incorrect");
    }
    if (isPending) {
      console.log("Login Pending");
    }
  }, [isSuccess, isError, data]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Image source={logoSource} style={styles.logo} />
        <Formik
          initialValues={{ email: "admin1@admin.com", password: "password" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => login(values.email, values.password)}
        >
          {({ handleChange, handleSubmit, values, isValid }) => (
            <View>
              <Input
                labelText="Email"
                placeholder="Please enter your email address"
                value={values.email}
                onChangeText={handleChange("email")}
                errorText="Email is required"
              />
              <PasswordInput labelText="Password" value={values.password} onChangeText={handleChange("password")} errorText="Password is required" />
              <Button onPress={handleSubmit} text="Login" disabled={!isValid} />
              <Text style={styles.text}> Sign Up With</Text>
              <TouchableOpacity style={styles.spotifyButton} onPress={() => navigation.navigate("Spotify")}>
                <Entypo name="spotify" size={64} style={styles.spotifyIcon} />
              </TouchableOpacity>
              <Text style={styles.text}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.register}>Register Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </View>
  );
}
