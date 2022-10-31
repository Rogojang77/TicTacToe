let remainingMoves = true;
let currentPlayer = 'X';
let statusDisplay = document.querySelector('.playerStatus');
let cellInner = ["", "", "", "", "", "", "", "", ""];

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

function createrGrid() {
    let grid = document.getElementById("grid");
    for (let i = 0; i < 9; ++i) {  
        let cell = document.createElement("div");
        grid.appendChild(cell).className = "cell";
    }
}

window.onload = function() {
    createrGrid();
    statusDisplay.innerHTML = currentPlayerTurn();
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; ++i) {
        let cell = cells[i];
        cell.onclick = () => {
            if (cellInner[i] == '' && remainingMoves) {
                cellInner[i] = currentPlayer;
                cell.innerHTML = currentPlayer;
                handleResultValidation();
            }
        }
    }
}

function playerStatus() {
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        let winCondition = winningCells[i];
        let firstCell = cellInner[winCondition[0]];
        let secondCell = cellInner[winCondition[1]];
        let thirdCell = cellInner[winCondition[2]];
        if (firstCell === '' || secondCell === '' || thirdCell === '') {
            continue;
        } else if (firstCell === secondCell && secondCell === thirdCell) {
            roundWon = true;
            remainingMoves = false;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        return;
    }

    if (!cellInner.includes("")) {
        statusDisplay.innerHTML = drawMessage();
        return;
    }
    playerStatus();
}