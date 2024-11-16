import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { styles } from "./Styles";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../utils/colors";

interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled: boolean;
}

export default function Button(buttonProps: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={buttonProps.onPress}
      disabled={buttonProps.disabled}
      style={[styles.btn, { backgroundColor: buttonProps.disabled ? SECONDARY_COLOR : PRIMARY_COLOR }]}
    >
      <Text style={styles.btn_text}>{buttonProps.text}</Text>
    </TouchableOpacity>
  );
}
