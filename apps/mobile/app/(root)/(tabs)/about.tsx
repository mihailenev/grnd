import { StyleSheet } from "react-native";
import React from "react";
import ThemedView from "@/components/ThemedView";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

const About = () => {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText title={true} style={styles.title}>
          About Page
        </ThemedText>
      </ThemedCard>
    </ThemedSafeAreaView>
  );
};

export default About;

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
  card: {
    padding: 20,
    borderRadius: 5,
    boxShadow: "4px 4px rgba(0,0,0,0.1)",
  },
});
