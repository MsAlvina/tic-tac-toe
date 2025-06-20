document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('but');
    const printMessage = document.getElementById('print');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.id.replace('b', '')) - 1;

        if (boardState[cellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(cell, cellIndex);
        checkForWinner();
    };

    const updateCell = (cell, index) => {
        boardState[index] = currentPlayer;
        const img = document.createElement('img');
        img.src = `assets/icons/${currentPlayer.toLowerCase()}.svg`;
        img.classList.add('w-16', 'h-16', 'md:w-24', 'md:h-24');
        cell.appendChild(img);
        cell.classList.remove('cursor-pointer', 'hover:bg-gray-300');
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        printMessage.innerHTML = `Player ${currentPlayer} Turn`;
    };

    const checkForWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            const winCondition = winningCombinations[i];
            const a = boardState[winCondition[0]];
            const b = boardState[winCondition[1]];
            const c = boardState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winner = currentPlayer === 'X' ? 'O' : 'X';
            gameActive = false;
            window.location.href = `winner.html?player=${winner}`;
            return;
        }

        if (!boardState.includes('')) {
            printMessage.innerHTML = 'Match Tie';
            gameActive = false;
            return;
        }
    };

    const resetGame = () => {
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        printMessage.innerHTML = 'Player X Turn';

        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.add('cursor-pointer', 'hover:bg-gray-300');
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
}); 
