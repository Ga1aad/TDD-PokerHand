import "./style.css";
import { createDeck, shuffleDeck, cardToString } from "./poker";
import { evaluateHand } from "./evaluateHand";
import { compareHands } from "./compareHands";
import { HandCategory } from "./types";
import type { Board, HoleCards } from "./types";

const categoryNames: Record<HandCategory, string> = {
  [HandCategory.StraightFlush]: "Quinte Flush",
  [HandCategory.FourOfAKind]: "Carré",
  [HandCategory.FullHouse]: "Full",
  [HandCategory.Flush]: "Couleur",
  [HandCategory.Straight]: "Suite",
  [HandCategory.ThreeOfAKind]: "Brelan",
  [HandCategory.TwoPair]: "Double Paire",
  [HandCategory.OnePair]: "Paire",
  [HandCategory.HighCard]: "Carte Haute",
};

function playRound() {
  const deck = shuffleDeck(createDeck());
  const board: Board = deck.slice(0, 5) as unknown as Board;
  const player1Cards: HoleCards = deck.slice(5, 7) as unknown as HoleCards;
  const player2Cards: HoleCards = deck.slice(7, 9) as unknown as HoleCards;

  const res1 = evaluateHand(board, player1Cards);
  const res2 = evaluateHand(board, player2Cards);

  const winnerCode = compareHands(res1, res2);

  let winnerText = "";
  if (winnerCode === 1) winnerText = "Le joueur 1 gagne !";
  else if (winnerCode === -1) winnerText = "Le joueur 2 gagne !";
  else winnerText = "Égalité !";

  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div class="simulation">
      <h1>Simulation Poker ♠♥♣♦</h1>
      <button id="playBtn">Distribuer une nouvelle main</button>
      
      <div class="board">
        <h2>Board (River)</h2>
        <div class="cards">
          ${board.map((c) => `<span class="card-display ${c.suit}">${cardToString(c)}</span>`).join(" ")}
        </div>
      </div>

      <div class="players">
        <div class="player">
          <h3>Joueur 1</h3>
          <div class="cards">
            ${player1Cards.map((c) => `<span class="card-display ${c.suit}">${cardToString(c)}</span>`).join(" ")}
          </div>
          <p>Main : <strong>${categoryNames[res1.category]}</strong></p>
          <div class="chosen">
            Meilleures 5 cartes : ${res1.chosen5.map((c) => cardToString(c)).join(", ")}
          </div>
        </div>

        <div class="player">
          <h3>Joueur 2</h3>
          <div class="cards">
            ${player2Cards.map((c) => `<span class="card-display ${c.suit}">${cardToString(c)}</span>`).join(" ")}
          </div>
          <p>Main : <strong>${categoryNames[res2.category]}</strong></p>
           <div class="chosen">
            Meilleures 5 cartes : ${res2.chosen5.map((c) => cardToString(c)).join(", ")}
          </div>
        </div>
      </div>

      <h2 class="winner">${winnerText}</h2>
    </div>
  `;

  document.getElementById("playBtn")?.addEventListener("click", playRound);
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="simulation">
    <h1>Simulation Poker ♠♥♣♦</h1>
    <button id="playBtn">Lancer la première main</button>
  </div>
`;

document.getElementById("playBtn")?.addEventListener("click", playRound);
