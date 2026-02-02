import {
  View,
  useColorScheme,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";
import React from "react";
import { Colours } from "@/constants/colours";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemedSafeAreaViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

const ThemedSafeAreaView = ({ style, ...props }: ThemedSafeAreaViewProps) => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedSafeAreaView;
