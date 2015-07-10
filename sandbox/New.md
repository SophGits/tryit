### New keyword

```javascript
var Person = function( name ) {
  this.name = name;
}

Person.prototype.speak = function() {
  console.log("Hello, world.");
}

var person = NEW( Person, ['name'] );

person.speak();
```
Where the function NEW does the same as the `new` keyword, we expect it to:
* Create a new object (person obj)
* Set the prototype prototype to the prototype of Person
* Invokes (calls) a new object (with new object as context)
* Returns the new object (person)

So,:

```javascript
NEW = function( constructor, args ) {
  var o = {} ;
  o.__proto__ = constructor.prototype;
  constructor.apply( o, args );

  return o;
}
```