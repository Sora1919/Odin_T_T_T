
    // Game state variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = {
    X: 0,
    O: 0,
    draw: 0
};

    // Winning combinations
    const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // DOM elements
    const gameBoardElement = document.getElementById('game-board');
    const currentPlayerElement = document.getElementById('current-player');
    const messageElement = document.getElementById('message');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const scoreDrawElement = document.getElementById('score-draw');
    const restartButton = document.getElementById('restart');
    const resetScoresButton = document.getElementById('resetScores');

    // Initialize the game board
    function initializeBoard() {
    gameBoardElement.innerHTML = '';

    for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', () => handleCellClick(i));
    gameBoardElement.appendChild(cell);
}

    updateCurrentPlayerDisplay();
    clearMessage();
}

    // Handle cell click
    function handleCellClick(index) {
    // Check if cell is empty and game is active
    if (gameBoard[index] !== '' || !gameActive) {
    return;
}

    // Update game board
    gameBoard[index] = currentPlayer;

    // Update UI
    const cellElement = document.querySelector(`.cell[data-index="${index}"]`);
    cellElement.textContent = currentPlayer;
    cellElement.classList.add(currentPlayer.toLowerCase());

    // Check for win or draw
    if (checkWin()) {
    endGame(false);
    return;
}

    if (checkDraw()) {
    endGame(true);
    return;
}

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
}

    // Check for win
    function checkWin() {
    for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
    gameBoard[a] !== '' &&
    gameBoard[a] === gameBoard[b] &&
    gameBoard[a] === gameBoard[c]
    ) {
    // Highlight winning cells
    pattern.forEach(index => {
    document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
});

    return true;
}
}

    return false;
}

    // Check for draw
    function checkDraw() {
    return !gameBoard.includes('');
}

    // End the game
    function endGame(isDraw) {
    gameActive = false;

    if (isDraw) {
    showMessage("It's a draw!", 'draw');
    scores.draw++;
    updateScores();
} else {
    showMessage(`Player ${currentPlayer} wins!`, 'win');
    scores[currentPlayer]++;
    updateScores();
}
}

    // Update current player display
    function updateCurrentPlayerDisplay() {
    currentPlayerElement.textContent = currentPlayer;
    currentPlayerElement.className = currentPlayer === 'X' ? 'player-x' : 'player-o';
}

    // Show message
    function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message show ${type}`;
}

    // Clear message
    function clearMessage() {
    messageElement.textContent = '';
    messageElement.className = 'message';
}

    // Update score display
    function updateScores() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
    scoreDrawElement.textContent = scores.draw;
}

    // Restart game (keep scores)
    function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    // Clear cells
    document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
});

    updateCurrentPlayerDisplay();
    clearMessage();
}

    // Reset scores and game
    function resetScores() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScores();
    restartGame();
}

    // Event listeners
    restartButton.addEventListener('click', restartGame);
    resetScoresButton.addEventListener('click', resetScores);

    // Initialize the game
    initializeBoard();
    updateScores();
