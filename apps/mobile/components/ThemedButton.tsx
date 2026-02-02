import {
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ViewProps,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";

type ThemedButtonProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

function ThemedButton({ style, onPress, ...props }: ThemedButtonProps) {
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key, value]) => value != null),
  );
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colours.primary + "80"}
      style={[styles.btn, style]}
      {...filteredProps}
    />
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
});
