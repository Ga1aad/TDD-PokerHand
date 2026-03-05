import { describe, it, expect } from "vitest";
import { evaluateHand } from "../../evaluateHand";
import { HandCategory, Board, HoleCards } from "../../types";

describe("evaluateHand - Four Of A Kind", () => {
  it("devrait détecter un carré (Four Of A Kind) et renvoyer les 4 cartes puis le meilleur kicker", () => {
    // Board : Carré de 7
    const board: Board = [
      { rank: 7, suit: "C" },
      { rank: 7, suit: "P" },
      { rank: 7, suit: "K" },
      { rank: 14, suit: "T" }, // kicker possible : As
      { rank: 2, suit: "P" },
    ];

    // Joueur : 7, Roi(13)
    const holeCards: HoleCards = [
      { rank: 7, suit: "T" },
      { rank: 13, suit: "T" },
    ];

    const result = evaluateHand(board, holeCards);

    expect(result.category).toBe(HandCategory.FourOfAKind);

    // Vérification : Les 4 cartes du carré puis le meilleur kicker (As > Roi)
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 7 }),
      expect.objectContaining({ rank: 7 }),
      expect.objectContaining({ rank: 7 }),
      expect.objectContaining({ rank: 7 }),
      expect.objectContaining({ rank: 14 }),
    ]);
  });
});
