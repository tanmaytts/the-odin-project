function Gameboard() {
    this.board = ["", "", "", "", "", "", "", "", ""];
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

let gameboard = new Gameboard();

function game(place, symbol){
    gameboard.board[place-1] = symbol;
    updateBoard();
}

const player1 = new Player("", "X");
const player2 = new Player("", "O");

let chance = 0;
let gameOver = false;
let gameStarted = false;

const btn = document.getElementById("submit");
btn.addEventListener("click", () => {
    const name1 = document.getElementById("player1").value.trim();
    const name2 = document.getElementById("player2").value.trim();

    // don't start until both names are filled in
    if (name1 === "" || name2 === "") {
        document.getElementById("Start-text").style.display = "block";
        document.getElementById("Start-text").innerHTML = "Please enter both names!";
        return;
    }

    player1.name = name1;
    player2.name = name2;
    gameStarted = true;
    document.getElementById("player1").style.display = "none";
    document.getElementById("player2").style.display = "none";
    document.getElementById("submit").style.display = "none";

    document.getElementById("player1-name").innerHTML = player1.name;
    document.getElementById("player2-name").innerHTML = player2.name;
    document.getElementById("Start-text").style.display = "block";

    // start the game: it's player1's turn
    document.getElementById("Start-text").innerHTML = player1.name + "'s turn";
});

const table = document.getElementById("gameboard");
table.addEventListener("click", (event) => {
    if (!gameStarted || gameOver) return;

    const place = event.target.id;

    // ignore clicks that aren't on a square, or on a filled square
    if (place < 1 || place > 9 || gameboard.board[place - 1] !== "") return;

    const currentPlayer = (chance % 2 === 0) ? player1 : player2;
    game(place, currentPlayer.symbol);
    chance++;

    if (checkWin(currentPlayer.symbol)) {
        document.getElementById("Start-text").innerHTML = currentPlayer.name + " wins!";
        gameOver = true;
        return;
    }

    if (chance === 9) {
        document.getElementById("Start-text").innerHTML = "It's a draw!";
        gameOver = true;
        return;
    }

    const next = (chance % 2 === 0) ? player1 : player2;
    document.getElementById("Start-text").innerHTML = next.name + "'s turn";
});

function checkWin(symbol){
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return lines.some((line) =>
        line.every((i) => gameboard.board[i] === symbol)
    );
}

function updateBoard(){
    for (let i = 0; i < gameboard.board.length; i++){
        document.getElementById(i+1).innerHTML = gameboard.board[i];
    }
}
