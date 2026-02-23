import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { Colours } from "@/constants/colours";
import { StatusBar } from "expo-status-bar";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar
          style={colourScheme === "dark" ? "light" : "dark"}
          backgroundColor={theme.background}
          translucent={false}
        />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
          }}
        ></Stack>
      </UserProvider>
    </SafeAreaProvider>
  );
}
