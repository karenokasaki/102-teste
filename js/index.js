//capturar os elementos de html
const homeScreen = document.querySelector("#homeScreen");
const buttonStart = document.querySelector("#buttonStart");
const gameScrren = document.querySelector("#gameScreen");
const board = document.querySelector("#board");
const winScreen = document.querySelector("#winScreen");
const loseScreen = document.querySelector("#loseScreen");
const livesSpan = document.querySelector("#livesSpan");

// variáveis
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
let selectedCards = [];
let lives = 2;

buttonStart.addEventListener("click", () => {
  // o que é para acontecer quando eu clicar no botão jogar?

  // esconder a minha homeScreen
  // como? -> adicionando a classe hide
  homeScreen.classList.add("hide");

  // mostrar a gameScreen
  // como? -> removendo a classe hide da div
  gameScrren.classList.remove("hide");

  startGame();
});

function startGame() {
  // embaralhar as cartas
  deck.sort(() => Math.random() - 0.5);

  //adicionar as vidas
  livesSpan.innerText = lives;

  // criar as tags <img /> com o src das imagens
  createCards();

  // adicionar um eventListener em todas as cartas que tem a classe "back"
  const cardsBack = document.querySelectorAll(".back");
  cardsBack.forEach((card) => {
    card.addEventListener("click", () => {
      if (selectedCards.length === 2) {
        return;
      }
      //escondendo a card back
      card.classList.add("hide");
      //mostrei a carta de trás
      card.previousElementSibling.classList.remove("hide");
      // adicionar a carta clicada a minha array de selecionadas
      selectedCards.push(card.previousElementSibling);

      checkPair();

      checkStatusGame();
    });
  });
}

function createCards() {
  deck.forEach((card) => {
    const imgTag = document.createElement("img"); // <img />
    imgTag.setAttribute("src", card); // <img src="./images/harmonia.svg" />
    imgTag.classList.add("hide"); // <img src="./images/harmonia.svg" class="hide" />
    board.appendChild(imgTag);

    const imgBack = document.createElement("img");
    imgBack.setAttribute("src", "./images/back.svg");
    imgBack.classList.add("back");
    board.appendChild(imgBack);
  });
}

function checkPair() {
  if (selectedCards.length !== 2) {
    return;
  }

  if (selectedCards[0].src === selectedCards[1].src) {
    console.log("as cartas são iguais");
    selectedCards[0].classList.add("turn")
    selectedCards[1].classList.add("turn")

    selectedCards = [];
    return;
  }

  if (selectedCards[0].src !== selectedCards[1].src) {
    console.log("as cartas são diferentes");
    lives--;
    livesSpan.innerText = lives;
    //adicionar a classe hide para elas
    setTimeout(() => {
      selectedCards[0].classList.add("hide");
      selectedCards[1].classList.add("hide");

      selectedCards[0].nextElementSibling.classList.remove("hide");
      selectedCards[1].nextElementSibling.classList.remove("hide");

      selectedCards = [];
    }, 1200);
  }
}

function checkStatusGame() {
    //checando para saber se perdeu
  if (lives === 0) {
    loseScreen.classList.remove("hide");
    board.classList.add("hide");
  }

  //checando para saber se ganhou
  const cardsTurn = document.querySelectorAll(".turn")
  if (cardsTurn.length === deck.length) {
    winScreen.classList.remove("hide")
    setTimeout(() => {
        location.reload()
    },1000)
  }


}
