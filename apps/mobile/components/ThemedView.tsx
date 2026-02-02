import {
  View,
  useColorScheme,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";

type ThemedViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

const ThemedView = ({ style, ...props }: ThemedViewProps) => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];

  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  );
};

export default ThemedView;
