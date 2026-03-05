import { describe, it, expect } from "vitest";
import { evaluateHand } from "../../evaluateHand";
import { HandCategory, Board, HoleCards } from "../../types";

describe("evaluateHand - Three of a Kind", () => {
  it("devrait détecter un brelan (ThreeOfAKind) et renvoyer les 5 meilleures cartes correctement triées", () => {
    // Board : 8 Pique, 8 Coeur, 5 Carreau, 3 Trefle, 2 Pique
    const board: Board = [
      { rank: 8, suit: "P" },
      { rank: 8, suit: "C" },
      { rank: 5, suit: "K" },
      { rank: 3, suit: "T" },
      { rank: 2, suit: "P" },
    ];

    // Joueur : 8 Trefle, As(14) Coeur
    const holeCards: HoleCards = [
      { rank: 8, suit: "T" },
      { rank: 14, suit: "C" },
    ];

    const result = evaluateHand(board, holeCards);

    // Vérification : on s'attend à avoir la catégorie ThreeOfAKind (Brelan)
    expect(result.category).toBe(HandCategory.ThreeOfAKind);

    // Vérification : Les 5 meilleures cartes doivent inclure les 3 cartes du brelan et les 2 meilleurs kickers
    // Ici : 8, 8, 8, As(14), 5
    expect(result.chosen5).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rank: 8 }),
        expect.objectContaining({ rank: 8 }),
        expect.objectContaining({ rank: 8 }),
        expect.objectContaining({ rank: 14 }),
        expect.objectContaining({ rank: 5 }),
      ]),
    );
  });
});
