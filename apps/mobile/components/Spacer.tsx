import { View, StyleProp, ViewStyle } from "react-native";
import React from "react";

type SpacerProps = {
  width?: number | string;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

const Spacer: React.FC<SpacerProps> = ({
  width = "100%",
  height = 40,
  style,
}) => <View style={[{ width, height } as ViewStyle, style]} />;

export default Spacer;
