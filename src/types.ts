// P = Pique, C = Coeur, K = Carreau, T = Trefle
export type Suit = "P" | "C" | "K" | "T";

// Les valeurs numériques directes pour faciliter les tris (sort) et les comparaisons
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

// On assemble le tout pour créer la carte
export interface Card {
  rank: Rank;
  suit: Suit;
}
