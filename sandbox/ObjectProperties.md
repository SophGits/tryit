
### Cycle through & access properties of objects within an object
##### NB: item just points to the name - you have to go through itemObject.item.colour (or itemObject[item]['colour']) to get to the colour.

```javascript
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

```javascript
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

---

### Type coercion
```javascript
var x = 4;
var y = "4";
x.valueOf();
> 4
y.valueOf();
> "4"
x.valueOf() == y.valueOf();
> true
```
> ```true``` is returned becuase of the type coercion == does. "4" became just 4 when it was examined. Use === instead.

> See below how valueOf() only tells you there are two array items, but no more info than that.

```javascript
var Apple = function(shape, varieties){
  this.shape = shape;
  this.varieties = varieties;
};
var types = [["Granny Smith", "green", 2], ["Gala", "red", 3]];
var basket = new Apple("round", types);
basket.valueOf();
```
> Apple {shape: "round", varieties: Array[2]}

### Overriding prototypal properties
##### Never override a property in the Object prototypal level
##### Just do it here with valueOf()
```javascript
Apple.prototype.valueOf = function(){
  var sum = 0;
  for(var i=0; i < this.varieties.length; i++){
    sum += this.varieties[i][2];
  }
  return sum;
}
basket.valueOf();
> 5
```
> If you then add a new variety the number you get back will be updated, as the types array was passed in by *reference*.

```javascript
types.push(["Golden Delicious", "yellow", 1]);
basket.valueOf();
> 6
```
>basket.constructor.prototype
>> Apple {valueOf: function}
> or can use:  basket.__proto__;
> use this to go "up" one in the object hierarchy (basket > Apple > Object > null)


