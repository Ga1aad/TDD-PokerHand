# TDD-PokerHand

Ce projet est un projet académique réalisé dans le cadre du cours de **Test Driven Development (TDD)** en M2 Dev Manager Fullstack à l'EFREI.

Projet réalisé par **Galaad Filâtre** et **Clément Suire**.

```bash
# Installation des dépendances
npm install

# Lancement de l'app
npm run dev
```

## Objectif du Projet

L'objectif est de mettre en place un moteur d'évaluation et de comparaison de mains de Poker Texas Hold'em en suivant rigoureusement la méthodologie **TDD**.
Vous pouvez retrouver les détails de l'énoncé ici : [Énoncé](./docs/tdd-exam-grp2-2026.pdf)

## Stack Technique

- **Langage** : TypeScript
- **Framework de Test** : Vitest
- **Outil de Build** : Vite

## Méthodologie TDD (Red-Green-Refactor)

Ce projet a été développé en respectant les cycles du TDD :

1.  **Red (Rouge)** : Écriture systématique d'un test unitaire décrivant un cas métier (ex: détecter un brelan) avant toute implémentation. Le test échoue initialement.
2.  **Green (Vert)** : Écriture du code d'implémentation minimal pour faire passer le test au vert.
3.  **Refactor (Refactorisation)** : Nettoyage et optimisation du code tout en s'assurant que tous les tests restent au vert.

## Fonctionnalités Implémentées

### 1. Évaluation des mains (`evaluateHand.ts`)

Détection et classification des 9 catégories de mains officielles du Poker (de la plus forte à la plus faible) :

- Quinte Flush (Straight Flush)
- Carré (Four of a Kind)
- Full (Full House)
- Couleur (Flush)
- Suite (Straight) - incluant la suite basse "Wheel" (A-2-3-4-5)
- Brelan (Three of a Kind)
- Double Paire (Two Pair)
- Paire (One Pair)
- Carte Haute (High Card)

### 2. Comparaison de deux mains (`compareHands.ts`)

Logique de départage (Tie-break) complète suivant les règles officielles :

- Comparaison par catégorie.
- En cas d'égalité de catégorie, départage sur les valeurs des cartes (Paire haute > Paire basse, Brelan du Full > Paire du Full, Kickers, etc.).

## Lancement des Tests

Pour exécuter l'ensemble des tests unitaires et vérifier la conformité du moteur :

```bash
# Installation des dépendances
npm install

# Lancement des tests (Vitest)
npm run test

# Lancement des tests avec UI (Vitest)
npm run test:ui
```

Le projet contient actuellement **18 fichiers de tests** couvrant **28 cas d'usages** et de départages spécifiques.
