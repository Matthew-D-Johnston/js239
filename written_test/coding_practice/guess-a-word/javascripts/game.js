"use strict";

// function randomWord() {
//   let randomIndex = Math.floor(Math.random() * words.length);
//   return words.splice(randomIndex, 1).pop();
// }

// let randomWord = (function() {
//   let words = ['abacus', 'stipend', 'octothorpe', 'proselytize', 'quotient'];

//   return function() {
//     let word = words[Math.floor(Math.random() * words.length)];
//     words.splice(words.indexOf(word), 1);
//     return word;
//   }
// })();

// let Game = function() {
//   this.word = randomWord();
//   this.incorrectGuesses = 0;
//   this.lettersGuessed = [];
//   this.totalAllowedGuesses = 6;
// }

// Game.prototype.displayWordBlanks = function() {
//   let spacesDiv = document.getElementById('spaces');

//   for (let index = 1; index <= this.word.length; index += 1) {
//     let span = document.createElement('span');
//     spacesDiv.appendChild(span);
//   }
// }

// document.addEventListener('DOMContentLoaded', function() {
//   let game = new Game();
//   game.displayWordBlanks();
// });

document.addEventListener('DOMContentLoaded', event => {
  const message = document.querySelector('#message');
  const letters = document.querySelector('#spaces');
  const guesses = document.querySelector('#guesses');
  const apples = document.querySelector('#apples');
  const replay = document.querySelector('#replay');

  let randomWord = (function() {
    let words = ['abacus', 'stipend', 'octothorpe', 'proselytize', 'quotient'];
  
    return function() {
      let word = words[Math.floor(Math.random() * words.length)];
      words.splice(words.indexOf(word), 1);
      return word;
    }
  })();

  function Game() {
    this.incorrect = 0;
    this.lettersGuess = [];
    this.correctSpaces = 0;
    this.word = randomWord();
    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
      return this;
    }
    this.word = this.word.split("");
    this.init();
  }

  Game.prototype = {
    createBlanks: function() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");

      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    },
    displayMessage: function(text) {
      message.innerHTML = text;
    },
    init: function() {
      this.createBlanks();
      message.innerHTML = '';
      guesses.innerHTML = '<h2>Guesses:</h2>';
      replay.style.visibility = 'hidden';
      apples.removeAttribute('class');
      this.boundGuess = this.guess.bind(this);
      this.gameFinished = this.gameOver.bind(this);
      document.addEventListener('keyup', this.boundGuess);
      document.addEventListener('keyup', this.gameFinished);
    },
    validLetter: function(char) {
      return char.charCodeAt() >= 97 && char.charCodeAt() <= 122;
    },
    addLetterToGuessedLettersArray: function(letter) {
      if (!this.lettersGuess.includes(letter)) {
        this.lettersGuess.push(letter);
      }
    },
    wordHasMatchingLetter: function(letter) {
      return this.word.includes(letter);
    },
    insertLetterInWordSpaces: function(letter) {
      let spaces = letters.querySelectorAll('span');

      for (let index = 0; index < this.word.length; index += 1) {
        if (this.word[index] === letter) {
          spaces[index].innerHTML = letter.toUpperCase();
          this.correctSpaces += 1;
        }
      }
    },
    wordComplete: function() {
      return this.correctSpaces === this.word.length;
    },
    outOfGuesses: function() {
      return this.incorrect === 6;
    },
    guess: function(event) {
      let letter = event.key;
      if (this.validLetter(letter)) { 
        // if (this.wordHasMatchingLetter(letter)) {
        //   if (!this.lettersGuess.includes(letter)) {
        //     this.insertLetterInWordSpaces(letter);
        //   }
        // } else if (!this.lettersGuess.includes(letter)) {
        //   apples.classList.remove(`guess_${this.incorrect}`);
        //   this.incorrect += 1;
        //   apples.classList.add(`guess_${this.incorrect}`);          
        // }

        if (!this.lettersGuess.includes(letter)) {
          let span = document.createElement('span');
          span.innerHTML = letter.toUpperCase();
          guesses.appendChild(span);

          if (this.wordHasMatchingLetter(letter)) {
            this.insertLetterInWordSpaces(letter);
          } else {
            apples.classList.remove(`guess_${this.incorrect}`);
            this.incorrect += 1;
            apples.classList.add(`guess_${this.incorrect}`);
          }
        }

        this.addLetterToGuessedLettersArray(letter);

        if (this.wordComplete()) {
          this.displayMessage('You win!');
          replay.style.visibility = 'visible';
          document.body.classList.add('win');
          document.removeEventListener('keyup', this.boundGuess);
        }
      }
    },
    gameOver: function(event) {
      if (this.outOfGuesses()) {
        this.displayMessage("Sorry! You're out of guesses");
        replay.style.visibility = 'visible';
        document.body.classList.add('lose');
        document.removeEventListener('keyup', this.boundGuess);
        document.removeEventListener('keyup', this.gameFinished);
      }
    }
  };

  new Game();
  replay.addEventListener('click', event => {
    event.preventDefault();
    document.body.removeAttribute('class');
    replay.style.visibility = 'hidden';
    new Game();
  });
});
