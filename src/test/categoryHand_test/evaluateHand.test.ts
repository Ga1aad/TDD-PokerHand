import { describe, it, expect } from "vitest";
import { evaluateHand } from "../../evaluateHand";
import { HandCategory, Board, HoleCards } from "../../types";

describe("evaluateHand", () => {
  it("devrait retourner HighCard et les 5 meilleures cartes triées", () => {
    // Board: 2 Pique, 5 Coeur, 9 Carreau, Valet Trefle, Roi Pique
    const board: Board = [
      { rank: 2, suit: "P" },
      { rank: 5, suit: "C" },
      { rank: 9, suit: "K" },
      { rank: 11, suit: "T" },
      { rank: 13, suit: "P" },
    ];

    // Joueur: 4 Trefle, 7 Coeur
    const holeCards: HoleCards = [
      { rank: 4, suit: "T" },
      { rank: 7, suit: "C" },
    ];

    const result = evaluateHand(board, holeCards);

    expect(result.category).toBe(HandCategory.HighCard);
    // Les 5 cartes les plus fortes parmi les 7 par ordre décroissant (13, 11, 9, 7, 5)
    expect(result.chosen5).toEqual([
      { rank: 13, suit: "P" },
      { rank: 11, suit: "T" },
      { rank: 9, suit: "K" },
      { rank: 7, suit: "C" },
      { rank: 5, suit: "C" },
    ]);
  });
});
