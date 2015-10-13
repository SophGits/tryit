"use strict"

window.onload = function () {

// 1. reduce
  // 1.1 // Array => string
  [1, 2, 3].reduce(function(ret, val, i){
    ret = ret + val.toString();
    return ret
  }, "");
  // "123"

  // 1.2 // Array => array
  ["one", "two", "three"].reduce(function(ret, val, i) {
    ret.push(val === "two")
    return ret;
  }, []);
  // [false, true, false]

  // 1.3 // Object => string
  var person = {name: "Bob", age: "50", address: ['1 Main Street', 'London', 'EC1V 4PS']}

  Object.keys(person).reduce(function(ret, val, i) {
    ret += person[val] + " ";
    return ret;
  }, "");
  // "Bob 50 1 Main Street,London,EC1V 4PS "

  // 1.4 // Array => object
  [1, 2, 3, 4, 5].reduce(function(ret, val, i) {
    if( val % 2 === 0 ) {
      ret.even.push(val);
    } else {
      ret.odd.push(val);
    }
    return ret;
  }, {even: [], odd: [] });

// map
  // 1.1 // Array => array
  [1, 2, 3, 4].map(function(val, i) {
    return val*2;
  });

  // [2, 4, 6, 8]

  // 1.2 // Array => array
  var roots = numbers.map(Math.sqrt);
  // roots is now [1, 2, 3], numbers is still [1, 4, 9]

  // 1.3 Using map generically
  Array.prototype.map.call("hi", function(x){return x});
  // ["h", "i"]
  Array.prototype.map.call("hi", function(x){return x}).reverse().join('');
  // "ih"

  // 1.4 Generically II
  var map = Array.prototype.map;
  map.call("Hello, world", function(x) { return x.charCodeAt(0) });
  // [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100]

// filter

// some

// every


};