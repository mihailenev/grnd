import {
  StyleSheet,
  TextInput,
  useColorScheme,
  StyleProp,
  TextStyle,
  TextInputProps,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";

type ThemedTextInutProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

const ThemedTextInput = ({ style, ...props }: ThemedTextInutProps) => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];

  return (
    <TextInput
      placeholderTextColor={theme.placeHolder}
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({});
