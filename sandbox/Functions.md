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
✝. When a function is stored as a property of an object, it's called a method.<br />
✡. When a method is involved, _this_ is bound to that object<br />
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


##### Passing function expressions as variables
>Task: check score and decide if it's LOW, MEDIUM or HIGH. Display a custom message dependent on this.
> The message should be built inside a function expression and stored in a variable called `message`.
> `message` gets passed to a declared function called `confirmProceed`.
> The results of `confirmProceed` should be stored in a variable called `start` (true or false, depending on the user's confirmation).

```javascript
var score = 270;
var message;

if(score < 200){
  message = function(){
    return confirm("Level LOW\nProceed?");
  };
} else if(score <= 300){
  message = function(){
    return confirm("Level MEDIUM\nGo ahead?");
  };
} else {
  message = function(){
    return confirm("HIGH\nNext?");
  };
}
var start = confirmProceed(message);
function confirmProceed(confirmToGo){
  return confirmToGo();
}
```

---

##### Anonymous functions in an array
NB: Don't get tripped-up on how to use the semi-colons.

> Task: Create an array of functions, with each cell containing a function that should:
> Return 8 less than 3 times an input.
> Return the cube of the sum of an input and 2.
> Return 9 less than the result of an input squared.
> Return the remainder after an input is divided by 4.

Answer:
```javascript
var array = [
  function(input){return 3*input -8;},
  function(input){return (input + 2) * (input+2) * (input +2);},
  function(input){return (input*input)-9;},
  function(input){return input%4;}
];
```
##### Puzzle part II
> Task:
> Treat an array of functions like a queue; passing the result of one into the next until the queue is empty.
> Build and store a function which takes in a number and an array.

```javascript
var puzzleArray = [
  function(input){return 3*input -8;},
  function(input){return (input + 2) * (input+2) * (input +2);},
  function(input){return (input*input)-9;},
  function(input){return input%4;}
];
var start = 2
var applyAndEmpty = function( input, queue ) {
  var length = queue.length;
  for(var i = 0; i < length; i++){
    input = queue.shift()(input);
  }
  return input;
};
alert(applyAndEmpty(2, puzzleArray));

```
///NB if you do this:
```javascript
var puzzlers = [
  function ( a ) { return 8*a - 10; },
  function ( a ) { return (a-3) * (a-3) * (a-3); },
  function ( a ) { return a * a + 4; },
  function ( a ) { return a % 5; }
];
var start = 2;

var applyAndEmpty = function(number, queue){
  for(i=0; i < queue.length; i++){
    number = queue.shift()(number);
  }
  return number;
};
alert(applyAndEmpty(2, puzzlers));
```
you get this error message:

>"Your queue is getting shorter, but your loop is also checking that decreasing length on each cycle. It needs to run for as many cycles as there WERE functions initially, NOT for as many cycles as there currently ARE in any given cycle.""

That’s why you need that var length = queue.length - because shift() shortens it every cycle.


##### Puzzle part III
>“What is obtained when the result of passing 9 into function 4 is then passed into the function whose array index matches the result of passing 3 into function 2?”

```javascript
var puzzleArray = [
  function ( a ) { return 8*a - 10; },
  function ( a ) { return (a-3) * (a-3) * (a-3); },
  function ( a ) { return a * a + 4; },
  function ( a ) { return a % 5; }
];

alert( puzzleArray[ puzzleArray[1](3) ]( puzzleArray[3](9) ) );
```

---

##### Store result of a choice in a variable
> Task:
> Prompt user for a choice (1, 2 or 3)
> Pass number to a function, `select`, which creates a message function and returns it in a variable to be used later.

```javascript
function select(choice){
  if(choice == 1){
     return function () {
     alert("You chose 1");
     };
   } else if (choice == 2){
     return function () {
     alert("You chose 2");
     };
   } else if (choice == 3) {
     return function () {
       alert("You chose 3");
     };
   }
 }

var choice = 1;
var banana = select(choice);
banana(); // alerts "You chose 2"
```

---

###### Changing declarations to expresssions
```javascript
function walk(){
  var toNote = "";
  for(var i = 0; i<5; i++){
    toNote = toNote + "I'm going for a walk now.\n";
  }
  console.log(toNote);
}
```
```
walk();
>I'm going for a walk now.
>I'm going for a walk now.
>I'm going for a walk now.
>I'm going for a walk now.
>I'm going for a walk now.
```

To change this declared function (which is kept in memory) to an anonymous function expression, assigned to a variable called `walkAway`:

```javascript
var walkAway = function(){
  var toNote = "";
  for(var i=0; i<5; i++){
    toNote = toNote + "I'm going for a walk now.\n";
  }
  console.log(toNote);
}
```
```
walkAway();
>I'm going for a walk now.
>I'm going for a walk now.
>I'm going for a walk now.
>I'm going for a walk now.
>I'm going for a walk now.
```
---

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