// playerCard array to store player's points
let playerCard = [];
// dealerCard array to store dealer's points
let dealerCard = [];
// player
currentPlayer = "you";

// generate random number from 1 -13
let randomCard = () => {
  return Math.ceil(Math.random() * 13);
};
// select start button
let startBtn = document.querySelector("#start");
// select new game button
let newGameBtn = document.querySelector("#newGame");
// select hit button, disable hit button first
let hit = document.querySelector("#hit");
hit.disabled = true;
// select stand button, disable stand button first
let stand = document.querySelector("#stand");
stand.disabled = true;
// select playerCard figure container
let playerCardContainer = document.querySelector("#playerCard");
//  select dealerCard figure container
let dealerCardContainer = document.querySelector("#dealerCard");

// create a start function assign 2 card to player and dealer
// this function will get triggered once start button got clicked
// assign 2 cards for both the player and the dealer
function startGame() {
  hit.disabled = false;
  stand.disabled = false;
  let playerCard1 = document.createElement("img");
  let playerCard2 = document.createElement("img");
  let dealerCard1 = document.createElement("img");
  let dealerCard2 = document.createElement("img");

  // get player's first 2 cards and append them to playerCard container
  // push score inside playerCard
  let random1 = randomCard();
  let random2 = randomCard();
  playerCard1.src = `./css/cards/${random1}.png`;
  playerCard2.src = `./css/cards/${random2}.png`;
  playerCard1.alt = `${random1}`;
  playerCard2.alt = `${random1}`;
  // console.log(playerCard1.alt);
  playerCardContainer.appendChild(playerCard1);
  playerCardContainer.appendChild(playerCard2);

  playerScore(random1);
  playerScore(random2);
  // console.log(playerCard);
  // get dealer's first 2 cards and append them to dealerCard container
  // push score to dealerArr
  let random3 = randomCard();
  let random4 = randomCard();
  dealerCard1.src = `./css/cards/back.png`;
  dealerCardContainer.appendChild(dealerCard1);
  dealerCard1.alt = `${random3}`;
  dealerCard2.src = `./css/cards/${random4}.png`;
  dealerCardContainer.appendChild(dealerCard2);
  dealerCard2.alt = `${random4}`;
  dealerScore(random3);
  dealerScore(random4);
  // console.log(dealerCard);
}

// game logic for cards from 2-10 it has its face value, for cards jack, queen, king they value 10
// for card Ace it values 11 at begining
function playerScore(random) {
  if (random === 1) {
    playerCard.push(11);
  } else if (random > 10) {
    playerCard.push(10);
  } else {
    playerCard.push(random);
  }
}
function dealerScore(random) {
  if (random === 1) {
    dealerCard.push(11);
  } else if (random > 10) {
    dealerCard.push(10);
  } else {
    dealerCard.push(random);
  }
}

// when click hit button , player will be assigned another card

function handleHit() {
  if (currentPlayer === "you") {
    let newCard = randomCard();
    console.log(newCard);
    let playerCard3 = document.createElement("img");
    playerCard3.src = `./css/cards/${newCard}.png`;
    playerCard3.alt = `${newCard}`;
    playerCardContainer.appendChild(playerCard3);

    playerScore(newCard);
    console.log(playerCard);
    checkScore(playerCard);
  }
}

// check total score
function checkScore(scoreArr) {
  let totalScore = 0;
  let countAce = 0;
  scoreArr.forEach((score) => {
    totalScore += score;
    if (score === 11) {
      countAce++;
    }
  });
  if (totalScore === 21) {
    alert("you win !");
  } else if (totalScore > 21 && scoreArr.includes(11)) {
    totalScore - 10 > 21 ? alert("Bust") : null;
  } else if (totalScore > 21) {
    // you lose
    alert("Bust");
  }
}

// eventHandler for button hit
hit.addEventListener("click", () => {
  handleHit();
});
// when click start button, triger startGame both dealer and player will have 2 cards
startBtn.addEventListener("click", () => {
  startGame();
  startBtn.disabled = true;
});

// when click new game button will refresh the page
newGameBtn.addEventListener("click", () => {
  window.location.reload();
});
