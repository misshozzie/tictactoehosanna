/*----- constants -----*/

/*----- variables -----*/
let player1 = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameIsLive = true;

/*----- cached elements -----*/
const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

/*----- event listners -----*/
resetButton.addEventListener("click", () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameIsLive = true;
  player1 = "X";
  Array.from(board.children).forEach((cell) => {
    cell.textContent = "";
    cell.style.pointerEvents = "auto";
  });
  message.textContent = "";
});

/*----- functions -----*/
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameBoard[index] === "" && gameIsLive) {
    gameBoard[index] = player1;
    cell.textContent = player1;
    cell.style.pointerEvents = "none";
    checkWins();
    player1 = player1 === "X" ? "O" : "X";
  }
}

function disableClick() {
  Array.from(board.children).forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function checkWins() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winCombos) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      message.textContent = `${player1} wins!`;
      gameIsLive = false;
      disableClick();
      return;
    }
  }

  if (!gameBoard.includes("") && gameIsLive) {
    message.textContent = "No one wins!";
    gameIsLive = false;
    disableClick();
  }
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

createBoard();
