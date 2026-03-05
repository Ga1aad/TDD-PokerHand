// P = Pique, C = Coeur, K = Carreaux, T = Trefle
export type CardType = ["P", "C", "K", "T"];
export type CardTypeColor = ["Noir", "Rouge", "Rouge", "Noir"];

// 1 = 2, 2 = 3, ..., 11 = Valet, 12 = Dame, 13 = Roi, 14 = As
export type Rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export type RankType = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
