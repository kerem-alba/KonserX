import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { TextInput } from "react-native-paper";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_LIGHT } from "../../utils/colors";

interface Props {
  labelText: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  errorText?: string;
}

const Input = (props: Props) => {
  return (
    <View style={styles.input_container}>
      <TextInput
        label={props.labelText}
        mode="flat"
        style={styles.input}
        value={props.value}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onChangeText={(text) => props.onChangeText(text)}
        placeholder={props.placeholder || props.labelText}
        textColor={TEXT_LIGHT}
        underlineColor={TEXT_LIGHT}
        activeUnderlineColor={SECONDARY_COLOR}
      />
      {props.errorText && <Text style={styles.errorText}>{props.errorText}</Text>}
    </View>
  );
};

export default Input;
