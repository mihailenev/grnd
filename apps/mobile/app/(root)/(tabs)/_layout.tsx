import { Text, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colours } from "@/constants/colours";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 1,
            height: 70,
          },
          tabBarActiveTintColor: theme.iconColourFocused,
          tabBarInactiveTintColor: theme.iconColour,
          //tabBarActiveBackgroundColor: theme.navBackground,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="about" options={{ title: "About" }} />
      </Tabs>
    </>
  );
};
export default RootLayout;
