// Remembering how to cycle through and access properties in objects within an objects

var sweetsObject = {
  "Sherbert lemon": {bitterness: 5, colour: "yellow"},
  Bonbon: {bitterness: 1, colour: "pink"},
  "Wethers Original": {bitterness: 0, colour: "brown"},
  Pushpop: {bitterness: 0, colour: "red"}
}

function listsweets(itemArray){
  for (var item in itemArray){
    console.log(item + "s are " + itemArray[item]['colour'] + ".");
  }
}
listsweets(sweetsObject);

// >>> outputs:
// Sherbert lemons are yellow.
// Bonbons are pink.
// Wethers Originals are brown.
// Pushpops are red.