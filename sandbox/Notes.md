### General JavaScript Notes


##### Undefined
> Attempting to retrieve values from `undefined` throws a type error

```javascript
typeof thing.number      // 'number'
typeof thing.name        // 'string'
typeof thing.items       // 'array'
typeof thing.nonexistant // 'undefined'
```
but be careful because:
```javascript
typeof thing.toString    // 'function'
typeof thing.constructor // 'function'
```
to deal with this you can either make your program reject function values, or, use the hasOwnProperty method (which does not look at the prototype chain).

---

#### Enumerators
```javascript
for (x in y){}
```
Don't count on anything coming back in any order - and, as it will loop over all property names in your object, you might want to filter put any values you don't want (this is where typeof and hasOwnProperty come in)

#### for....in
```javascript
var name;
for (name in obj){
  if(typeof obj[name] !== 'function'){
    console.log(name + ": " + obj[name]);
  }
}
```
and to ensure all property names come back in a way you like, do:
#### for
```javascript
var i;
var properties = [
  "name",
  "colour",
  "shape"
];
for(i=0; i < properties.length; i++){
  console.log(properties[i] + ": " + obj[properties[i]])
}
```
This way we can get back the properties we wanted without worrying about what might be dredged up from the proptotype chain.

---

#### Global variables
Create one for your app and put everything in there,
eg `MYAPP.thing = {name: "Bob", colour: "blue"};`