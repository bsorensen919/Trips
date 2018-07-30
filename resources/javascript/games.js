let textArea = document.getElementById("text-area");

// Action buttons
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let doneButton = document.getElementById("done-button");

hitButton.style.display = "none";
stayButton.style.display = "none";

// Results
let playerHandText = document.getElementById("player-hand");
let dealerHandText = document.getElementById("dealer-hand");
let playerScoreText = document.getElementById("player-score");
let dealerHandScore = document.getElementById("dealer-score");

let resultsAreas = document.getElementById("results-area");

resultsAreas.style.display = "none";


// Deck and what's been dealt
let g_deck = [];
let g_playerCards = [];
let g_dealerCards = [];

function BuildANewDeck() {
    // Make sure the deck is empty before filling it up
    g_deck = [];
  
    let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    let cardStrs = ['Ace', 'Two', 'Three', 'Four', 
                    'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                    'Ten', 'Jack', 'Queen', 'King'];
    
    for (i = 0; i < suits.length; i++) {

      // Take care of the number cards
      for (let cardCounter = 0; cardCounter < cardStrs.length; cardCounter++) {
        card = {name: (cardStrs[cardCounter] + " of " + suits[i]), 
                value: cardCounter + 1, 
                ace: cardCounter == 1 ? true : false};
        g_deck.push(card);
      }
    }
    //console.log(deck);
}
  
function pickCard() {
  return Math.floor(Math.random() * g_deck.length);
}

//TODO: take care of the ace and "soft" scores -- 
function scoreHand(hand) {
  // Anything with a value over 10, will only count as a 10
  let score = 0;

  for (let index = 0; index < hand.length; index++) {
    if (hand[index].value > 10) {
      score = score + 10;
    }
    else {
      score = score + hand[index].value
    }
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
  playerScoreText.innerText = "You current score is: " + score;

}

newGameButton.addEventListener('click', function() {
  
  textArea.innerText = "Started...";

  newGameButton.style.display = "none"
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";

  resultsAreas.style.display = "block";
  
  // Update the global deck so that it has 52 cards again
  BuildANewDeck();
  
  // Do some minimal error checking, if something went wrong don't continue with the game
  if (g_deck.length != 52) {
    console.log("Opps!!!! - Error Length = " + g_deck.length);

  } else {
    // Pick two random cards

    let card1 = pickCard();
    let card2 = pickCard();
      
    // Deal two cards for the player
    g_playerCards.push(g_deck[card1]);
    g_playerCards.push(g_deck[card2]);
    g_deck.splice(card1, 1);
    g_deck.splice(card2, 1);
    displayPlayerResults();


    // Deal two cards for the dealer - but only show the first one
    card1 = pickCard();
    card2 = pickCard();
    g_dealerCards.push(g_deck[card1]);
    g_dealerCards.push(g_deck[card2]);
    g_deck.splice(card1, 1);
    g_deck.splice(card2, 1);

    dealerHandText.innerText = "The dealer has:\n" + g_dealerCards[0].name;

    console.log(g_deck);
    console.log("There are %d cards left in the deck", g_deck.length);
  }

});

hitButton.addEventListener('click', function() {
  
  let newCard = pickCard();

  console.log("your new card: " + newCard);
  console.log(g_deck[newCard]);

  g_playerCards.push(g_deck[newCard]);
  g_deck.splice(newCard, 1);

  displayPlayerResults();
});
  
stayButton.addEventListener('click', function() {
  // Now it's the dealer's turn to get new cards.
  
});