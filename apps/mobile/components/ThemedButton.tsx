import {
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";

type ThemedButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function ThemedButton({
  style,
  onPress,
  disabled = false,
  children,
}: ThemedButtonProps) {
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      underlayColor={disabled ? "transparent" : Colours.primary + "80"}
      style={[styles.btn, disabled && styles.disabled, style]}
    >
      <View>{children}</View>
    </TouchableHighlight>
  );
}
export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colours.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
