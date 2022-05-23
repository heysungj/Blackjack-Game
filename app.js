// playerCard array to store player's points
let playerCard = [];
// dealerCard array to store dealer's points
let dealerCard = [];
// player
currentPlayer = "Player";
// set game over
let gameOver = false;
// total score is 0 at beginning
let playerScore = 0;
let dealerScore = 0;
// count ace
let countAce = 0;
// dealer image number
let dealerImgSrc = null;
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
// select h3 with id result
let result = document.querySelector("#result");
debugger;
// create 4 image elements
let playerCard1 = document.createElement("img");
let playerCard2 = document.createElement("img");
let dealerCard1 = document.createElement("img");
let dealerCard2 = document.createElement("img");
// create a start function assign 2 card to player and dealer
// this function will get triggered once start button got clicked
// assign 2 cards for both the player and the dealer

function startGame() {
  hit.disabled = false;
  stand.disabled = false;
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

  playerScorePush(random1);
  playerScorePush(random2);
  // console.log(playerCard);
  // get dealer's first 2 cards and append them to dealerCard container
  // push score to dealerArr
  let random3 = randomCard();
  let random4 = randomCard();
  dealerImgSrc = random3;
  dealerCard1.src = `./css/cards/back.png`;
  dealerCardContainer.appendChild(dealerCard1);
  dealerCard1.alt = `${random3}`;
  dealerCard2.src = `./css/cards/${random4}.png`;
  dealerCardContainer.appendChild(dealerCard2);
  dealerCard2.alt = `${random4}`;
  dealerScorePush(random3);
  dealerScorePush(random4);
  console.log(dealerCard);

  // check player's  score
  [playerScore, countAce] = checkScore(playerCard);
  [dealerScore, countAce] = checkScore(dealerCard);
  // console.log(playerScore);
  checkStatus(playerScore);
  if (playerScore === 21) {
    setTimeout(handleStand, 1000);
  }
}

// game logic for cards from 2-10 it has its face value, for cards jack, queen, king they value 10
// for card Ace it values 11 at begining
function playerScorePush(random) {
  if (random === 1) {
    playerCard.push(11);
  } else if (random > 10) {
    playerCard.push(10);
  } else {
    playerCard.push(random);
  }
}
function dealerScorePush(random) {
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
  if (currentPlayer === "Player") {
    let newCard = randomCard();
    // console.log(newCard);
    let playerCard3 = document.createElement("img");
    playerCard3.src = `./css/cards/${newCard}.png`;
    playerCard3.alt = `${newCard}`;
    playerCardContainer.appendChild(playerCard3);

    playerScorePush(newCard);
    // console.log(playerCard);
    [playerScore, countAce] = checkScore(playerCard);
    checkStatus(playerScore);
  }
}

// while click stand button, dealer's turn
// check dealer's score
// compare player and dealer'score at the end
function handleStand() {
  hit.disabled = true;
  currentPlayer = "Dealer";

  checkStatus(dealerScore);

  while (dealerScore < 17) {
    let random = randomCard();
    let dealerCardExtra = document.createElement("img");
    dealerCardExtra.src = `./css/cards/${random}.png`;
    dealerCardExtra.alt = `${random}`;
    dealerCardContainer.appendChild(dealerCardExtra);
    dealerScorePush(random);
    console.log(dealerCard);
    [dealerScore, countAce] = checkScore(dealerCard);
  }

  dealerCard1.src = `./css/cards/${dealerImgSrc}.png`;
  checkStatus(dealerScore);
  if (gameOver === false) {
    compare(playerScore, dealerScore);
  }
}

// check total score
function checkScore(scoreArr) {
  let currentScore = 0;
  let ace = 0;
  scoreArr.forEach((score) => {
    currentScore += score;
    if (score === 11) {
      ace++;
    }
  });
  while (currentScore > 21 && ace > 0) {
    currentScore -= 10;
    ace--;
  }
  return [currentScore, ace];
}

// check game status base on score
function checkStatus(totalScore) {
  if (totalScore === 21) {
    result.innerText = `${currentPlayer} has Blackjack!!`;
    hit.disabled = true;
    stand.disabled = true;
    // gameOver = true;
  }
  if (totalScore > 21) {
    result.innerText = `${currentPlayer} Bust!!!`;
    hit.disabled = true;
    stand.disabled = true;
    gameOver = true;
  } else return totalScore;
}

// compare player's and dealer's score
function compare(playerScore, dealerScore) {
  if (playerScore === dealerScore) {
    result.innerText = `Player score: ${playerScore} , Dealer score: ${dealerScore}, Tie Game!`;
  } else if (playerScore > dealerScore) {
    result.innerText = `Player score: ${playerScore} , Dealer score: ${dealerScore}, Player Wins!`;
  } else {
    result.innerText = `Player score: ${playerScore} , Dealer score: ${dealerScore}, Dealer Wins!`;
  }
}

// eventHandler for button hit
hit.addEventListener("click", () => {
  handleHit();
});
// eventHandler for stand button
stand.addEventListener("click", () => {
  handleStand();
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
