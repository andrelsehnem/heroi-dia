export const normalize = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function searchHeroes(heroes, query, excludedIds = []) {
  const term = normalize(query);
  if (!term) return [];
  return heroes
    .filter((hero) => !excludedIds.includes(hero.id))
    .filter(
      (hero) =>
        normalize(hero["nome-br"]).includes(term) ||
        normalize(hero.name).includes(term) ||
        normalize(hero.biography.fullName).includes(term),
    )
    .slice(0, 6);
}

export const heroLabel = (hero) => hero["nome-br"] || hero.name;
