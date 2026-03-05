import { describe, it, expect } from "vitest";
import { evaluateHand } from "../../evaluateHand";
import { HandCategory, Board, HoleCards } from "../../types";

describe("evaluateHand - Flush", () => {
  it("devrait détecter une couleur (Flush) et renvoyer les 5 meilleures cartes de la couleur triées", () => {
    // Board : 3 coeurs
    const board: Board = [
      { rank: 9, suit: "C" },
      { rank: 2, suit: "C" },
      { rank: 5, suit: "C" },
      { rank: 14, suit: "T" },
      { rank: 3, suit: "P" },
    ];

    // Joueur : 2 coeurs
    const holeCards: HoleCards = [
      { rank: 11, suit: "C" },
      { rank: 13, suit: "C" },
    ];

    const result = evaluateHand(board, holeCards);

    // Vérification : on s'attend à avoir la catégorie Flush
    expect(result.category).toBe(HandCategory.Flush);

    // Vérification : Les 5 meilleures cartes de la couleur
    // Ici Roi (13), Valet (11), 9, 5, 2
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 13, suit: "C" }),
      expect.objectContaining({ rank: 11, suit: "C" }),
      expect.objectContaining({ rank: 9, suit: "C" }),
      expect.objectContaining({ rank: 5, suit: "C" }),
      expect.objectContaining({ rank: 2, suit: "C" }),
    ]);
  });
});
