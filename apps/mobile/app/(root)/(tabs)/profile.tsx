import { StyleSheet } from "react-native";
import React from "react";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedCard from "@/components/ThemedCard";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

const Profile = () => {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedCard>
        <ThemedText title={true} style={styles.title}>
          Profile
        </ThemedText>
        <ThemedText style={styles.text}>Email Emailov</ThemedText>
        <ThemedText style={styles.text}>email@gmail.com</ThemedText>
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
