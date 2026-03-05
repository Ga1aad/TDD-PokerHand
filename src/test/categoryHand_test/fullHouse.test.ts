import { describe, it, expect } from "vitest";
import { evaluateHand } from "../../evaluateHand";
import { HandCategory, Board, HoleCards } from "../../types";

describe("evaluateHand - Full House", () => {
  it("devrait détecter un full (Full House) et renvoyer le brelan puis la paire", () => {
    // Board : Brelan de 8, paire de 3
    const board: Board = [
      { rank: 8, suit: "C" },
      { rank: 8, suit: "P" },
      { rank: 3, suit: "K" },
      { rank: 14, suit: "T" },
      { rank: 2, suit: "P" },
    ];

    // Joueur : 8, 3
    const holeCards: HoleCards = [
      { rank: 8, suit: "K" },
      { rank: 3, suit: "T" },
    ];

    const result = evaluateHand(board, holeCards);

    expect(result.category).toBe(HandCategory.FullHouse);

    // Vérification : Les 3 cartes du brelan puis les 2 cartes de la paire
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 8 }),
      expect.objectContaining({ rank: 8 }),
      expect.objectContaining({ rank: 8 }),
      expect.objectContaining({ rank: 3 }),
      expect.objectContaining({ rank: 3 }),
    ]);
  });
});
