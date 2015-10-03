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


### Prototypal Inheritance from frontend Masters

##### Method 1
```javascript
Animal = function(name) { this.name = name }
> Animal(name)

// 1. Animal constructor fn exists, with a property `name`.

Animal.prototype.eats = function() { return this.name + " is eating." }
> Animal.eats()

// 2. Animal prototype is created, with a method, `eats`.
// If you did just Animal.eats = fn(){...} nothing would be able to inherite the moethod as it's on the function and not the prototype. You usually wouldn't do that.

Chordate = function(name) { this.name = name; }
> Chordate(name)

// 3. Chordate constructor. Has property `name`.

Chordate.prototype = new Animal();
> Object {name: undefined}

// 4. Now the Chrodate object is linked to the Animal object via each of their prototypes.

Chordate.prototype.has_spine = true;
> true

// 5. Property.

Mammal = function(name) { this.name = name; }
> Mammal(name)

// 6. Same for Mammal

Mammal.prototype = new Chordate();
> Object {name: undefined}

Mammal.prototype.has_hair = true;
> true

m = new Mammal('dog');
> Mammal {name: "dog"}

// 7. The new Mammal has all the things: .eats, .has_spine & .has_hair.
```

##### Method 2
```javascript
Animal = function(name) { this.name = name }
> Animal(name)

Animal.prototype.eats = function() { return this.name + " is eating." }
> Animal.eats()

// 1. Set up Animal the same as in Method 1
// But then use .call() to set the context so you don't have to go through Step 3 above for putting the name property on Chordate:

Chordate = function(name) { Animal.call( this, name ); }
> Chordate(name)

// Invoke the Animal constructor, but invoke whatever `this` is. `new` is whatever `this` is. You're setting the context to the new object.


// 2. Then do the same as before: Make Chordate's prototype a new Animal and give Chordate a has_spine property:

Chordate.prototype = new Animal();

Chordate.prototype.has_spine = true;

// 3. Use .call() again for the Mammal name:

Mammal = function( name ) { Chordate.call( this.name ); }

// 4. Same as above (Steps 6 & 7):

Mammal.prototype = new Chordate();

Mammal.prototype.has_hair = true;

m = new Mammal('dog');


```

##### More inheritance

```javascript
Animal = function() { this.offspring = []; }
> Animal()
Dog = function(){}
> Dog()
Dog.prototype = new Animal();
> Object {offspring: Array[0]}
var dog1 = new Dog(), dog2 = new Dog(), puppy = new Dog();
> undefined
dog1.offspring.push(puppy);
> 1
dog2.offspring;
> [Dog] // this is the puppy
```

##### NB
`Car.prototype.constructor` is `Car`. Basically you can get back to the constructor function (Car) from the prototype of any instance of Car by doing .constructor.


##### Extra inheritance note
```javascript
var Cat = function() {
  return { ears: 2 }
};
var persephone = Cat();
persephone instanceof Cat;
>> false // Cat.prototype won't be anywhere in persephone's prototype chain, since persephone is just an object created with an object literal, so it just delegates to Object.prototype
```

##### And again
```javascript
// Superclass
var Plant = function(height){
  this.height = height;
}

Plant.prototype.grow = function() {
  this.height++;
};

// Subclass
var Cactus = function(height){
  Plant.call(this, height);
};
```
To set up the relationship between the Cactus (subclass) and the Plant (superclass) prototype, we could do:
```javascript
Cactus.prototype = Plant.prototype;
```
This would make it impossible to add methods to Cactus without having them also on Plant. We only want Cactus to inherit from Plant (not the other way round). (NB Doing this would mean the two are the same object in memory).
####### Correct:
```javascript
Cactus.prototype = Object.create(Plant.prototype);
```
This is the correct method. It creates an instance of Plant, which delegates to Plant.prototype. However, the below two would not work:
####### Wrong:
```javascript
Cactus.prototype = Object.create(Car);
```
You're creating an object that delegates to Car, rather than directly to Car.prototype. In this case the Car function is run in the process of creating the new Cactus.prototype object. It's undesirable behaviour.
or
####### Wrong:
```javascript
Cactus.prototype = new Plant();
```
This used to be an advised technique, but every time we make a Plant subclass (like Cactus or Tulip etc), we would be invoking Plant the function - which may even require some arguments to pass in (if none, they'd be `undefined`).

So the "Correct" answer, using `Object.create` sets up a prototype delegation, just like `new`, but without running a constructor function in the process. It has no adverse side effects.

However:
```javascript
  var cactus = new Cactus(3);
  console.log(cactus.constructor); // would be Plant rather than Cactus
```

So, we need to put the constructor function we overwrote (it comes 'for free' with new .prototype objects but not when you do `Object.create`) back:
```javascript
  Cactus.prototype.constructor = Cactus;
```
