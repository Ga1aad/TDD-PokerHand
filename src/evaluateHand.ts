import type { Board, HoleCards, HandResult } from "./types";
import { HandCategory } from "./types";

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

  // Compter les carrés, brelans et paires
  const fours: number[] = [];
  const threes: number[] = [];
  const pairs: number[] = [];
  for (const [rank, cards] of rankCounts.entries()) {
    if (cards.length === 4) fours.push(rank);
    else if (cards.length === 3) threes.push(rank);
    else if (cards.length === 2) pairs.push(rank);
  }
  fours.sort((a, b) => b - a);
  threes.sort((a, b) => b - a);
  pairs.sort((a, b) => b - a);

  // Vérifier la présence d'une Couleur (Flush)
  const suitCounts = new Map<string, typeof allCards>();
  for (const card of allCards) {
    if (!suitCounts.has(card.suit)) suitCounts.set(card.suit, []);
    suitCounts.get(card.suit)!.push(card);
  }

  let flushCards: typeof allCards | null = null;
  for (const cards of suitCounts.values()) {
    if (cards.length >= 5) {
      flushCards = cards;
      break;
    }
  }

  // 1. Quinte Flush (Straight Flush)
  if (flushCards) {
    const uniqueFlushCards: typeof allCards = [];
    const seenFlushRanks = new Set<number>();
    for (const card of flushCards) {
      if (!seenFlushRanks.has(card.rank)) {
        seenFlushRanks.add(card.rank);
        uniqueFlushCards.push(card);
      }
    }

    // Suite normale dans la couleur
    for (let i = 0; i <= uniqueFlushCards.length - 5; i++) {
      if (uniqueFlushCards[i].rank - uniqueFlushCards[i + 4].rank === 4) {
        return {
          category: HandCategory.StraightFlush,
          chosen5: uniqueFlushCards.slice(i, i + 5) as typeof board,
        };
      }
    }
    // Suite basse A-5-4-3-2 dans la couleur
    if (uniqueFlushCards.length >= 5 && uniqueFlushCards[0].rank === 14) {
      const lowStraight = [5, 4, 3, 2];
      const lowStraightCards = uniqueFlushCards.filter((c) =>
        lowStraight.includes(c.rank),
      );
      if (lowStraightCards.length === 4) {
        return {
          category: HandCategory.StraightFlush,
          chosen5: [...lowStraightCards, uniqueFlushCards[0]] as typeof board,
        };
      }
    }
  }

  // 2. Carré (Four of a Kind)
  if (fours.length > 0) {
    const fourRank = fours[0];
    const fourCards = rankCounts.get(fourRank)!;
    const kickers = allCards.filter((c) => c.rank !== fourRank).slice(0, 1);
    return {
      category: HandCategory.FourOfAKind,
      chosen5: [...fourCards, ...kickers] as typeof board,
    };
  }

  // 3. Full (Full House)
  if (threes.length >= 2) {
    const threeRank = threes[0];
    const pairRank = threes[1];
    const threeCards = rankCounts.get(threeRank)!;
    const pairCards = rankCounts.get(pairRank)!.slice(0, 2);
    return {
      category: HandCategory.FullHouse,
      chosen5: [...threeCards, ...pairCards] as typeof board,
    };
  } else if (threes.length === 1 && pairs.length >= 1) {
    const threeRank = threes[0];
    const pairRank = pairs[0];
    const threeCards = rankCounts.get(threeRank)!;
    const pairCards = rankCounts.get(pairRank)!;
    return {
      category: HandCategory.FullHouse,
      chosen5: [...threeCards, ...pairCards] as typeof board,
    };
  }

  // 4. Couleur (Flush)
  if (flushCards) {
    return {
      category: HandCategory.Flush,
      chosen5: flushCards.slice(0, 5) as typeof board,
    };
  }

  // 5. Suite (Straight)
  const uniqueCards: typeof allCards = [];
  const seenRanks = new Set<number>();
  for (const card of allCards) {
    if (!seenRanks.has(card.rank)) {
      seenRanks.add(card.rank);
      uniqueCards.push(card);
    }
  }

  for (let i = 0; i <= uniqueCards.length - 5; i++) {
    if (uniqueCards[i].rank - uniqueCards[i + 4].rank === 4) {
      return {
        category: HandCategory.Straight,
        chosen5: uniqueCards.slice(i, i + 5) as typeof board,
      };
    }
  }
  if (uniqueCards.length >= 5 && uniqueCards[0].rank === 14) {
    const lowStraight = [5, 4, 3, 2];
    const lowStraightCards = uniqueCards.filter((c) =>
      lowStraight.includes(c.rank),
    );
    if (lowStraightCards.length === 4) {
      return {
        category: HandCategory.Straight,
        chosen5: [...lowStraightCards, uniqueCards[0]] as typeof board,
      };
    }
  }

  // 6. Brelan (Three of a Kind)
  if (threes.length > 0) {
    const threeRank = threes[0];
    const threeCards = rankCounts.get(threeRank)!;
    const kickers = allCards.filter((c) => c.rank !== threeRank).slice(0, 2);
    return {
      category: HandCategory.ThreeOfAKind,
      chosen5: [...threeCards, ...kickers] as typeof board,
    };
  }

  // 7. Double Paire (Two Pair)
  if (pairs.length >= 2) {
    const highPairRank = pairs[0];
    const lowPairRank = pairs[1];
    const highPairCards = rankCounts.get(highPairRank)!;
    const lowPairCards = rankCounts.get(lowPairRank)!;
    const kickers = allCards
      .filter((c) => c.rank !== highPairRank && c.rank !== lowPairRank)
      .slice(0, 1);
    return {
      category: HandCategory.TwoPair,
      chosen5: [...highPairCards, ...lowPairCards, ...kickers] as typeof board,
    };
  }

  // 8. Paire (One Pair)
  if (pairs.length === 1) {
    const pairRank = pairs[0];
    const pairCards = rankCounts.get(pairRank)!;
    const kickers = allCards.filter((c) => c.rank !== pairRank).slice(0, 3);
    return {
      category: HandCategory.OnePair,
      chosen5: [...pairCards, ...kickers] as typeof board,
    };
  }

  // 9. Carte Haute (High Card)
  return {
    category: HandCategory.HighCard,
    chosen5: allCards.slice(0, 5) as typeof board,
  };
}
