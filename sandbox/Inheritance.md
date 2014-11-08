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
```javascript
basket.constructor.prototype
> Apple {valueOf: function}
```
or can use:  ```basket.__proto__;```
> use this to go "up" one in the object hierarchy (basket > Apple > Object > null)

---

#### [Useful blogpost by Alex Sexton](https://alexsexton.com/blog/2013/04/understanding-javascript-inheritance/) (see final code block)

### Inheritance logic

```javascript
var Car = function(){_stuff_}
var c = new Car();
var Mazda = function(){_stuff_}
mazda.prototype = c;
var m = new Mazda
```
In this case, m is an instance of Car
But
m's constructor is also Car - not Mazda.

In order to sort this you have to do:

`Mazda.prototype.constructor = Mazda`

And it has to be after you declare the Car instance.

>Source: Source Decoded channel on YouTube. Video title: "I Love *&@^#! JavaScript!"