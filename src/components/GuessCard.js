import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { comparisonFields, publisherComparisonField } from "../constants/game";
import { COLORS } from "../constants/theme";
import styles from "../styles/guess-card.styles";
import { heroLabel } from "../utils/heroes";

function FieldCell({ field, hero, target }) {
  const value = field.get(hero);
  const match = value === field.get(target);
  return (
    <View style={[styles.fieldCell, match ? styles.match : styles.miss]}>
      <Text style={styles.fieldLabel}>{field.label}</Text>
      <Text numberOfLines={2} style={styles.fieldValue}>
        {value || "—"}
      </Text>
      <View
        style={[
          styles.badge,
          { backgroundColor: match ? COLORS.green : COLORS.red },
        ]}
      >
        <Ionicons name={match ? "checkmark" : "close"} size={14} color="#fff" />
      </View>
    </View>
  );
}

export default function GuessCard({ hero, target, index }) {
  const fields = [...comparisonFields, publisherComparisonField];
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.number}>#{String(index + 1).padStart(2, "0")}</Text>
        <Text style={styles.name}>{heroLabel(hero)}</Text>
      </View>
      <View style={styles.grid}>
        {fields.map((field) => (
          <FieldCell
            key={field.key}
            field={field}
            hero={hero}
            target={target}
          />
        ))}
      </View>
    </View>
  );
}
