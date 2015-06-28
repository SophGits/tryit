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
* Invokes (calls) a new object
* Returns the new object (person)