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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Link, router } from "expo-router";
import { api } from "@/lib/axios";
import { Colours } from "@/constants/colours";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedCard from "@/components/ThemedCard";
import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useUser } from "@/hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, login } = useUser();

  const handleLogin = async () => {
    setError(null);
    try {
      await login(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedSafeAreaView style={styles.safe}>
        {error && <Text style={styles.error}>{error}</Text>}
        <ThemedCard style={styles.card}>
          <ThemedText title={true} style={styles.title}>
            Log in
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
          <Spacer height={5} />
          <ThemedButton onPress={handleLogin}>
            <Text style={{ color: "#f2f2f2" }}>Log in</Text>
          </ThemedButton>
          <Spacer height={10} />
          <View style={{ alignItems: "center" }}>
            <Link href="/register">
              <ThemedText>Dont have an account?</ThemedText>
            </Link>
          </View>
        </ThemedCard>
        <Spacer height={10} />
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
    paddingBottom: 15,
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
