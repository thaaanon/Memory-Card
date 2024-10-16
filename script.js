const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let cardValues = [];
let cardIds = [];
let matchedCards = [];
let moves = 0;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(cards).forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    const card = this;
    const cardId = card.getAttribute('data-id');

    if (cardIds.length < 2 && !matchedCards.includes(cardId)) {
        card.textContent = cards[cardId];
        card.classList.add('flipped');
        cardValues.push(cards[cardId]);
        cardIds.push(cardId);
        
        if (cardValues.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const cardsAll = document.querySelectorAll('.card');
    const [firstValue, secondValue] = cardValues;
    const [firstId, secondId] = cardIds;

    if (firstValue === secondValue) {
        matchedCards.push(firstId, secondId);
        document.getElementById('message').textContent = "It's a match!";
    } else {
        cardsAll[firstId].textContent = '';
        cardsAll[secondId].textContent = '';
        cardsAll[firstId].classList.remove('flipped');
        cardsAll[secondId].classList.remove('flipped');
        document.getElementById('message').textContent = "Try again!";
    }

    cardValues = [];
    cardIds = [];

    moves++;
    if (matchedCards.length === cards.length) {
        document.getElementById('message').textContent = `You won in ${moves} moves!`;
        document.getElementById('restart').style.display = 'block';
    }
}

document.getElementById('restart').addEventListener('click', () => {
    matchedCards = [];
    moves = 0;
    createBoard();
    document.getElementById('message').textContent = '';
    document.getElementById('restart').style.display = 'none';
});

// Start the game when the page loads
createBoard();
