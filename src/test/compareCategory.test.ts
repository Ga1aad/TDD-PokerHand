import { describe, it, expect } from "vitest";
import { compareHands } from "../compareHands";
import { HandCategory } from "../types";

describe("compareHands - Catégories différentes", () => {
    it("devrait désigner la main avec la catégorie la plus forte comme gagnante (ex: Pair bat HighCard)", () => {
        // Joueur A: Paire de 9
        const handA = {
            category: HandCategory.OnePair,
            chosen5: [
                { rank: 9, suit: "C" },
                { rank: 9, suit: "P" },
                { rank: 14, suit: "K" },
                { rank: 5, suit: "T" },
                { rank: 2, suit: "P" },
            ]
        };

        // Joueur B: High Card (As)
        const handB = {
            category: HandCategory.HighCard,
            chosen5: [
                { rank: 14, suit: "T" },
                { rank: 11, suit: "C" },
                { rank: 8, suit: "P" },
                { rank: 4, suit: "K" },
                { rank: 3, suit: "T" },
            ]
        };

        // Le résultat attendu est 1 (Joueur A gagne)
        expect(compareHands(handA, handB)).toBe(1);

        // Le résultat attendu en inversant est -1 (Joueur B perd)
        expect(compareHands(handB, handA)).toBe(-1);
    });
});
