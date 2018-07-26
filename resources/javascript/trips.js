console.log('hello');

function ShowDate() {
    document.getElementById('date').innerHTML = Date();
}

function BlackJack() {

let deck = [];

let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

for (i = 0; i < 4; i++) {
  // Start with the Ace
  deck.push("Ace of " + suits[i]);
  
  // Take care of the number cards
  for (card = 2; card < 11; card++) {
    deck.push(card + " " + suits[i]);
  }
  
  // Finish up with the face cards
  deck.push("Jack of " + suits[i]);
  deck.push("Queen of " + suits[i]);
  deck.push("King of " + suits[i]);
}

// Pick two random cards
let card1 = Math.floor(Math.random() * 52);
let card2 = Math.floor(Math.random() * 52);
let playerCards = [deck[card1], deck[card2]];


console.log("Welcome to Blackjack!");
console.log("The deck has " + deck.length + " cards in it.");
console.log(deck);

console.log("You are dealt: ");
console.log(" " + playerCards[0]);
console.log(" " + playerCards[1]);

}