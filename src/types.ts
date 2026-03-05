// Familles : P = Pique, C = Coeur, K = Carreau, T = Trefle
export type Suit = "P" | "C" | "K" | "T";

// Rangs : Valeurs numériques directes pour faciliter les comparaisons
// (11 = Valet, 12 = Dame, 13 = Roi, 14 = As)
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Card {
  rank: Rank;
  suit: Suit;
}

// Le Board contient exactement 5 cartes communautaires
export type Board = [Card, Card, Card, Card, Card];

// La main du joueur contient exactement 2 cartes individuelles
export type HoleCards = [Card, Card];

// Les catégories de mains classées de la plus forte (1) à la plus faible (9)
export enum HandCategory {
  StraightFlush = 1,
  FourOfAKind = 2,
  FullHouse = 3,
  Flush = 4,
  Straight = 5,
  ThreeOfAKind = 6,
  TwoPair = 7,
  OnePair = 8,
  HighCard = 9,
}

// Le résultat final de l'évaluation
export interface HandResult {
  category: HandCategory;
  chosen5: [Card, Card, Card, Card, Card];
}
