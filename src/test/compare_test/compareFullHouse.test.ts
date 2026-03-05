import { describe, it, expect } from "vitest";
import { compareHands } from "../../compareHands";
import { HandCategory } from "../../types";

describe("compareHands - Full House Tie-Break", () => {
    it("devrait départager sur la valeur du brelan du Full", () => {
        const handA = {
            category: HandCategory.FullHouse,
            chosen5: [
                { rank: 8, suit: "C" }, { rank: 8, suit: "P" }, { rank: 8, suit: "K" }, // Brelan 8
                { rank: 4, suit: "T" }, { rank: 4, suit: "P" }, // Paire 4
            ]
        };

        const handB = {
            category: HandCategory.FullHouse,
            chosen5: [
                { rank: 7, suit: "T" }, { rank: 7, suit: "C" }, { rank: 7, suit: "P" }, // Brelan 7
                { rank: 14, suit: "K" }, { rank: 14, suit: "T" }, // Paire As
            ]
        };

        expect(compareHands(handA, handB)).toBe(1); // 8 bat 7 même si As bat 4
    });

    it("devrait départager sur la paire si les brelans sont égaux", () => {
        const handA = {
            category: HandCategory.FullHouse,
            chosen5: [
                { rank: 8, suit: "C" }, { rank: 8, suit: "P" }, { rank: 8, suit: "K" },
                { rank: 5, suit: "T" }, { rank: 5, suit: "P" }, // Paire 5
            ]
        };

        const handB = {
            category: HandCategory.FullHouse,
            chosen5: [
                { rank: 8, suit: "T" }, { rank: 8, suit: "C" }, { rank: 8, suit: "P" },
                { rank: 4, suit: "K" }, { rank: 4, suit: "T" }, // Paire 4
            ]
        };

        expect(compareHands(handA, handB)).toBe(1);
    });
});
