'use strict';

const playerA = document.querySelector('.player--0');
const playerB = document.querySelector('.player--1');

const playerScoreAEl = document.querySelector('#score--0');
const playerScoreBEl = document.getElementById('score--1');
const currentScoreAEl = document.getElementById('current--0');
const currentScoreBEl = document.getElementById('current--1');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const diceEl2 = document.getElementById('dice2');
const howTo = document.querySelector('.btn--how');
const howToModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

// starting conditions
playerScoreAEl.textContent = 0;
playerScoreBEl.textContent = 0;
currentScoreAEl.textContent = 0;
currentScoreBEl.textContent = 0;

let totalScores = [0, 0]; //final scores
let currentScore = 0;
let activePlayer = 0;

let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  playerA.classList.toggle('player--active');
  playerB.classList.toggle('player--active');
};
const resetGame = function () {
  // resets all values to 0 and set player 1 to start
  playerScoreAEl.textContent = 0;
  playerScoreBEl.textContent = 0;
  currentScoreAEl.textContent = 0;
  currentScoreBEl.textContent = 0;

  diceEl.classList.remove('hidden');
  diceEl2.classList.remove('hidden');
  diceEl.src = `dice-6.png`;
  diceEl2.src = `dice-6.png`;

  totalScores = [0, 0];
  activePlayer = 0;

  playerA.classList.remove('player--winner');
  playerB.classList.remove('player--winner');

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  playerA.classList.add('player--active');
};

newBtn.addEventListener('click', function () {
  playing = true;
  resetGame();
});

rollBtn.addEventListener('click', function () {
  if (playing) {
    // generate 2 random numbers
    const dice1 = Math.trunc(Math.random() * 6 + 1);
    const dice2 = Math.trunc(Math.random() * 6 + 1);

    // display the dice
    diceEl.src = `dice-${dice1}.png`;
    diceEl2.src = `dice-${dice2}.png`;

    // check if two rolled dice are the same
    if (dice1 !== dice2) {
      // add dice to current scores
      currentScore += dice1 + dice2;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  } else {
    alert(`Player${activePlayer + 1} has WON, click NEW GAME`);
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // add currentScore to player totalScores

    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // check  if player score is >= 100;
    if (totalScores[activePlayer] > 100) {
      playing = false;
      diceEl.classList.add('hidden');
      diceEl2.classList.add('hidden');
      console.log(`Player${activePlayer + 1} has won`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // else if (totalScores[activePlayer] > 7) {
    //   console.log('burst');
    //   resetGame();
    // }
    else {
      // switch to next player
      switchPlayer();
    }
  } else {
    alert(`Player${activePlayer + 1} has WON, click NEW GAME`);
  }
});

// modal
howTo.addEventListener('click', function () {
  howToModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

closeModal.addEventListener('click', function () {
  howToModal.classList.add('hidden');
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', function () {
  howToModal.classList.add('hidden');
  overlay.classList.add('hidden');
});

// const keyPressed = function (e) {
//   console.log(e.key);
// };

// document.addEventListener('keyup', keyPressed);

// if (e.key == 'x' && !howToModal.classList.contains('hidden')) {
//   howToModal.classList.add('hidden');
//   overlay.classList.add('hidden');
// }
