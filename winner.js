document.addEventListener('DOMContentLoaded', () => {
    const winnerMessage = document.getElementById('winner-message');
    const winnerSvgContainer = document.getElementById('winner-svg-container');

    const urlParams = new URLSearchParams(window.location.search);
    const winner = urlParams.get('player');

    if (winner && (winner === 'X' || winner === 'O')) {
        winnerMessage.textContent = `Player ${winner} is the winner!`;

        const img = document.createElement('img');
        img.src = `assets/icons/${winner.toLowerCase()}.svg`;
        img.alt = `Player ${winner}'s icon`;
        img.classList.add('w-32', 'h-32');

        winnerSvgContainer.appendChild(img);
    } else {
        winnerMessage.textContent = 'No winner specified.';
    }
});
