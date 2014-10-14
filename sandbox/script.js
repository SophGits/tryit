// Remembering how to cycle through and access properties in objects within an objects

var sweetsObject = {
  "Sherbert lemon": {bitterness: 5, colour: "yellow"},
  Bonbon: {bitterness: 1, colour: "pink"},
  "Wethers Original": {bitterness: 0, colour: "brown"},
  Pushpop: {bitterness: 0, colour: "red"}
}

function listsweets(itemObject){
  for (var item in itemObject){
    console.log(item + "s are " + itemObject[item]['colour'] + ".");
  }
}
listsweets(sweetsObject);

// >>> outputs:
// Sherbert lemons are yellow.
// Bonbons are pink.
// Wethers Originals are brown.
// Pushpops are red.

// NB: item just points to the name - you have to go through itemObject.item.colour (or itemObject[item]['colour']) to get to the colour.