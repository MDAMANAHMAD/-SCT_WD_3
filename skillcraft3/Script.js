const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let gameMode = 'player'; // 'player' for two-player mode, 'computer' for playing against computer

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
    statusDisplay.innerHTML = `Player X's turn`;
}

function handleClick(clickedCellIndex) {
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    cells[clickedCellIndex].innerHTML = currentPlayer;

    checkWinner();

    if (gameActive && gameMode === 'computer' && currentPlayer === 'O') {
        computerMove();
    }
}

function computerMove() {
    let emptyCells = gameState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleClick(randomIndex);
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = `Game ended in a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerHTML = "");
    statusDisplay.innerHTML = `Player X's turn`;
}
