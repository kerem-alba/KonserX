import React, { useEffect } from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
import Button from "../../components/Button/Button";
import { registerService } from "../../api/authApi";
import { useNavigation } from "@react-navigation/native";
import { RegisterSchema } from "../../utils/RegisterSchema";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/type";
import { styles } from "./styles";

type NavigationProps = StackNavigationProp<RootStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProps>();

  const register = (email: string, password: string) => {
    mutate({ email, password });
  };

  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationKey: ["Register"],
    mutationFn: registerService,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } else if (isError) {
      Alert.alert("Error", "An error occurred during registration.");
    }
  }, [isSuccess, isError]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <Formik
        initialValues={{ email: "kerem.a.albayrak@gmail.com", password: "password", confirmPassword: "password" }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => register(values.email, values.password)}
      >
        {({ handleChange, handleSubmit, values, isValid }) => (
          <ScrollView style={styles.inputContainer}>
            <Input
              labelText="Email"
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange("email")}
              errorText="Email is required"
            />
            <PasswordInput
              labelText="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange("password")}
              errorText="Password is required"
            />
            <PasswordInput
              labelText="Confirm Password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              errorText="Confirm Password is required"
            />
            <Button onPress={handleSubmit} text={isPending ? "Registering..." : "Register"} disabled={!isValid || isPending} />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
