import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  View,
  TouchableNativeFeedbackComponent,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Link, router } from "expo-router";
import { api } from "@/lib/axios";
import { Colours } from "@/constants/colours";
import { useUser } from "@/hooks/useUser";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedCard from "@/components/ThemedCard";
import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import ThemedTextInput from "@/components/ThemedTextInput";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { user, register } = useUser();

  const handleRegister = async () => {
    setError(null);
    try {
      await register(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedSafeAreaView style={styles.safe}>
        <ThemedCard style={styles.card}>
          <ThemedText title={true} style={styles.title}>
            Register
          </ThemedText>
          <Spacer height={20} />

          <ThemedTextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <ThemedTextInput
            style={styles.input}
            placeholder={"Password"}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
          />
          <ThemedButton onPress={handleRegister}>
            <Text style={{ color: "#f2f2f2" }}>Register</Text>
          </ThemedButton>
        </ThemedCard>
        <Spacer height={10} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Spacer height={70} />
        <Button title="Home" onPress={() => router.replace("/")} />
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
  },
  container: {
    flex: 1,
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
  },
  card: {
    width: "85%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: Colours.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: Colours.primary + "80",
  },
  error: {
    color: Colours.warning,
    padding: 10,
    backgroundColor: "#F5C1C8",
    borderColor: Colours.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
});
