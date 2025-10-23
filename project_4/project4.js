let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrhi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        const input = userInput.value.trim();

        // Validate input as fully numeric
        if (!/^\d+$/.test(input)) {
            alert('Please enter a valid number between 1 and 100');
            userInput.value = '';
            return;
        }

        const guess = Number(input);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (guess < 1) {
        alert('Please enter a number greater than or equal to 1');
    } else if (guess > 100) {
        alert('Please enter a number less than or equal to 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endgame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right!`);
        endgame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is too low`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is too high`);
    }
}

const maxGuesses = 10; 

function displayGuess(guess){
  userInput.value = '';
  guessSlot.innerHTML += ` ${guess}`;
  remaining.innerHTML = `${maxGuesses - numGuess}`; 
  numGuess++;
}

function displayMessage(message) {
    lowOrhi.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newgame();
}

function newgame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
