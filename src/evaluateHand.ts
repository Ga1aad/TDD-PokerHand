import {
  type Board,
  type HoleCards,
  type HandResult,
  HandCategory,
} from "./types";

export function evaluateHand(board: Board, holeCards: HoleCards): HandResult {
  const allCards = [...board, ...holeCards];

  // Trier les cartes par rang décroissant
  allCards.sort((a, b) => b.rank - a.rank);

  // Prendre les 5 meilleures cartes
  const chosen5 = allCards.slice(0, 5) as [
    (typeof allCards)[0],
    (typeof allCards)[0],
    (typeof allCards)[0],
    (typeof allCards)[0],
    (typeof allCards)[0],
  ];

  return {
    category: HandCategory.HighCard,
    chosen5,
  };
}
