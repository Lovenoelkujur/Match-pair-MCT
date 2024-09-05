const attemptsDisplay = document.getElementById("attempts");
const grid = document.getElementById("grid");
const restartBtn = document.getElementById("btn");


// Card Inner-Text
const cardsArray = ['😘', '😘', '😎', '😎', '♥️', '♥️', '🔔', '🔔', '🔐', '🔐', '📚', '📚', '🎁', '🎁', '🧸', '🧸', '💣', '💣', '💰', '💰'];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let attempts = 0;

// Shuffle
const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
};


// Create Card
const createCard = () => {
    grid.innerHTML = "";
    shuffle(cardsArray)             // Shuffle Card
    cardsArray.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card")
        card.dataset.value = item;
        card.innerText = "";
        card.addEventListener("click", revealCard);
        grid.appendChild(card);
    });
};

// Reveal Card
function revealCard(){
    if(lockBoard || this === firstCard) return;
    this.innerText = this.dataset.value;
    this.classList.add("revealed");

    if(!firstCard){
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();            // Check Match
};

// Check for Match
const checkForMatch = () => {
    if(firstCard.dataset.value === secondCard.dataset.value){
        disableCards();
    }
    else{
        unflipCards();
    }

    attempts++;
    attemptsDisplay.innerText = attempts;
};

// Disable Cards
const disableCards = () => {
    firstCard.removeEventListener("click", revealCard);
    secondCard.removeEventListener("click", revealCard);
    matchedPairs++;

    if(matchedPairs === cardsArray.length / 2){
        setTimeout(() => {
            alert(`Congratulations ! You have found all the pairs in ${attempts} attempts.`);
        }, 500);
    }
    resetBoard();
};

// Unflip Cards
const unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.innerHTML = "";
        secondCard.innerHTML = "";
        firstCard.classList.remove("revealed");
        secondCard.classList.remove("revealed");
        resetBoard();
    }, 1000);
};

// Board Reset
const resetBoard = () => {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart Game
const restartGame = () => {
    matchedPairs = 0;
    attempts = 0;
    attemptsDisplay.innerText = attempts;
    resetBoard();
    createCard();
};

createCard();

restartBtn.addEventListener("click", restartGame);