const gameGrid = document.getElementById("gameGrid");
const resetButton = document.getElementById("resetButton");
let flippedCards = [];
let matchedPairs = 0;
let cards = [];
let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

cardValues = [...cardValues, ...cardValues]; // Duplicate the values to form pairs

// Shuffle the card values
cardValues.sort(() => Math.random() - 0.5);

// Create cards on the grid
function createCards() {
    gameGrid.innerHTML = '';
    cards = [];
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.setAttribute('data-id', index);
        card.addEventListener('click', handleCardClick);
        gameGrid.appendChild(card);
        cards.push(card);
    });
}

// Handle card flip and matching logic
function handleCardClick(event) {
    const clickedCard = event.target;

    // If the card is already flipped or the game is over, return early
    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    // Flip the card
    clickedCard.textContent = clickedCard.getAttribute('data-value');
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    // Check for a match
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        matchedPairs++;
        // Check if all pairs are matched
        if (matchedPairs === cardValues.length / 2) {
            alert('You win!');
        }
    } else {
        // Flip the cards back over if they don’t match
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}

// Reset the game
function resetGame() {
    matchedPairs = 0;
    flippedCards = [];
    cardValues.sort(() => Math.random() - 0.5); // Shuffle again
    createCards();
}

// Add event listener to the reset button
resetButton.addEventListener('click', resetGame);

// Initialize the game
createCards();
