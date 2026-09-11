import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/theme";
import styles from "../styles/hero-search.styles";
import { heroLabel } from "../utils/heroes";

export default function HeroSearch({
  query,
  results,
  notice,
  onChange,
  onGuess,
}) {
  return (
    <View style={styles.area}>
      <Text style={styles.label}>CONSULTAR BANCO DE HERÓIS</Text>
      <View style={styles.inputWrap}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.ink}
          style={styles.icon}
        />
        <TextInput
          accessibilityLabel="Nome do herói"
          value={query}
          onChangeText={onChange}
          placeholder="Ex.: Mulher-Maravilha"
          placeholderTextColor="#718080"
          style={styles.input}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={() => results.length === 1 && onGuess(results[0])}
        />
      </View>
      {query.length > 0 && (
        <View style={styles.suggestions}>
          {results.length ? (
            results.map((hero) => (
              <Pressable
                key={hero.id}
                onPress={() => onGuess(hero)}
                style={({ pressed }) => [
                  styles.suggestion,
                  pressed && styles.pressed,
                ]}
              >
                <View>
                  <Text style={styles.name}>{heroLabel(hero)}</Text>
                  {hero.name !== heroLabel(hero) && (
                    <Text style={styles.original}>{hero.name}</Text>
                  )}
                </View>
                <Text style={styles.arrow}>↗</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.empty}>
              Nenhum herói encontrado neste arquivo.
            </Text>
          )}
        </View>
      )}
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
    </View>
  );
}
