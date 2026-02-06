import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import GuestOnly from "@/components/auth/GuestOnly";

const AuthLayout = () => {
  return (
    <GuestOnly>
      <Stack>
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
      </Stack>
    </GuestOnly>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
