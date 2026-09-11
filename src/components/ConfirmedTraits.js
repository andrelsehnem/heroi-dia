import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { comparisonFields, publisherComparisonField } from "../constants/game";
import { COLORS } from "../constants/theme";
import styles from "../styles/confirmed-traits.styles";

export default function ConfirmedTraits({ target, guesses }) {
  const fields = [...comparisonFields, publisherComparisonField];
  const confirmed = fields.filter((field) => {
    const targetValue = field.get(target);
    return (
      targetValue &&
      targetValue !== "—" &&
      guesses.some((guess) => field.get(guess) === targetValue)
    );
  });

  return (
    <View style={styles.area}>
      <View style={styles.header}>
        <Text style={styles.title}>ACERTOS CONFIRMADOS</Text>
        <Text style={styles.count}>
          {confirmed.length}/{fields.length}
        </Text>
      </View>
      {confirmed.length ? (
        <View style={styles.grid}>
          {confirmed.map((field) => (
            <View key={field.key} style={styles.trait}>
              <Ionicons
                name="checkmark-circle"
                size={17}
                color={COLORS.green}
              />
              <View style={styles.traitCopy}>
                <Text style={styles.label}>{field.label}</Text>
                <Text style={styles.value}>{field.get(target)}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Ionicons name="shield-outline" size={21} color={COLORS.muted} />
          <Text style={styles.emptyText}>
            Os atributos acertados aparecerão aqui.
          </Text>
        </View>
      )}
    </View>
  );
}
