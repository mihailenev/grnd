import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import GuestOnly from "@/components/auth/GuestOnly";
import { Colours } from "@/constants/colours";

const AuthLayout = () => {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];
  return (
    <GuestOnly>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          headerStyle: { backgroundColor: theme.background },
          contentStyle: { backgroundColor: theme.background },
          headerTintColor: theme.title,
          headerShadowVisible: false,
          headerTransparent: false,
          headerShown: true,
          presentation: "card",
        }}
      >
        <Stack.Screen name="login" options={{ title: "" }} />
        <Stack.Screen
          name="register"
          options={{
            title: "",
          }}
        />
      </Stack>
    </GuestOnly>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
