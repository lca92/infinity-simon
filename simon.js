let sequence = [];
let humanSequence = [];
let level = 0;
let timer;
const counter = document.querySelector("#counter");
const startButton = document.querySelector("#start");
const tileContainer = document.querySelector("#colorsGrid");

// To start the game
function startGame() {
  startButton.classList.add("unclickable");
  nextRound();
}

// Next round
function nextRound() {
  level++;
  tileContainer.classList.add("unclickable");
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);
  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

// Random color
function nextStep() {
  const tiles = ["green", "red", "yellow", "blue"];
  const random = tiles[Math.floor(Math.random() * tiles.length)];
  return random;
}

// Determine the duration of the sequence
function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

// Flash light for the respective colors in the sequence
function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  tile.classList.add("activated");
  sound.play();
  setTimeout(() => {
    tile.classList.remove("activated");
  }, 300);
}

// Player turn
function humanTurn(level) {
  tileContainer.classList.remove("unclickable");
  counter.textContent = `${level}`;
  timer = setTimeout(() => {
    resetGame(`Oh, my poor child, you must go faster than this...`);
  }, 5000);
}

// Determines if player was correct
function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();
  if (humanSequence[index] !== sequence[index]) {
    resetGame("GAME OVER");
    clearInterval(timer);
    return;
  }
  if (humanSequence.length === sequence.length) {
    clearInterval(timer);
    humanSequence = [];
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
}

// Reset game
function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove("unclickable");
  tileContainer.classList.add("unclickable");
}

startButton.addEventListener("click", startGame);
tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;
  if (tile) handleClick(tile);
});
