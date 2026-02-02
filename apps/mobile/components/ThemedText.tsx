import {
  Text,
  useColorScheme,
  StyleProp,
  TextStyle,
  TextProps,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";

type ThemedTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
  title?: boolean;
};

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
