const cards = document.querySelectorAll(".memory-card");


let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");
    if(!cardIsFlipped) {
        cardIsFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatched = firstCard.dataset.name === secondCard.dataset.name;
    isMatched ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000)
}

function resetBoard() {
    [cardIsFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// IFE = Invoked Function Expression
(function shuffle() {
    cards.forEach(function(card) {
        let randomize = Math.floor(Math.random() * 12);
        card.style.order = randomize;
    })
})();

cards.forEach(function(card) {
    card.addEventListener("click", flipCard);
});