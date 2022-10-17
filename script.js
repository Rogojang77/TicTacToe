let move = 1;
let remainingMoves = true;
let currentPlayer = 'X';
let statusDisplay = document.querySelector('.playerStatus');
let gameState = ["", "", "", "", "", "", "", "", ""];


let grid = document.getElementById("grid");
for (let i = 0; i < 9; ++i) {  
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "cell";
}

let cells = document.querySelectorAll('.cell');


const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

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

function statusPlayerChange() {
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

for (let i = 0; i < cells.length; ++i) {
    let cell = cells[i];
    cell.onclick = function xOr0() {
        if(gameState[i] == '' && remainingMoves){
            if(move % 2 == 1){
                currentPlayer = 'X';
            } else {
                currentPlayer = '0';
            }
            gameState[i] = currentPlayer;
            cell.innerHTML = currentPlayer; 
            move++;
            handleResultValidation();
        }     
    }
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            remainingMoves = false;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        return;
    }
    statusPlayerChange();
}