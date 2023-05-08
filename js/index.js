// capturar
const startButton = document.querySelector("#startButton");
const home = document.querySelector("#home");
const inputName = document.querySelector("#inputName");
const gameScreen = document.querySelector("#gameScreen");
const board = document.querySelector("#board");
const name = document.querySelector("#name");
const score = document.querySelector("#score");

// imagens
const deck = [
  "./images/harmonia.svg",
  "./images/poder.svg",
  "./images/projetar.svg",
  "./images/refletir.svg",
  "./images/harmonia.svg",
  "./images/poder.svg",
  "./images/projetar.svg",
  "./images/refletir.svg",
];

// variaveis
let playerName = "";
let selectCards = [];
let lifes = 4;

//eventos
startButton.addEventListener("click", () => {
  playerName = inputName.value;
  home.classList.add("hide");
  gameScreen.classList.remove("hide");
  startGame();
});

function startGame() {
  // embaralhar as cartas
  deck.sort(() => Math.random() - 0.5);

  // criar as cartas
  createCards();
  score.innerText = lifes;
  name.innerText = playerName;

  // adicionar evento de click
  const cards = document.querySelectorAll(".back");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.remove("show");
      card.classList.add("hide");
      card.previousElementSibling.classList.remove("hide");
      card.previousElementSibling.classList.add("show");

      //adicionar a carta a array
      selectCards.push(card.previousElementSibling);

      checkCards();

      checkStatus();
    });
  });
}

function createCards() {
  deck.forEach((card) => {
    const imgFront = document.createElement("img");
    imgFront.setAttribute("src", card);
    imgFront.classList.add("front");
    imgFront.classList.add("hide");

    const imgBack = document.createElement("img");
    imgBack.setAttribute("src", "./images/back.svg");
    imgBack.classList.add("back");
    imgBack.classList.add("show");

    board.appendChild(imgFront);
    board.appendChild(imgBack);
  });
}

function checkCards() {
  if (selectCards.length === 2) {
    console.log(selectCards);
    //checar se são iguais
    if (selectCards[0].src === selectCards[1].src) {
      console.log("são iguais");
      selectCards[0].classList.add("turn");
      selectCards[1].classList.add("turn");
      selectCards = [];
      return;
    }

    if (selectCards[0].src !== selectCards[1].src) {
      console.log("são diferentes");
      lifes--;
      score.innerText = lifes;
      setTimeout(() => {
        selectCards.forEach((card) => {
          card.classList.remove("show");
          card.classList.add("hide");

          card.nextElementSibling.classList.remove("hide");
          card.nextElementSibling.classList.add("show");
        });
        selectCards = [];
        return;
      }, 1000);
    }
  }
}

function checkStatus() {
  const allCardsTurn = document.querySelectorAll(".turn");
  
  if (allCardsTurn.length === deck.length) {
    alert("Você venceu!");
  }

  if (lifes === 0) {
    alert("Você perdeu!");
  }
}
