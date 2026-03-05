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

  // Grouper par rang pour trouver les paires
  const rankCounts = new Map<number, typeof allCards>();
  for (const card of allCards) {
    if (!rankCounts.has(card.rank)) rankCounts.set(card.rank, []);
    rankCounts.get(card.rank)!.push(card);
  }

  // Trouver toutes les paires
  const pairs: number[] = [];
  for (const [rank, cards] of rankCounts.entries()) {
    if (cards.length === 2) {
      pairs.push(rank);
    }
  }

  // Trier les paires par ordre décroissant pour avoir les plus fortes en premier
  pairs.sort((a, b) => b - a);

  // Chercher un brelan (Three of a Kind)
  for (const [rank, cards] of rankCounts.entries()) {
    if (cards.length === 3) {
      const threeOfAKindCards = cards;
      const kickers = allCards.filter(c => c.rank !== rank).slice(0, 2);

      const chosen5 = [...threeOfAKindCards, ...kickers] as typeof board;
      return {
        category: HandCategory.ThreeOfAKind,
        chosen5
      };
    }
  }

  if (pairs.length >= 2) {
    const highPairRank = pairs[0];
    const lowPairRank = pairs[1];

    const highPairCards = rankCounts.get(highPairRank)!;
    const lowPairCards = rankCounts.get(lowPairRank)!;

    const kickers = allCards.filter(c => c.rank !== highPairRank && c.rank !== lowPairRank).slice(0, 1);

    const chosen5 = [...highPairCards, ...lowPairCards, ...kickers] as typeof board;
    return {
      category: HandCategory.TwoPair,
      chosen5
    };
  }

  if (pairs.length === 1) {
    const pairRank = pairs[0];
    const pairCards = rankCounts.get(pairRank)!; // Added this line to define pairCards
    const kickers = allCards.filter(c => c.rank !== pairRank).slice(0, 3);

    const chosen5 = [...pairCards, ...kickers] as typeof board;
    return {
      category: HandCategory.OnePair,
      chosen5
    }
  }

  // Prendre les 5 meilleures cartes au cas où on a juste HighCard
  const chosen5 = allCards.slice(0, 5) as typeof board;

  return {
    category: HandCategory.HighCard,
    chosen5,
  };
}
