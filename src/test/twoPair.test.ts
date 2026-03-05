import { describe, it, expect } from "vitest";
import { evaluateHand } from "../evaluateHand";
import { HandCategory, Board, HoleCards } from "../types";

describe("evaluateHand - Two Pair", () => {
  it("devrait détecter une double paire (TwoPair) et renvoyer les 5 meilleures cartes correctement triées", () => {
    // Board : Valet(11) Pique, 9 Coeur, 3 Carreau, 3 Trefle, 2 Pique
    const board: Board = [
      { rank: 11, suit: "P" },
      { rank: 9, suit: "C" },
      { rank: 3, suit: "K" },
      { rank: 3, suit: "T" },
      { rank: 2, suit: "P" },
    ];

    // Joueur : Valet(11) Trefle, As(14) Coeur
    const holeCards: HoleCards = [
      { rank: 11, suit: "T" },
      { rank: 14, suit: "C" },
    ];

    const result = evaluateHand(board, holeCards);

    // Vérification : on s'attend à avoir la catégorie TwoPair (Double Paire)
    expect(result.category).toBe(HandCategory.TwoPair);

    // Vérification : L'ordre doit être Pair Supérieure, Pair Inférieure, Meilleur Kicker
    expect(result.chosen5).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rank: 11 }),
        expect.objectContaining({ rank: 11 }),
        expect.objectContaining({ rank: 3 }),
        expect.objectContaining({ rank: 3 }),
        expect.objectContaining({ rank: 14 }),
      ]),
    );
  });
});
