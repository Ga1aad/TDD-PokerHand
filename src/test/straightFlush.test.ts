import { describe, it, expect } from "vitest";
import { evaluateHand } from "../evaluateHand";
import { HandCategory, type Board, type HoleCards } from "../types";

describe("evaluateHand - Straight Flush", () => {
  it("devrait détecter une quinte flush et renvoyer les cartes triées par rang", () => {
    // Board : 4 cartes qui se suivent de la même couleur (Pique)
    const board: Board = [
      { rank: 10, suit: "P" },
      { rank: 9, suit: "P" },
      { rank: 8, suit: "P" },
      { rank: 7, suit: "P" },
      { rank: 2, suit: "K" },
    ];

    // Joueur : La carte manquante
    const holeCards: HoleCards = [
      { rank: 11, suit: "P" },
      { rank: 14, suit: "P" },
    ];

    const result = evaluateHand(board, holeCards);

    expect(result.category).toBe(HandCategory.StraightFlush);

    // Valet(11), 10, 9, 8, 7 Pique
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 11, suit: "P" }),
      expect.objectContaining({ rank: 10, suit: "P" }),
      expect.objectContaining({ rank: 9, suit: "P" }),
      expect.objectContaining({ rank: 8, suit: "P" }),
      expect.objectContaining({ rank: 7, suit: "P" }),
    ]);
  });
});
