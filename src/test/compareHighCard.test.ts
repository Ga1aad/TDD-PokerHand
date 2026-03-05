import { describe, it, expect } from "vitest";
import { compareHands } from "../compareHands";
import { HandCategory } from "../types";

describe("compareHands - High Card Tie-Break", () => {
    it("devrait départager deux High Card en descendant carte par carte", () => {
        // Joueur A: As, Dame, 9, 7, 5
        const handA = {
            category: HandCategory.HighCard,
            chosen5: [
                { rank: 14, suit: "C" },
                { rank: 12, suit: "P" },
                { rank: 9, suit: "K" },
                { rank: 7, suit: "T" },
                { rank: 5, suit: "P" },
            ]
        };

        // Joueur B: As, Dame, 9, 6, 4 (Perd sur le 4e kicker : 7 > 6)
        const handB = {
            category: HandCategory.HighCard,
            chosen5: [
                { rank: 14, suit: "T" },
                { rank: 12, suit: "C" },
                { rank: 9, suit: "P" },
                { rank: 6, suit: "K" },
                { rank: 4, suit: "T" },
            ]
        };

        expect(compareHands(handA, handB)).toBe(1);
    });
});
