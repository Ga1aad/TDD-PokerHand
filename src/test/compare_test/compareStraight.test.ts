import { describe, it, expect } from "vitest";
import { compareHands } from "../../compareHands";
import { HandCategory } from "../../types";

describe("compareHands - Straight Tie-Break", () => {
    it("devrait départager sur la carte la plus haute de la suite", () => {
        // Joueur A: Suite As-high
        const handA = {
            category: HandCategory.Straight,
            chosen5: [
                { rank: 14, suit: "C" },
                { rank: 13, suit: "P" },
                { rank: 12, suit: "K" },
                { rank: 11, suit: "T" },
                { rank: 10, suit: "P" },
            ]
        };

        // Joueur B: Suite 9-high
        const handB = {
            category: HandCategory.Straight,
            chosen5: [
                { rank: 9, suit: "T" },
                { rank: 8, suit: "C" },
                { rank: 7, suit: "P" },
                { rank: 6, suit: "K" },
                { rank: 5, suit: "T" },
            ]
        };

        expect(compareHands(handA, handB)).toBe(1);
    });

    it("devrait départager A-5-4-3-2 (Suite 5-high) avec une suite 6-high", () => {
        // Joueur A: Suite 6-high (6-5-4-3-2)
        const handA = {
            category: HandCategory.Straight,
            chosen5: [
                { rank: 6, suit: "C" },
                { rank: 5, suit: "P" },
                { rank: 4, suit: "K" },
                { rank: 3, suit: "T" },
                { rank: 2, suit: "P" },
            ]
        };

        // Joueur B: Suite 5-high alias A-5-4-3-2 l'As étant la valeur 1
        const handB = {
            category: HandCategory.Straight,
            chosen5: [
                { rank: 5, suit: "T" },
                { rank: 4, suit: "C" },
                { rank: 3, suit: "P" },
                { rank: 2, suit: "K" },
                { rank: 14, suit: "T" }, // As
            ]
        };

        // Le 6 bat le 5
        expect(compareHands(handA, handB)).toBe(1);
    });
});
