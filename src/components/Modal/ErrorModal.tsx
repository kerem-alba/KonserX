import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Button from "../Button/Button";
interface Props {
  visible: boolean;
  errorText: string;
  onClose: () => void;
}
const ErrorModal: FC<Props> = ({ visible, onClose, errorText }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <Pressable style={styles.modal} onPress={() => onClose()}>
        <View style={styles.modal_content}>
          <Text>{errorText}</Text>
          <Button text="Tamam" onPress={() => onClose()} disabled={false}></Button>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal_content: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",

    borderRadius: 10,
  },
});
