### Patterns

##### Decorator

A decorator function receives an object, augments it (with properties or functionality) and returns it.

Often given an adjective name, such as "catlike", below:

```javascript
var catlike = function( obj, pawCount ) {
  obj.pawCount = pawCount
  obj.losePawInFight = function() {
    this.pawCount--
    return obj
  }
  return obj
};

var prudence = catlike( {}, 4 );

// prudence
// Object {pawCount: 4}
// prudence.losePawInFight()
// Object {pawCount: 3}
```

But every time we make a new catlike object, we're creating a new losePawInFight function, which could take up a lot of memory.


A closer look at 'this':
```javascript
obj.losePawInFight = function() {
  this.pawCount--
}
```
is better as:
```javascript
obj.losePawInFight = function() {
  obj.pawCount--
}
```
because `this` gets bound to a new value every time losePawInFight in invoked, it's better to refer to the closure variable, obj. Each time catlike is called, a new closure scope is created - which means obj will always relate to only one catlike object.

##### Decorator fn Vs Class
A Class builds the object it will augment, whereas a decorator function accepts the object (to augment) as an input.

Here is the `constructor function` for the Class of Cat:
```javascript
var Cat = function( pawCount ) {
  var obj = { pawCount: pawCount }
  obj.losePawInFight = function() {
    obj.pawCount--
    return obj;
  }
  return obj;
};

var prudence = Cat( 4 );
```
