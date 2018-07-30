let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

hitButton.style.display = "none";
stayButton.style.display = "none";

let gDeck = [];
let gPlayerCards = [];

function BuildANewDeck() {
    // Make sure the deck is empty before filling it up
    gDeck = [];
  
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
        gDeck.push(card);
      }
    }
    //console.log(deck);
}
  
function pickCard() {
  return Math.floor(Math.random() * gDeck.length);
}

newGameButton.addEventListener('click', function() {
  
  textArea = "Started...";
  newGameButton.style.display = "none"
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  
  // Update the global deck so that it has 52 cards again
  BuildANewDeck();
  
  // Do some minimal error checking, if something went wrong don't continue with the game
  if (gDeck.length != 52) {
    console.log("Opps!!!! - Error Length = " + gDeck.length);

  } else {
    // Pick two random cards

    let card1 = pickCard();
    let card2 = pickCard();
      
    gPlayerCards.push(gDeck[card1]);
    gPlayerCards.push(gDeck[card2]);

    gDeck.splice(card1, 1);
    gDeck.splice(card2, 1);

    console.log(gDeck);
        
    console.log("Welcome to Blackjack!");
    console.log("You are dealt: ");
    console.log(" " + gPlayerCards[0].name);
    console.log(" " + gPlayerCards[1].name);

    console.log("There are %d cards left in the deck", gDeck.length);
  }

});

hitButton.addEventListener('click', function() {
  let newCard = pickCard();

  console.log(newCard);
  console.log(gDeck[newCard]);

  gPlayerCards.push(gDeck[newCard]);

  gDeck.splice(newCard, 1);

});
  