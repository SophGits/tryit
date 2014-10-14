
### Cycle through & access properties of objects within an object
##### NB: item just points to the name - you have to go through itemObject.item.colour (or itemObject[item]['colour']) to get to the colour.

```
var sweetsObject = {
  "Sherbert lemon": {bitterness: 5, colour: "yellow"},
  Bonbon: {bitterness: 1, colour: "pink"},
  "Werther's Original": {bitterness: 0, colour: "brown"},
  Pushpop: {bitterness: 0, colour: "red"}
}

function listsweets(itemObject){
  for (var item in itemObject){
    console.log(item + "s are " + itemObject[item]['colour'] + ".");
  }
}
listsweets(sweetsObject);
```

---

### Create a function as a new object property & loop over everything not including itself:
##### (ie all the sweets, but not the new function)

```
sweetsObject.listsweets = function(){
  for(var property in this){
    if(this[property]["colour"]){
      console.log(property + ", with the colour " + this[property]["colour"] + ".");
    }
  }
}
sweetsObject.listsweets();
```
> sweetsObject is now:
> Object {Sherbert lemon: Object, Bonbon: Object, Wethers Original: Object, Pushpop: Object, listsweets: function}