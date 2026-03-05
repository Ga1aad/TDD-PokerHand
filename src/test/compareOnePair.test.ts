import { describe, it, expect } from "vitest";
import { compareHands } from "../compareHands";
import { HandCategory } from "../types";

describe("compareHands - One Pair Tie-Break", () => {
    it("devrait départager sur la valeur de la paire", () => {
        const handA = {
            category: HandCategory.OnePair,
            chosen5: [
                { rank: 10, suit: "C" }, { rank: 10, suit: "P" }, // Paire 10
                { rank: 5, suit: "K" }, { rank: 4, suit: "T" }, { rank: 2, suit: "P" },
            ]
        };

        const handB = {
            category: HandCategory.OnePair,
            chosen5: [
                { rank: 9, suit: "T" }, { rank: 9, suit: "C" }, // Paire 9
                { rank: 14, suit: "P" }, { rank: 13, suit: "K" }, { rank: 12, suit: "T" },
            ]
        };

        expect(compareHands(handA, handB)).toBe(1); // 10s bat 9s même avec de meilleurs kickers
    });

    it("devrait départager sur les kickers si les paires sont égales", () => {
        const handA = {
            category: HandCategory.OnePair,
            chosen5: [
                { rank: 10, suit: "C" }, { rank: 10, suit: "P" },
                { rank: 14, suit: "K" }, { rank: 5, suit: "T" }, { rank: 2, suit: "P" },
            ]
        };

        const handB = {
            category: HandCategory.OnePair,
            chosen5: [
                { rank: 10, suit: "T" }, { rank: 10, suit: "K" },
                { rank: 14, suit: "P" }, { rank: 4, suit: "C" }, { rank: 3, suit: "T" }, // Perd sur le 2eme kicker (5 > 4)
            ]
        };

        expect(compareHands(handA, handB)).toBe(1);
    });
});
