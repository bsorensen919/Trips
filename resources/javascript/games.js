// Todo - 
// Add WIN and LOSE functionality - so that when the player busts, the game is over. 
// Would also like a better way to deal with the dealer's cards. I used the alert just so that it could be seen
// I want to add the ability to play with multiple decks

// DOM Variables
// Action buttons
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let doneButton = document.getElementById("done-button");
let newHandButton = document.getElementById("new-hand-button")

hitButton.style.display = "none";
stayButton.style.display = "none";
doneButton.style.display = "none";
newHandButton.style.display = "none";

// Output and Results
let textArea = document.getElementById("text-area");
let playerHandText = document.getElementById("player-hand");
let dealerHandText = document.getElementById("dealer-hand");
let playerScoreText = document.getElementById("player-score");
let dealerHandScore = document.getElementById("dealer-score");

let resultsAreas = document.getElementById("results-area");

resultsAreas.style.display = "none";

// deck and player's hands
let g_deck = [];
let g_playerCards = [];
let g_dealerCards = [];

let g_gameStarted = false;
let g_handDone = false;
let g_playerWon = false;


// Suits and card names
let g_suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
let g_cardNames = ['Ace', 'Two', 'Three', 'Four', 
                'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                'Ten', 'Jack', 'Queen', 'King'];


function createDeck() {
    // Make sure the deck is empty before filling it up
    g_deck = [];

    for (i = 0; i < g_suits.length; i++) {
      // Setup the names and values for the cards
      for (let cardCounter = 0; cardCounter < g_cardNames.length; cardCounter++) {
        card = {name: (g_cardNames[cardCounter] + " of " + g_suits[i]), 
                value: cardCounter + 1, 
                ace: cardCounter == 1 ? true : false};
        g_deck.push(card);
      }
    }
    console.log(g_deck);
}
  
function pickCard() {
  return Math.floor(Math.random() * g_deck.length);
}

function dealHands() {
    // Pick two random cards
    let card1 = pickCard();
    let card2 = pickCard();
      
    // Deal two cards for the player
    g_playerCards.push(g_deck[card1]);
    g_playerCards.push(g_deck[card2]);
    g_deck.splice(card1, 1);
    g_deck.splice(card2, 1);

    // Deal two cards for the dealer
    card1 = pickCard();
    card2 = pickCard();
    g_dealerCards.push(g_deck[card1]);
    g_dealerCards.push(g_deck[card2]);
    g_deck.splice(card1, 1);
    g_deck.splice(card2, 1);
}

function scoreHand(hand) {
  
  let score = 0;
  let hasAce = false;

  for (let index = 0; index < hand.length; index++) {
    // Anything with a value over 10, will only count as a 10
    if (hand[index].value > 10) {
      score = score + 10;
    }
    else {
      score = score + hand[index].value
    }
    if (hand[index].ace == true) {
      hasAce = true;
    }
  }

  // If there's an ace, then see if we should count it as 10 or 1. 
  if (hasAce && score + 10 <= 21) {
      score = score + 10;
  }
  return score;
}

function displayPlayerResults() {
  
  let resultString = 'You are dealt: \n';
  for (let i = 0; i < g_playerCards.length; i++) {
    resultString = resultString + g_playerCards[i].name + '\n';
  }

  playerHandText.innerText = resultString;
  let score = scoreHand(g_playerCards);
  playerScoreText.innerText = "(score " + score + ")";

}

function displayDealerResults() {
  
  let resultString = 'The dealer has: \n';
  let cardsToShow = g_handDone ? g_dealerCards.length : 1;

  for (let i = 0; i < cardsToShow; i++) {
    resultString = resultString + g_dealerCards[i].name + '\n';
  }

  dealerHandText.innerText = resultString;
  if (g_handDone) {
    let score = scoreHand(g_dealerCards);
    dealerHandScore.innerText = "(score: " + score + ")";
  }
  else {
    dealerHandScore.innerText = "(score: ?)"
  }
}

function showStatus() {
  if (!g_gameStarted) {
    textArea.innerText = "Welcome to Blackjack!";
  }
  else {
    textArea.innerText = "Game in progress...";
    displayPlayerResults();
    displayDealerResults();
  }
}

// Event handlers
newGameButton.addEventListener('click', function() {
  
  g_gameStarted = true;

  newGameButton.style.display = "none"
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";

  resultsAreas.style.display = "block";
  
  // Update the global deck so that it has 52 cards again
  createDeck();
  
  // Do some minimal error checking, if something went wrong don't continue with the game
  if (g_deck.length != 52) {
    console.log("Opps!!!! - Error Length = " + g_deck.length);

  } else {
    dealHands();

    // Let the player know what's going on
    showStatus();
  }
});

hitButton.addEventListener('click', function() {
  
  let newCard = pickCard();

  console.log("your new card: " + newCard);
  console.log(g_deck[newCard]);

  g_playerCards.push(g_deck[newCard]);
  g_deck.splice(newCard, 1);

  showStatus();
});
  
stayButton.addEventListener('click', function() {
  // Now it's the dealer's turn to get new cards.
  
  g_handDone = true;
  showStatus();

  let score = scoreHand(g_dealerCards)
  while (score < 15) {
    let newCard = pickCard();
    g_dealerCards.push(g_deck[newCard]);
    g_deck.splice(newCard, 1);

    score = scoreHand(g_dealerCards);

    alert("The dealer has to take another card");
    showStatus();
  }

  doneButton.style.display = "inline";
  newHandButton.style.display = "inline";

  hitButton.style.display = "none";
  stayButton.style.display = "none";
});

doneButton.addEventListener('click', function() {
  g_deck = [];
  g_playerCards = [];
  g_dealerCards = [];

  g_gameStarted = false;
  g_handDone = false;
  g_playerWon = false;

  resultsAreas.style.display = "none";
  doneButton.style.display = "none";
  newHandButton.style.display = "none";

  newGameButton.style.display = "block";
  showStatus();
  
});

newHandButton.addEventListener('click', function() {
    if (g_deck.length < 10) {
      alert("Sorry, not enough cards left. Click done to start again");
    }
    else {
        g_playerCards = [];
        g_dealerCards = [];
        dealHands();
        showStatus();

        doneButton.style.display = "none";
        newHandButton.style.display = "none";

        hitButton.style.display = "inline";
        stayButton.style.display = "inline";
    }  
    g_handDone = false;
    
});