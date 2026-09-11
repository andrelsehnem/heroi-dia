import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { progressiveHints } from "../constants/game";
import { COLORS } from "../constants/theme";
import styles from "../styles/progressive-hints.styles";

export default function ProgressiveHints({
  target,
  guesses,
  attempts,
  revealedHints,
  onReveal,
}) {
  const publisherKnown = guesses.some(
    (guess) =>
      guess.biography.publisher &&
      guess.biography.publisher === target.biography.publisher,
  );
  const hints = progressiveHints
    .filter((hint) => hint.key !== "publisher" || !publisherKnown)
    .map((hint, index) => ({ ...hint, attempts: (index + 1) * 5 }));
  const unlocked = hints.filter((hint) => attempts >= hint.attempts);
  const nextHint = hints.find((hint) => attempts < hint.attempts);
  return (
    <View style={styles.area}>
      <View style={styles.header}>
        <Text style={styles.title}>PISTAS DO ARQUIVO</Text>
        <Text style={styles.count}>
          {unlocked.length}/{hints.length} LIBERADAS
        </Text>
      </View>
      {unlocked.length ? (
        unlocked.map((hint) =>
          revealedHints.includes(hint.key) ? (
            <View key={hint.attempts} style={styles.hintCard}>
              <Text style={styles.attempt}>
                LIBERADA NA TENTATIVA {hint.attempts}
              </Text>
              <Text style={styles.label}>{hint.label}</Text>
              <Text style={styles.value}>{hint.get(target)}</Text>
            </View>
          ) : (
            <Pressable
              key={hint.attempts}
              onPress={() => onReveal(hint.key)}
              style={({ pressed }) => [
                styles.available,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="eye-outline" size={22} color={COLORS.yellow} />
              <View style={styles.availableCopy}>
                <Text style={styles.availableTitle}>PISTA DISPONÍVEL</Text>
                <Text style={styles.availableText}>
                  Toque para revelar: {hint.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.paper} />
            </Pressable>
          ),
        )
      ) : (
        <View style={styles.locked}>
          <Text style={styles.lockedMark}>⌁</Text>
          <Text style={styles.lockedText}>
            A primeira pista será liberada após 5 tentativas.
          </Text>
        </View>
      )}
      {nextHint ? (
        <Text style={styles.next}>
          Faltam {nextHint.attempts - attempts}{" "}
          {nextHint.attempts - attempts === 1 ? "palpite" : "palpites"} para
          revelar: {nextHint.label.toUpperCase()}.
        </Text>
      ) : null}
    </View>
  );
}
