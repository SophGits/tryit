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

###### 3. The constructor invocation pattern
Using `new` to create an object which inherits from its prototype member makes `this` bind to the  new object and also changes the bahaviour of the `return` statement.

```javascript
var Banana = function(string){
  this.status = string;
};
Banana.prototype.get_status = function(){
  return this.status
};
var myBanana = new Banana✝('sad');
console.log(myBanana.get_status()); //sad
```
If a constructor is called without using the `new` prefix, bad things will happen and you won't see a compile-time or runtime warning.

Use of this style of constructor functions is not recommended.

> ✝ Capital letter for a constructor is very important. The onstructor is the one prefixed with `new`.

###### 4. The Apply invocation pattern
Functions can have methods (as you know)

The `apply` method lets us build an array of arguments✝ used to invoke a function. It also lets us choose the value of `this`✡.

```javascript
var array = [3, 4];
var sum = add.apply(null✡, array✝); // sum is 7

var brian = {
  status: "fine";
}

// brian does not inherit from Banana, but we can still invoke Banana's method "get_status" on brian:

var status = Banana.prototype.get_status.apply(brian);
// brian's status is "fine".
```

##### Arguments
An `arguments` array-like object is available to all functions when theyre invoked. They can include excess arguments that weren't assigned to parameters, eg:

```javascript
var add = function(){
  var i, sum=0;
  for(i=0; i < arguments.length; i++){
    sum += arguments[i];
  }
  return sum;
};
console.log(add(4,8,15,16,23,42)); // 108
```

##### Return
A function always returns a value. If a return value is not specified, `undefined` is returned.

If you invoke a function using `new` and the return value is not an object, then `this` (the new object) is returned instead.

##### Exceptions
Use `throw` for handling something unexpected:

```javascript
var add = function (a,b){
  if(typeof a !== "number" || typeof b !== "number"){
    throw{
      name: "TypeError",
      message: "add needs numbers"
    };
  }
  return a + b;
}
```
The `throw` statement's object should, at least, have a name identifying the type of exception and a descriptive message. You can also add other properties.

Here's a `try` block. If an exception is thrown within that, control does to the `catch` clause:

var try_it = function(){
  try{
    add("seven");
  }
  catch(e){
    console.log(e.name + ": " + e.message);
  }
}
try_it();

The `catch` clause will type out the error name and message you created in `throw`, above.

`try` has one `catch` block for catching all exceptions. If you need to know the type of exception in order to do different things with it, then get your exception handler to inspect the `name` to determine the type of exception.




##### Execution time
Builds in memory as soon as the program loads
```javascript
function add (a, b){
  return a + b;
}
```

A function expression. It only loads when you get to that line of the program:
```javascript
var sum = function add(a, b){
  return a + b;
}; // this one needs a semicolon at the end because it's an assignment statement (is assigned to the variable `sum`)
```

We tend to do the function expression above as an anonymous function (ie "add" as a name is not required)

Useful when you want to do something like:
```javascript
var lang = "eng";
function(lang){
  if(lang = "eng"){
    var sayBye = function(){
      console.log("I'm off, see you soon.")
    };
  else if(lang = "italian"){
    var sayBye = function(){
      console.log("Ciao bello.")
    };
  }
}

function leavingNow(message){
  message();
}

leavingNow(sayBye);
```




##### Map

Map examples:

```javascript

var namesArray = [  ["Joe", "Bloggs"],
                    ["Jo", "Blogs"],
                    ["Christine", "Sings"],
                    ["Dan", "&Dan"]  ];

var modifiedNames = namesArray.map(function(item){
    return item[0] + " " + item[1];
  }
);

```
> modifiedNames is now: ["Joe Bloggs", "Jo Blogs", "Christine Sings", "Dan &Dan"]

##### Shift

`var array = ["a", "b", "c", "d"];`
`var firstItem = array.shift();`
`firstItem` is now "a"