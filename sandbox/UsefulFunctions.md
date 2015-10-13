### Useful functions

> filter
> map
> for each
> // return `[]`

> reduce

> every
> some
> // return `true` / `false`

> indexOf()
> Object.keys
> for
> case/  switch

> exit early

`filter`, `for each` and `map` output arrays.

`reduce` takes `{}` or `[]` and outputs `{}`, `[]`, a number or a string.

##### Some and Every
Returns true or false
```javascript
[1, 2, 3, 4].some(function(val, i){
  return val === 3;
});
// true
```
```javascript
[1, 2, 3, 4].every(function(val, i){
  return val === 3;
});
// false
```

###### map
```javascript
var tripled = [1, 2, 3].map(function(val, i){
  return val*3;
});
// tripled --> [3, 6, 9]
```

###### filter
Returns an array.

When the input is an object:
(use Object.keys(object) to essentially turn it into an array)
```javascript
var animals = {
  kitten: "small",
  tiger: "big",
  liger: "huge"
}

Object.keys(animals).filter(function(key, val){
  return animals[key] === "huge";
});
// ["liger"]
```
When the input is an array:
```javascript
var numbers = [1, 2, 3, 4];

numbers.filter(function(val, i){
  return val > 2;
});
// [3, 4]
```

###### indexOf (and filter)
```javascript
[1, 2, 3].filter(function(val, i){
  return [3, 4, 5, 6].indexOf(val) > -1;
});
// [3]
```
```javascript
["a", "cat"].indexOf("cat")
// 1
["a", "cat"].indexOf("dog")
// -1
```

###### reduce
`reduce` takes this form:
```
blah.reduce(function(ret, val , i){
  ~modify ret~
  return ret;
}, []✝)
```
✝ it gets initialised here (in this example, as an array) - and it can be an array, object, string, number... It doesn't have to be empty or '0' - you can start at 0 or 10 or 50 etc.

If you don't return ret each time, you'll get `undefined`.


Output a string
```javascript
[1, 2, 3].reduce(function(ret, val, i){
  ret = ret + val.toString();
  return ret
}, "");
// "123"
```
>  NB: You don't really need .toString() here because the `, ""` already sets `ret` as a string

Return an array
```javascript
[1, 2, 3].reduce(function(ret, val, i){
  ret.push(3*val);
  return ret
}, []);
// [3, 6, 9]
```

Return an object
```javascript
[1, 2, 3].reduce(function(ret, val, i){
  if(i === 0 || val === 1){
    ret["one"] = val;
  }
  else if(i === 1 || val === 2){
    ret["two"] = val;
  }
  else if(i === 2 || val === 3){
    ret["three"] = val;
  }
  return ret
}, {});
// {one: 1, two: 2, three: 3}
```


###### Object.keys (and reduce)
> Task: transform the address (an array of 3 strings) into one string, inside an array.

```javascript
  var person = {name: "Bob", age: "50", address: ['1 Main Street', 'London', 'EC1V 4PS']}


   Object.keys(person).reduce(function(ret, key, i){
      if(key === "address") {
      var stringAddress = person[key].reduce(function(ret2, val2, i2){
        ret2 = ret2 + val2;
        return ret2;
      }, "");
      ret.push(stringAddress);
     }
     return ret;
    }, []);
```

Outputting an object:
```javascript
[1, 2, 3, 4, 5].reduce(function(ret, val, i){
  if( val%2 === 0 ){
    ret["even"].push(val);
  } else {
    ret["odd"].push(val)
  }
  return ret;
}, {even: [], odd: []});
//  {even: Array[2], odd: Array[3]}
```
> outputs a dictionary (when you store something in a hash because a key is an easy lookup)



##### Object.keys & reduce with a function (that's unecessary, but might be useful to fiddle with)
```javascript
document.onreadystatechange = function(){
  if(document.readyState === "complete") {
     init();
   }
};

function init(){

  console.info("testing");
  var person = {name: "Bob", age: "50", address: ['1 Main Street', 'London', 'EC1V 4PS']}
  function yo(person){
    return Object.keys(person).reduce(function(ret, key, i){
        console.log(ret, key, i, person[key]);
      if(key === "address") {
        // console.log(person[key]);
      var stringAddress = person[key].reduce(function(ret2, val2, i2){
        ret2 = ret2 + val2;
        return ret2;
      }, "");

    console.log(stringAddress);
      ret.push(stringAddress);
     }
     return ret;
    }, []);
  }
  console.log("yo: ", yo(person))

}
```

###### for loop
On an object, use Object.keys()

```javascript
var messages = {
    "key_1": {
      "your_name": "jimmy",
      "your_msg": "hello world"
    },
    "key_2": {
      "your_name": "billy",
      "your_msg": "foo equals bar"
    }
}

for (var key in messages) {
   var obj = messages[key];
   for (var prop in obj) {
      // important check that this is objects own property
      // not from prototype prop inherited
      if(obj.hasOwnProperty(prop)){
        console.log(prop + " = " + obj[prop]);
      }
   }
}
```

###### apply
```javascript
function sum(x, y, z){
  return x + y + z;
}

var numbers = [1, 5, 10];

sum.apply(null, numbers);
16
```

###### case/ switch



#### Exercises
```javascript
  var person = {name: "Bob", age: "50", address: ['1 Main Street', 'London', 'EC1V 4PS']}
  var person2 = { address: ['1 Main Street', 'London', 'EC1V 4PS'], name: "Bob", age: "50"}
  var addressString = "1 Main Street London EC1V 4PS";

  // Get string of the address

  function getFullAddress(details){
    return Object.keys(details).reduce(function(ret, key, i){
      if(key === "address"){
        details[key].forEach(function(val, i){
           ret = ret + val + " ";
        });
      }
       return ret;
    }, "");
  }
  console.log("getFullAddress: " + getFullAddress(person2));

  // Create an array from the string
  function stringToArray(string){
    var firstAndLast = string.split("London");
    firstAndLast.splice(1, 0, "London").join();
   // console.log(firstAndLast);
    return firstAndLast;
  }
  console.log("stringToArray: " + stringToArray(addressString));

  // Check if array is longer than 2
  var lengthOfArray = stringToArray(addressString);
  function greaterThanTwo(array){
    return array.length > 2;
  }
  console.log("greaterThanTwo: " + greaterThanTwo(lengthOfArray));


  // Create an object with a key of address and value of an array of an address

  // Write a function that console logs an input with a newline above and below

  // Check if the address has a postcode - throw an error if it doesn't

      // check for a posrcode pattern

      if(true == true){
        throw new Error("Message for error here");
       } else {
         console.log("Impossible")
       }
```


