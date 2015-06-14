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


### Augmenting types
##### Alter Function.prototype so you don't have to type the name of the prototype property:

```javascript
Function.prototype.method = function(name, func){
  this.prototype[name] = func;
  return this;
};
```
>eg:
> Function.prototype.cat = function(){
>   console.log("meow");
>  };
> Using the above, instead of Function.prototype.cat(), you only have to write Function.cat();

##### JS has no integer type
But you can add an integer method to Function.prototype:

```javascript
Number.method('integer', function(){
  return Math[this < 0 ? "ceil" : "floor"](this);
});
console.log((-10/3).integer()); // -3
```

##### JS has no method to remove spaces from the ends of strings.
Try this:
```javascript
String.method('trim', function(){
  return this.replace(/^\s+|\s+$/g, '')
});
console.log('"' + " carrots ".trim() + '"');
```

##### Check if a method exists
The prototypes of the basic types are public structures, so be careful when mixing libraries. You _could_ only add a method if it's missing, using something like:

```javascript
Function.prototype.method = function(name, func){
  if(!this.prototype[name]){
    this.prototype[name] = func;
    return this;
  }
};
```

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
>>>>>>> sandbox


### __proto__ and .hasOwnProperty()

```javascript
var hi = function(){ console.log("hi"); }

hi.hasOwnProperty('bind')
>false

hi.__proto__.hasOwnProperty('bind')
>true
```