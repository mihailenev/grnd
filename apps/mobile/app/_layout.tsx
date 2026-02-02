import { Stack } from "expo-router";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </UserProvider>
  );
}
