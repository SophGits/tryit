### Useful functions

> filter
> map
> for each
> // return []

> reduce

> every
> some
> // return true / false

> indexOf()
> Object.keys
> for
> case/  switch

> exit early

`filter`, `for each` and `map` output arrays.
`reduce` takes {} or [] and outputs {}, [], a number or a string.

###### for loop

###### filter
Returns an array.

Input is object:
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
Input is array:
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


###### NB: This does not yet work:
```javascript
<!-- var person = {name: "Bob", age: "50", address: ['1 Main Street', 'London', 'EC1V 4PS']}

Object.keys(person).reduce(function(ret, val, i){
  if(val.length > 1){
  var stringAddress = val.reduce(function(rett, vall, ii){
    rett = rett + vall.toString();
    return rett;
  }, "");
  ret.push(stringAddress)
}
return ret;
}, []); -->

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
