import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_HERO_KEY = "@heroi-do-dia/daily-hero";
const GAME_STATE_KEY = "@heroi-do-dia/game-state";

export const getTodayKey = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${value.year}-${value.month}-${value.day}`;
};

export async function loadDailyGame(heroes) {
  const today = getTodayKey();
  const [savedHero, savedGame] = await Promise.all([
    AsyncStorage.getItem(DAILY_HERO_KEY),
    AsyncStorage.getItem(GAME_STATE_KEY),
  ]);
  const storedHero = savedHero ? JSON.parse(savedHero) : null;
  const storedGame = savedGame ? JSON.parse(savedGame) : null;

  if (
    storedHero?.date === today &&
    heroes.some((hero) => hero.id === storedHero.heroId)
  ) {
    return {
      heroId: storedHero.heroId,
      guesses: storedGame?.date === today ? (storedGame.guesses ?? []) : [],
      won: storedGame?.date === today ? Boolean(storedGame.won) : false,
      revealedHints:
        storedGame?.date === today ? (storedGame.revealedHints ?? []) : [],
    };
  }

  const hero = heroes[Math.floor(Math.random() * heroes.length)];
  const fresh = { heroId: hero.id, guesses: [], won: false, revealedHints: [] };
  await Promise.all([
    AsyncStorage.setItem(
      DAILY_HERO_KEY,
      JSON.stringify({ date: today, heroId: hero.id }),
    ),
    AsyncStorage.setItem(
      GAME_STATE_KEY,
      JSON.stringify({
        date: today,
        guesses: [],
        won: false,
        revealedHints: [],
      }),
    ),
  ]);
  return fresh;
}

export async function saveGameState({ guesses, won, revealedHints = [] }) {
  await AsyncStorage.setItem(
    GAME_STATE_KEY,
    JSON.stringify({ date: getTodayKey(), guesses, won, revealedHints }),
  );
}
