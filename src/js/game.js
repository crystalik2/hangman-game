import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;
let winCount;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");
  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, index) =>
      acc + `<h2 id="letter_${index}" class="letter">_</h2>`,
    ""
  );
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = KEYBOARD_LETTERS.reduce(
    (acc, curr) =>
      acc +
      `<button class="button-primary keyboard-button" id="button_${curr}">${curr}</button>`,
    ""
  );

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-img");
  image.id = "hangman-img";

  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries_left");
    triesLeft--;

    triesCounter.innerText = triesLeft;
    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount++;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;
  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();
  gameDiv.innerHTML +=
    "<p id='tries_field' class='mt-2'>TRIES LEFT: <span id='tries_left' class = 'font-medium text-red-400'>10</span></p>";

  const keyboardDiv = createKeyboard();
  const clickLetter = keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;

      checkLetter(event.target.id.at(-1)); // because btn id is "button_A", so we send only alphabet letter
    }
  });

  console.log(wordToGuess);

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    "<button id='quit-btn' class='button-secondary px-2 py-1 mt-4'>Quit</button>"
  );
  document.getElementById("quit-btn").onclick = () => {
    const isSure = confirm("Are you sure you want to quit?");
    if (isSure){
      stopGame("quit");
    }
    
  };
};

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries_field").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit-btn").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-img").src = "images/hg-win.png";
    document.getElementById("game").innerHTML +=
      "<h2 class='result-header win'>You Win :)</h2>";
  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      "<h2 class='result-header lose'>You Lose :(</h2>";
  } else if (status === "quit") {
    logoH1.classList.remove("logo-sm");
    document.getElementById("hangman-img").remove();
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>The word was: <span class='result-word'>${word}</span></p><button id='play-again-btn' class="button-primary px-5 py-2 mt-5">Start new game</button>`;

  document.getElementById("play-again-btn").onclick = startGame;
};