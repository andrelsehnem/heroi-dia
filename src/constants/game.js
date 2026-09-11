export const comparisonFields = [
  { key: "gender", label: "Gênero", get: (hero) => hero.appearance.gender },
  { key: "race", label: "Espécie", get: (hero) => hero.appearance.race || "—" },
  { key: "eyeColor", label: "Olhos", get: (hero) => hero.appearance.eyeColor },
  {
    key: "hairColor",
    label: "Cabelo",
    get: (hero) => hero.appearance.hairColor,
  },
  {
    key: "alignment",
    label: "Índole",
    get: (hero) => {
      const alignment = hero.biography.alignment;
      return alignment
        ? alignment.charAt(0).toUpperCase() + alignment.slice(1)
        : "—";
    },
  },
];

export const publisherComparisonField = {
  key: "publisher",
  label: "Editora",
  get: (hero) => hero.biography.publisher || "—",
};

export const progressiveHints = [
  {
    key: "publisher",
    attempts: 5,
    label: "Editora",
    get: (hero) => hero.biography.publisher || "—",
  },
  {
    key: "groupAffiliation",
    attempts: 10,
    label: "Afiliações",
    get: (hero) => hero.connections.groupAffiliation || "—",
  },
  {
    key: "occupation",
    attempts: 15,
    label: "Ocupação",
    get: (hero) => hero.work.occupation || "—",
  },
  {
    key: "firstAppearance",
    attempts: 20,
    label: "Primeira aparição",
    get: (hero) => hero.biography.firstAppearance || "—",
  },
  {
    key: "fullName",
    attempts: 25,
    label: "Nome completo",
    get: (hero) => hero.biography.fullName || "—",
  },
  {
    key: "alterEgos",
    attempts: 30,
    label: "Alter egos",
    get: (hero) => hero.biography.alterEgos || "—",
  },
  {
    key: "aliases",
    attempts: 35,
    label: "Aliases",
    get: (hero) =>
      Array.isArray(hero.biography.aliases)
        ? hero.biography.aliases.filter(Boolean).join(" · ") || "—"
        : hero.biography.aliases || "—",
  },
];
