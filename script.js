'use strict';

// Selecting Elements
const score0 = document.querySelector('#score--0');

const score1 = document.querySelector('#score--1');

const dice = document.querySelector('.dice');

const newGame = document.querySelector('.btn--new');

const rollDice = document.querySelector('.btn--roll');

const hold = document.querySelector('.btn--hold');
const playerSection = document.querySelector('.player');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const currentScoreEl0 = document.querySelector('#current--0');
const currentScoreEl1 = document.querySelector('#current--1');

// Reset Score and hide dice in the beginning
score0.textContent = 0;

score1.textContent = 0;

dice.classList.add('hidden');

let currentScore, activePlayer, scores, playing;

const rest = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  score0.textContent = 0;

  score1.textContent = 0;

  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
};

rest();

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');

  player1.classList.toggle('player--active');
};

// Add EventListener to Generate roll dice
rollDice.addEventListener('click', () => {
  if (playing) {
    // generate a random dice
    let roll = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${roll}.png`;

    // check for num 1

    if (roll !== 1) {
      // if num is not 1, current score of the active player will update by dice roll num
      currentScore += roll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if num is 1, loss the current score and switch player
      switchPlayer();
    }
  }
});

hold.addEventListener('click', () => {
  if (playing) {
    // store the current score into score
    scores[activePlayer] += currentScore;

    // display score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // player who first reach to score 100 wins the game

    if (scores[activePlayer] >= 20) {
      //finish the game
      playing = false;

      dice.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Wins`;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', rest);
