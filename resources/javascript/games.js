function BuildADeck() {
    let deck = [];
  
    let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    let cardStrs = ['Ace', 'One', 'Two', 'Three', 'Four', 
                    'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                    'Ten', 'Jack', 'Queen', 'King'];
    
    for (i = 0; i < 4; i++) {
      // Start with the Ace
      var card = {name: ("Ace of " +suits[i]), value: 1, ace: true}
      deck.push(card);
      
      // Take care of the number cards
      for (let cardCounter = 2; cardCounter < 14; cardCounter++) {
        card = {name: (cardStrs[cardCounter] + " of " + suits[i]), value: cardCounter, ace: false};
        deck.push(card);
      }
      
      // Finish up with the face cards
      //card = {name: ("Jack of " + suits[i]), value: 10, ace: false};
      //deck.push(card);
      //card = {name: ("Queen of " + suits[i]), value: 10, ace: false};
      //deck.push(card);
      //card = {name: ("King of " + suits[i]), value: 10, ace: false};
      //deck.push(card);
    }
    // console.log(deck);
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
  