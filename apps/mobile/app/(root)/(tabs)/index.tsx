import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";

import ThemedView from "@/components/ThemedView";
import ThemedCard from "@/components/ThemedCard";
import Spacer from "@/components/Spacer";
import ThemedText from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

export default function Index() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <Image source={images.logo} style={{ width: 330, height: 120 }} />
      <Spacer height={20} />
      <ThemedText title={true} style={styles.title}>
        Home /
      </ThemedText>
      <Spacer />
      <ThemedCard>
        <ThemedText>This is a CARD</ThemedText>
        <Link style={styles.link} href="/login">
          <ThemedText>Log</ThemedText>
        </Link>
      </ThemedCard>
    </ThemedSafeAreaView>
  );
} //npx expo start

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
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 5,
    boxShadow: "4px 4px rgba(0,0,0,0.1)",
  },
  link: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
});
