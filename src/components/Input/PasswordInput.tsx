import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { TextInput } from "react-native-paper";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_LIGHT } from "../../utils/colors";

interface Props {
  labelText: string;
  placeholder?: string;
  value: string;
  errorText?: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput(props: Props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const updateSecureTextEntry = () => {
    setSecureTextEntry((prev: boolean) => !prev);
  };
  return (
    <View style={styles.input_container}>
      <View style={styles.password_container}>
        <TextInput
          label={props.labelText}
          mode="flat"
          style={styles.input}
          value={props.value}
          onChangeText={(text) => props.onChangeText(text)}
          placeholder={props.placeholder || props.labelText}
          secureTextEntry={secureTextEntry}
          textColor={TEXT_LIGHT}
          underlineColor={TEXT_LIGHT}
          activeUnderlineColor={SECONDARY_COLOR}
        />
        <Pressable onPress={updateSecureTextEntry}>
          <Feather name={secureTextEntry ? "eye-off" : "eye"} size={24} color={SECONDARY_COLOR} />
        </Pressable>
      </View>
      {props.errorText && <Text style={styles.errorText}>{props.errorText}</Text>}
    </View>
  );
}
