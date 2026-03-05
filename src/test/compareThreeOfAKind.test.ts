import { describe, it, expect } from "vitest";
import { compareHands } from "../compareHands";
import { HandCategory } from "../types";

describe("compareHands - Three of a Kind Tie-Break", () => {
    it("devrait départager sur la valeur du brelan", () => {
        const handA = {
            category: HandCategory.ThreeOfAKind,
            chosen5: [
                { rank: 14, suit: "C" }, { rank: 14, suit: "P" }, { rank: 14, suit: "K" },
                { rank: 5, suit: "T" }, { rank: 2, suit: "P" },
            ]
        };
        const handB = {
            category: HandCategory.ThreeOfAKind,
            chosen5: [
                { rank: 13, suit: "T" }, { rank: 13, suit: "C" }, { rank: 13, suit: "P" },
                { rank: 14, suit: "K" }, { rank: 12, suit: "T" },
            ]
        };
        expect(compareHands(handA, handB)).toBe(1);
    });

    it("devrait départager sur les kickers si les brelans sont (théoriquement) égaux sur le plateau", () => {
        // Scenario possible avec un brelan sur le board (communautaire) et on regarde les cartes en main
        const handA = {
            category: HandCategory.ThreeOfAKind,
            chosen5: [
                { rank: 10, suit: "C" }, { rank: 10, suit: "P" }, { rank: 10, suit: "K" },
                { rank: 14, suit: "T" }, { rank: 5, suit: "P" }, // Kicker As
            ]
        };
        const handB = {
            category: HandCategory.ThreeOfAKind,
            chosen5: [
                { rank: 10, suit: "T" }, { rank: 10, suit: "C" }, { rank: 10, suit: "P" },
                { rank: 12, suit: "K" }, { rank: 4, suit: "T" }, // Kicker Dame
            ]
        };
        expect(compareHands(handA, handB)).toBe(1);
    });
});
