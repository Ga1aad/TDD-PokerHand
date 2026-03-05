import { describe, it, expect } from "vitest";
import { compareHands } from "../../compareHands";
import { HandCategory } from "../../types";

describe("compareHands - Two Pair Tie-Break", () => {
    it("devrait départager sur la paire la plus haute", () => {
        const handA = {
            category: HandCategory.TwoPair,
            chosen5: [
                { rank: 11, suit: "C" }, { rank: 11, suit: "P" }, // As
                { rank: 3, suit: "K" }, { rank: 3, suit: "T" },
                { rank: 2, suit: "P" },
            ]
        };
        const handB = {
            category: HandCategory.TwoPair,
            chosen5: [
                { rank: 9, suit: "T" }, { rank: 9, suit: "C" }, // As
                { rank: 8, suit: "P" }, { rank: 8, suit: "K" },
                { rank: 14, suit: "T" },
            ]
        };
        expect(compareHands(handA, handB)).toBe(1); // 11s and 3s bat 9s and 8s
    });

    it("devrait départager sur la deuxième paire si la première est égale", () => {
        const handA = {
            category: HandCategory.TwoPair,
            chosen5: [
                { rank: 11, suit: "C" }, { rank: 11, suit: "P" },
                { rank: 8, suit: "K" }, { rank: 8, suit: "T" },
                { rank: 2, suit: "P" },
            ]
        };
        const handB = {
            category: HandCategory.TwoPair,
            chosen5: [
                { rank: 11, suit: "T" }, { rank: 11, suit: "K" },
                { rank: 5, suit: "P" }, { rank: 5, suit: "C" },
                { rank: 14, suit: "T" },
            ]
        };
        expect(compareHands(handA, handB)).toBe(1); // 11s and 8s bat 11s and 5s
    });

    it("devrait départager sur le kicker si les deux paires sont égales", () => {
        const handA = {
            category: HandCategory.TwoPair,
            chosen5: [
                { rank: 11, suit: "C" }, { rank: 11, suit: "P" },
                { rank: 8, suit: "K" }, { rank: 8, suit: "T" },
                { rank: 14, suit: "P" }, // As Kicker
            ]
        };
        const handB = {
            category: HandCategory.TwoPair,
            chosen5: [
                { rank: 11, suit: "T" }, { rank: 11, suit: "K" },
                { rank: 8, suit: "P" }, { rank: 8, suit: "C" },
                { rank: 5, suit: "T" }, // 5 Kicker
            ]
        };
        expect(compareHands(handA, handB)).toBe(1);
    });
});
