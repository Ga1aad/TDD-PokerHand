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

  // Group by rank to find pairs
  const rankCounts = new Map<number, typeof allCards>();
  for (const card of allCards) {
    if (!rankCounts.has(card.rank)) rankCounts.set(card.rank, []);
    rankCounts.get(card.rank)!.push(card);
  }

  // Chercher une paire (en parcourant du plus grand au plus petit rang puisque allCards est trié)
  let pairRank: number | null = null;
  for (const card of allCards) {
    if (rankCounts.get(card.rank)!.length === 2) {
      pairRank = card.rank;
      break;
    }
  }

  if (pairRank !== null) {
    const pairCards = rankCounts.get(pairRank)!;
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
