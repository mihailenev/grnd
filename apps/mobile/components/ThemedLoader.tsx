import { ActivityIndicator, useColorScheme } from "react-native";
import { Colours } from "@/constants/colours";
import ThemedView from "./ThemedView";

const ThemedLoader = () => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" color={theme.text} />
    </ThemedView>
  );
};

export default ThemedLoader;
