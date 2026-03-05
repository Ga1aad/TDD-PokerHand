import { describe, it, expect } from "vitest";
import { evaluateHand } from "../../evaluateHand";
import { HandCategory, Board, HoleCards } from "../../types";

describe("evaluateHand - Straight", () => {
  it("devrait détecter une suite (Straight) et renvoyer les 5 cartes de la suite correctement triées", () => {
    // Board : 9, 8, 7, 2, As(14)
    const board: Board = [
      { rank: 9, suit: "C" },
      { rank: 8, suit: "P" },
      { rank: 7, suit: "K" },
      { rank: 14, suit: "T" },
      { rank: 2, suit: "P" },
    ];

    // Joueur : Valet(11), 10
    const holeCards: HoleCards = [
      { rank: 11, suit: "C" },
      { rank: 10, suit: "T" },
    ];

    const result = evaluateHand(board, holeCards);

    // Vérification : on s'attend à avoir la catégorie Straight (Suite)
    expect(result.category).toBe(HandCategory.Straight);

    // Vérification : Les 5 meilleures cartes doivent être la suite, ordonnée de façon décroissante
    // Ici : Valet(11), 10, 9, 8, 7
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 11 }),
      expect.objectContaining({ rank: 10 }),
      expect.objectContaining({ rank: 9 }),
      expect.objectContaining({ rank: 8 }),
      expect.objectContaining({ rank: 7 }),
    ]);
  });

  it("devrait détecter une suite (Straight) avec l'As comme carte la plus faible (A, 2, 3, 4, 5)", () => {
    // Board : 5 Coeur, 4 Pique, 3 Carreau, Roi(13) Trefle, Dame(12) Pique
    const board: Board = [
      { rank: 5, suit: "C" },
      { rank: 4, suit: "P" },
      { rank: 3, suit: "K" },
      { rank: 13, suit: "T" },
      { rank: 12, suit: "P" },
    ];

    // Joueur : 2 Coeur, As(14) Trefle
    const holeCards: HoleCards = [
      { rank: 2, suit: "C" },
      { rank: 14, suit: "T" },
    ];

    const result = evaluateHand(board, holeCards);

    // Vérification : on s'attend à avoir la catégorie Straight (Suite)
    expect(result.category).toBe(HandCategory.Straight);

    // Vérification : Les 5 meilleures cartes doivent être la suite 5, 4, 3, 2, A
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 5 }),
      expect.objectContaining({ rank: 4 }),
      expect.objectContaining({ rank: 3 }),
      expect.objectContaining({ rank: 2 }),
      expect.objectContaining({ rank: 14 }),
    ]);
  });

  it("devrait renvoyer les 5 meilleures cartes d'une suite de plus de 5 cartes", () => {
    // Board : 9, 8, 7, 6, 2
    const board: Board = [
      { rank: 9, suit: "C" },
      { rank: 8, suit: "P" },
      { rank: 7, suit: "K" },
      { rank: 6, suit: "T" },
      { rank: 2, suit: "P" },
    ];

    // Joueur : 10, 5 (Suite de 6 cartes : 10, 9, 8, 7, 6, 5)
    const holeCards: HoleCards = [
      { rank: 10, suit: "C" },
      { rank: 5, suit: "T" },
    ];

    const result = evaluateHand(board, holeCards);

    expect(result.category).toBe(HandCategory.Straight);

    // Vérification : La plus haute suite possible doit être choisie (10, 9, 8, 7, 6)
    expect(result.chosen5).toEqual([
      expect.objectContaining({ rank: 10 }),
      expect.objectContaining({ rank: 9 }),
      expect.objectContaining({ rank: 8 }),
      expect.objectContaining({ rank: 7 }),
      expect.objectContaining({ rank: 6 }),
    ]);
  });
});
