import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useFonts, Anton_400Regular } from "@expo-google-fonts/anton";
import GameHeader from "./src/components/GameHeader";
import ConfirmedTraits from "./src/components/ConfirmedTraits";
import GuessCard from "./src/components/GuessCard";
import HeroSearch from "./src/components/HeroSearch";
import ProgressiveHints from "./src/components/ProgressiveHints";
import { progressiveHints } from "./src/constants/game";
import { COLORS } from "./src/constants/theme";
import heroes from "./src/data/heroes";
import { loadDailyGame, saveGameState } from "./src/services/dailyHero";
import styles from "./src/styles/app.styles";
import { heroLabel, searchHeroes } from "./src/utils/heroes";

export default function App() {
  const [target, setTarget] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [won, setWon] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({ Anton_400Regular });
  useEffect(() => {
    loadDailyGame(heroes)
      .then(
        ({
          heroId,
          guesses: guessIds,
          won: savedWon,
          revealedHints: savedHints,
        }) => {
          setTarget(heroes.find((hero) => hero.id === heroId));
          setGuesses(
            guessIds
              .map((id) => heroes.find((hero) => hero.id === id))
              .filter(Boolean),
          );
          setWon(savedWon);
          setRevealedHints(
            savedHints.map((hint) =>
              typeof hint === "number"
                ? progressiveHints.find((item) => item.attempts === hint)
                    ?.key || hint
                : hint,
            ),
          );
          setLoading(false);
        },
      )
      .catch(() => setLoading(false));
  }, []);
  const results = useMemo(
    () =>
      searchHeroes(
        heroes,
        query,
        guesses.map((hero) => hero.id),
      ),
    [query, guesses],
  );
  const submitGuess = async (hero) => {
    if (!target || won) return;
    if (guesses.some((guess) => guess.id === hero.id)) {
      setNotice("Este herói já está no arquivo de palpites.");
      return;
    }
    const nextGuesses = [...guesses, hero];
    const hasWon = hero.id === target.id;
    setGuesses(nextGuesses);
    setWon(hasWon);
    setQuery("");
    setNotice(
      hasWon
        ? `Identidade confirmada: ${heroLabel(target)}.`
        : "Registro adicionado. Compare os sinais.",
    );
    await saveGameState({
      guesses: nextGuesses.map((guess) => guess.id),
      won: hasWon,
      revealedHints,
    });
  };
  const revealHint = async (hintKey) => {
    if (revealedHints.includes(hintKey)) return;
    const nextHints = [...revealedHints, hintKey];
    setRevealedHints(nextHints);
    await saveGameState({
      guesses: guesses.map((guess) => guess.id),
      won,
      revealedHints: nextHints,
    });
  };
  if (loading || !target || !fontsLoaded)
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.yellow} size="large" />
        <Text style={styles.loadingText}>ABRINDO ARQUIVO...</Text>
      </View>
    );
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.ink}
        translucent={false}
      />
      <ScrollView
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.shell}>
          <GameHeader />
          {!won && (
            <HeroSearch
              query={query}
              results={results}
              notice={notice}
              onChange={(value) => {
                setQuery(value);
                setNotice("");
              }}
              onGuess={submitGuess}
            />
          )}
          {won && (
            <View style={styles.winPanel}>
              <Text style={styles.winEyebrow}>O ALVO ERA</Text>
              <Text style={styles.winName}>{heroLabel(target)}</Text>
              <Text style={styles.winSub}>
                {guesses.length}{" "}
                {guesses.length === 1 ? "tentativa" : "tentativas"} registradas
              </Text>
            </View>
          )}
          <ProgressiveHints
            target={target}
            guesses={guesses}
            attempts={guesses.length}
            revealedHints={revealedHints}
            onReveal={revealHint}
          />
          <ConfirmedTraits target={target} guesses={guesses} />
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>PALPITES</Text>
            <Text style={styles.historyCount}>
              {guesses.length} REGISTRADOS
            </Text>
          </View>
          {guesses.length ? (
            guesses
              .slice()
              .reverse()
              .map((hero, reverseIndex) => (
                <GuessCard
                  key={hero.id}
                  hero={hero}
                  target={target}
                  index={guesses.length - reverseIndex - 1}
                />
              ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptySlash}>///</Text>
              <Text style={styles.emptyTitle}>Nenhum palpite ainda</Text>
              <Text style={styles.emptyText}>
                Seu primeiro nome abre o dossiê.
              </Text>
            </View>
          )}
          <Text style={styles.footer}>
            HERÓI DO DIA · MVP LOCAL · {Platform.OS.toUpperCase()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
