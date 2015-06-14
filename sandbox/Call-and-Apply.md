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