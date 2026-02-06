import { StyleSheet, Text } from "react-native";
import React from "react";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedCard from "@/components/ThemedCard";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import ThemedButton from "@/components/ThemedButton";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user, logout } = useUser();
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedCard>
        <ThemedText title={true} style={styles.title}>
          Profile
        </ThemedText>
        <ThemedText style={styles.text}>{user?.email}</ThemedText>
        <ThemedButton onPress={logout}>
          <Text style={{ color: "#f2f2f2" }}>Logout</Text>
        </ThemedButton>
      </ThemedCard>
    </ThemedSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
