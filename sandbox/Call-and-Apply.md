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
