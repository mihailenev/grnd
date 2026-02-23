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
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
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
import { validateEmail } from "@/utils/validators";
import {
  isValidPassword,
  hasMinLength,
  hasLetter,
  hasDigit,
  hasSpecialChar,
} from "@/utils/passwordRules";
import PasswordRequirements from "@/components/PasswordRequirements";

import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, register } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  // To use later
  //const { height } = useWindowDimensions();
  //const topOffsetStyle = { paddingTop: height * 0.22 };

  // email and password validations
  const minLengthValid = hasMinLength(password);
  const letterValid = hasLetter(password);
  const digitValid = hasDigit(password);
  const specialValid = hasSpecialChar(password);
  const isValid = validateEmail(email) && isValidPassword(password);
  const showEmailHint = email.length > 0 && !validateEmail(email);
  const showPasswordHints = password.length > 0 && !isValidPassword(password);

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <ThemedSafeAreaView style={[styles.safe]}>
          <ThemedCard style={styles.card}>
            <ThemedText title={true} style={styles.title}>
              Register
            </ThemedText>
            <Spacer height={20} />

            <ThemedTextInput
              style={[
                styles.input,
                showEmailHint && { borderBottomColor: "red" },
              ]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View>
              <ThemedTextInput
                style={[
                  styles.input,
                  showPasswordHints && { borderBottomColor: "red" },
                ]}
                placeholder={"Password"}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {showPasswordHints && (
              <>
                <PasswordRequirements
                  minLength={minLengthValid}
                  hasLetter={letterValid}
                  hasDigit={digitValid}
                  hasSpecial={specialValid}
                />
                <Spacer height={4} />
              </>
            )}
            <Spacer height={5} />
            <ThemedButton onPress={handleRegister} disabled={!isValid}>
              <Text style={{ color: "#f2f2f2" }}>Register</Text>
            </ThemedButton>
          </ThemedCard>

          <Spacer height={10} />
          {error && <Text style={styles.error}>{error}</Text>}
        </ThemedSafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //paddingTop: 120,
    alignItems: "center",
    justifyContent: "center", // horizontal center
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
    marginBottom: 10,
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
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 10,
  },
});
