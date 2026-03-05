import { describe, it, expect } from "vitest";
import { compareHands } from "../compareHands";
import { HandCategory } from "../types";

describe("compareHands - Flush Tie-Break", () => {
    it("devrait départager deux Flush en descendant carte par carte", () => {
        // Joueur A: Flush au Roi
        const handA = {
            category: HandCategory.Flush,
            chosen5: [
                { rank: 13, suit: "C" }, // Roi
                { rank: 12, suit: "C" },
                { rank: 9, suit: "C" },
                { rank: 7, suit: "C" },
                { rank: 5, suit: "C" },
            ]
        };

        // Joueur B: Flush à la Dame
        const handB = {
            category: HandCategory.Flush,
            chosen5: [
                { rank: 12, suit: "P" }, // Dame
                { rank: 11, suit: "P" },
                { rank: 9, suit: "P" },
                { rank: 6, suit: "P" },
                { rank: 4, suit: "P" },
            ]
        };

        expect(compareHands(handA, handB)).toBe(1);
    });
});
