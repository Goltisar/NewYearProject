const cards = document.querySelectorAll('.memory-card');

let firstOpenedCard, secondOpenedCard;
let isDisabledBoard = false;
let movesCount = 0;

function flipCard() {
  if (isDisabledBoard || this === firstOpenedCard || this.classList.contains('disabled')) return;

  this.classList.add('flip');

  if(firstOpenedCard == null) {
    firstOpenedCard = this;
  } else {
    secondOpenedCard = this;
    isDisabledBoard = true;
    movesCount++;
  
    if(checkMatch()) {
      disableCards()
    } else {
      unflipCards()
    }

    if(checkWin()) {
      document.body.dispatchEvent(new CustomEvent('finish', { 'detail': `Победа! \n Количество ходов: ${movesCount}`}));
    }
  }
}

function checkMatch() {
  return firstOpenedCard.dataset.framework === secondOpenedCard.dataset.framework;
}

function checkWin() {
  for(card of cards) {
    if(!card.classList.contains('disabled')) { return false; }
  }
  return true;
}

function disableCards() {
  firstOpenedCard.classList.add('disabled');
  secondOpenedCard.classList.add('disabled');
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstOpenedCard.classList.remove('flip');
    secondOpenedCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  isDisabledBoard = false;
  firstOpenedCard = null;
  secondOpenedCard = null;
}

function restart() {
  for(card of cards) {
    if(card.classList.contains('flip')) {
      card.classList.remove('flip');
      card.classList.remove('disabled');
    }
  }
  movesCount = 0;
  resetBoard();
  setTimeout(shuffleCards, 500);
}

function shuffleCards() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 12);
  });
};


shuffleCards();
cards.forEach(card => card.addEventListener('click', flipCard));
