### Functions

Functions have a:
- Function.prototype (which is itself linked to Object.prototype)
- two hidden properties:
..* its context
..* the code that implements it
- Prototype property (_not_ Function.prototype):
..* A function's prototype property has the value of an object with a constructor property...whose value is a function.


##### Invocation
Four patterns:
1. Method invocation pattern
2. Function invocation pattern
3. Constructor invocation pattern
4. Apply invocation pattern
They differ in how _this_ is initialised.

###### 1. The method invocation pattern
✝. When a function is stored as a property of an object, it's called a method.
✡. When a method is involved, _this_ is bound to that object
☚. if the invocation expression contains `something.something` or `something["something"]` it is invoked as a method.

```javascript
var myObject = {
  value: 0,
  increment: function✝(inc){
    this✡.value☚ ++;
  }
}
myObject.increment();  //1
myObject.increment(2); //3
```


###### 2. The function invocation pattern
When the function in _not_ the property of an object, it is invoked as a function✝.

```javascript
var add = function(a, b){
  return a + b;
};
var sum = add✝(3,4); //7
```
_this_ is bound to the global object, which is annoying.
You'd want it to be bound to the outer function.

Because of this, a method can't make use of an inner function because the inner function doesn't have access to the object (as its _this_ is bound to the wrong value).

But, you can solve it by creating `var that = this;` in the outer function and passing it to the inner one.

```javascript
myObject.double = function(){
  var that = this;
  var helper = function(){
    that.value = add(that.value, that.value);
  };
  helper();
}

myObject.double();
console.log(myObject.value);
```
