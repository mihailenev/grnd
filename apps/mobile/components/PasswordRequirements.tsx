import { View, StyleSheet, useColorScheme } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Colours } from "@/constants/colours";

type Props = {
  minLength: boolean;
  hasLetter: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
};

export default function PasswordRequirements({
  minLength,
  hasLetter,
  hasDigit,
  hasSpecial,
}: Props) {
  const colourScheme = useColorScheme() ?? "light";
  const theme = Colours[colourScheme];
  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      <Requirement valid={minLength} text="At least 8 characters" />
      <Requirement valid={hasLetter} text="Contains a letter" />
      <Requirement valid={hasDigit} text="Contains a number" />
      <Requirement valid={hasSpecial} text="Contains a special character" />
    </View>
  );
}

function Requirement({ valid, text }: { valid: boolean; text: string }) {
  return (
    <ThemedText style={{ color: valid ? "green" : "red" }}>
      {valid ? "✓" : "✗"} {text}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 0,
    padding: 12,
    borderRadius: 6,
  },
});
