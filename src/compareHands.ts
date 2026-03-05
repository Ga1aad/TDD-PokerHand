import { HandResult, HandCategory } from "./types";

/**
 * Compare deux mains de poker.
 * @param handA La première main
 * @param handB La deuxième main
 * @returns 1 si handA gagne, -1 si handB gagne, 0 en cas d'égalité parfaite (Tie)
 */
export function compareHands(handA: HandResult, handB: HandResult): number {
  // 1. Comparaison par catégorie
  if (handA.category < handB.category) return 1;
  if (handA.category > handB.category) return -1;

  const cat = handA.category;
  const cardsA = handA.chosen5;
  const cardsB = handB.chosen5;

  // 4. Règles de départage (quand les catégories sont égales)
  switch (cat) {
    case HandCategory.StraightFlush:
    case HandCategory.Straight:
      // Compare la carte la plus haute de la suite.
      // (Pour la suite 5-high A-2-3-4-5, la plus haute est le 5, qui est à la position 0 dans le tableau grâce à evaluateHand)
      if (cardsA[0].rank > cardsB[0].rank) return 1;
      if (cardsA[0].rank < cardsB[0].rank) return -1;
      return 0;

    case HandCategory.FourOfAKind:
      // Compare la valeur du carré
      if (cardsA[0].rank > cardsB[0].rank) return 1;
      if (cardsA[0].rank < cardsB[0].rank) return -1;
      // Compare le kicker (la carte restante)
      if (cardsA[4].rank > cardsB[4].rank) return 1;
      if (cardsA[4].rank < cardsB[4].rank) return -1;
      return 0;

    case HandCategory.FullHouse:
      // Compare d'abord la valeur du brelan
      if (cardsA[0].rank > cardsB[0].rank) return 1;
      if (cardsA[0].rank < cardsB[0].rank) return -1;
      // Compare ensuite la valeur de la paire
      if (cardsA[3].rank > cardsB[3].rank) return 1;
      if (cardsA[3].rank < cardsB[3].rank) return -1;
      return 0;

    case HandCategory.Flush:
    case HandCategory.HighCard:
      // Compare les cinq cartes par ordre décroissant
      for (let i = 0; i < 5; i++) {
        if (cardsA[i].rank > cardsB[i].rank) return 1;
        if (cardsA[i].rank < cardsB[i].rank) return -1;
      }
      return 0;

    case HandCategory.ThreeOfAKind:
      // Compare la valeur du brelan
      if (cardsA[0].rank > cardsB[0].rank) return 1;
      if (cardsA[0].rank < cardsB[0].rank) return -1;
      // Compare les deux kickers restants par ordre décroissant
      for (let i = 3; i < 5; i++) {
        if (cardsA[i].rank > cardsB[i].rank) return 1;
        if (cardsA[i].rank < cardsB[i].rank) return -1;
      }
      return 0;

    case HandCategory.TwoPair:
      // Compare la paire la plus haute
      if (cardsA[0].rank > cardsB[0].rank) return 1;
      if (cardsA[0].rank < cardsB[0].rank) return -1;
      // Compare la paire la plus basse
      if (cardsA[2].rank > cardsB[2].rank) return 1;
      if (cardsA[2].rank < cardsB[2].rank) return -1;
      // Compare le kicker
      if (cardsA[4].rank > cardsB[4].rank) return 1;
      if (cardsA[4].rank < cardsB[4].rank) return -1;
      return 0;

    case HandCategory.OnePair:
      // Compare la valeur de la paire
      if (cardsA[0].rank > cardsB[0].rank) return 1;
      if (cardsA[0].rank < cardsB[0].rank) return -1;
      // Compare les trois kickers restants par ordre décroissant
      for (let i = 2; i < 5; i++) {
        if (cardsA[i].rank > cardsB[i].rank) return 1;
        if (cardsA[i].rank < cardsB[i].rank) return -1;
      }
      return 0;
  }

  return 0;
}
