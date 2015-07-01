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
