### Call and Apply

```javascript
var dog = {
  bark: function(count) {
    console.log("arf! " + count);
  }
}

dog.bark.apply('cat', [1]);
> arf! 1

```

`call` and `apply` are essentially the same: provide the context and then the value/s. Except with `apply` you supply an array.

##### call(), apply() and bind()()
```javascript
var sayHi = function( name ) {
  console.log("Hello, " + name);
};

sayHi.call(this, 'Jim');
>> Hello, Jim

sayHi.apply(this, ['Jim']);
>> Hello, Jim

sayHi.bind(this, 'Jam')();
>> Hello, Jam
```
##### Bind
```javascript
var x = 9

var module = {
  x: 81,
  getX: function() { return this.x }
}

module.getX();
>> 81
var getX = module.getX;
getX()
>> 9  // "this" refers to the global object

var boundGetX = getX.bind(module);
boundGetX()
>> 81  //  "this" refers to module
```
##### Another bind example
```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3);
list1
>> [1, 2, 3]

var listStartingFoo = list.bind(undefined, "foo"); // I think this works because the context can be anything (and hence everything you use with it) and "foo" is always the initial argument
listStartingFoo()
>> ["foo"]

var list3 = listStartingFoo(1, 2, 3)
list3
>> ["foo", 1, 2, 3]
```
