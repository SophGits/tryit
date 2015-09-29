### Patterns

##### Decorator

A decorator function receives an object, augments it (with properties or functionality) and returns it.

Often given an adjective name, such as "catlike", below:

```javascript
var catlike = function( obj, pawCount) {
  obj.pawCount = pawCount;
  return obj;
};

var prudence = catlike( {}, 4 );
```