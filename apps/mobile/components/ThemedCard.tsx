import {
  View,
  useColorScheme,
  StyleProp,
  ViewStyle,
  ViewProps,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";

type ThemedCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

const ThemedCard = ({ style, ...props }: ThemedCardProps) => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];

  return (
    <View
      style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
