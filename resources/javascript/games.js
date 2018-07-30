let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

hitButton.style.display = "none";
stayButton.style.display = "none";



function BuildADeck() {
    let deck = [];
  
    let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    let cardStrs = ['Ace', 'Two', 'Three', 'Four', 
                    'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                    'Ten', 'Jack', 'Queen', 'King'];
    
    for (i = 0; i < suits.length; i++) {

      // Take care of the number cards
      for (let cardCounter = 0; cardCounter < cardStrs.length; cardCounter++) {
        card = {name: (cardStrs[cardCounter] + " of " + suits[i]), 
                value: cardCounter, 
                ace: cardCounter == 0 ? true : false};
        deck.push(card);
      }
    }
    //console.log(deck);
    return deck;
}
  
function pickCard() {
  return Math.floor(Math.random() * 52);
}

newGameButton.addEventListener('click', function() {
  
  textArea = "Started...";
  newGameButton.style.display = "none"
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  
  let deck = BuildADeck();
  
  // Do some minimal error checking, if something went wrong don't continue with the game
  if (deck.length != 52) {
    console.log("Opps!!!! - Error Length = " + deck.length);

  } else {
    // Pick two random cards

    let card1 = pickCard();
    let card2 = pickCard();
      
    let playerCards = [deck[card1], deck[card2]];

    deck.splice(card1, 1);
    deck.splice(card2, 1);

    console.log(deck);
        
    console.log("Welcome to Blackjack!");
    console.log("You are dealt: ");
    console.log(" " + playerCards[0].name);
    console.log(" " + playerCards[1].name);

    console.log("There are %d cards left in the deck", deck.length);
  }

});
  