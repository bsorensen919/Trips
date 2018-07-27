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
  
  function PickACard() {
    return Math.floor(Math.random() * 52);
  }
  
  function BlackJack() {
  
    let deck = BuildADeck();
  
    // Do some minimal error checking, if something went wrong don't continue with the game
    if (deck.length != 52) {
      console.log("Opps!!!! - Error Length = " + deck.length);

    } else {
      // Pick two random cards
      let card1 = PickACard();
      let card2 = PickACard();
  
      let playerCards = [deck[card1], deck[card2]];
          
      console.log("Welcome to Blackjack!");
      console.log("You are dealt: ");
      console.log(" " + playerCards[0].name);
      console.log(" " + playerCards[1].name);
    }
  }
  