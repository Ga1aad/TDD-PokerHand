import { describe, it, expect } from "vitest";
import { compareHands } from "../../compareHands";
import { HandCategory } from "../../types";

describe("compareHands - Four of a Kind Tie-Break", () => {
    it("devrait départager sur la valeur du carré", () => {
        const handA = {
            category: HandCategory.FourOfAKind,
            chosen5: [
                { rank: 9, suit: "C" }, { rank: 9, suit: "P" }, { rank: 9, suit: "K" }, { rank: 9, suit: "T" },
                { rank: 5, suit: "T" },
            ]
        };
        const handB = {
            category: HandCategory.FourOfAKind,
            chosen5: [
                { rank: 8, suit: "C" }, { rank: 8, suit: "P" }, { rank: 8, suit: "K" }, { rank: 8, suit: "T" },
                { rank: 14, suit: "T" },
            ]
        };
        expect(compareHands(handA, handB)).toBe(1);
    });

    it("devrait départager sur le kicker si les carrés sont (théoriquement) égaux", () => {
        const handA = {
            category: HandCategory.FourOfAKind,
            chosen5: [
                { rank: 9, suit: "C" }, { rank: 9, suit: "P" }, { rank: 9, suit: "K" }, { rank: 9, suit: "T" },
                { rank: 6, suit: "T" },
            ]
        };
        const handB = {
            category: HandCategory.FourOfAKind,
            chosen5: [
                { rank: 9, suit: "C" }, { rank: 9, suit: "P" }, { rank: 9, suit: "K" }, { rank: 9, suit: "T" },
                { rank: 5, suit: "T" },
            ]
        };
        expect(compareHands(handA, handB)).toBe(1);
    });
});

describe("compareHands - Tie (Egalité parfaite)", () => {
    it("devrait renvoyer 0 si toutes les cartes sont égales", () => {
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
        const handB = {
            category: HandCategory.HighCard,
            chosen5: [
                { rank: 14, suit: "T" }, // Les Suits n'importent pas pour le tie-break (règle explicite)
                { rank: 12, suit: "C" },
                { rank: 9, suit: "P" },
                { rank: 7, suit: "K" },
                { rank: 5, suit: "T" },
            ]
        };
        expect(compareHands(handA, handB)).toBe(0);
    });
});
