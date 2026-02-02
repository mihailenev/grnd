import { StyleSheet } from "react-native";
import React from "react";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

const Search = () => {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText title={true} style={styles.title}>
        Search
      </ThemedText>
    </ThemedSafeAreaView>
  );
};

export default Search;

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
});
