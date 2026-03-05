import type { Card, Suit, Rank } from "./types";

export function createDeck(): Card[] {
  const suits: Suit[] = ["P", "C", "K", "T"];
  const ranks: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }

  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function cardToString(card: Card): string {
  const suitSymbols: Record<Suit, string> = {
    P: "♠",
    C: "♥",
    K: "♦",
    T: "♣",
  };

  const rankSymbols: Record<number, string> = {
    11: "J",
    12: "Q",
    13: "K",
    14: "A",
  };

  const rankStr = rankSymbols[card.rank] || card.rank.toString();
  return `${rankStr}${suitSymbols[card.suit]}`;
}
