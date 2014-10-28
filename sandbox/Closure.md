### Closure

Re scope, their inner functions get access to the parameters and variables they're defined within - with the exception of `this` and `arguments`.

##### Example 1 (from http://javascript-roadtrip-part3.codeschool.com/levels/2/challenges/3)

<table style="font-family:Consolas, 'Liberation Mono'">
  <tbody>
    <tr style="vertical-align:top;">
      <td>
        <b>function</b> mystery( input ){<br/>
        &nbsp;&nbsp;&nbsp;<b>var</b> secret = 5;<br/>
        &nbsp;&nbsp;&nbsp;<b>function</b> mystery2 ( multiplier ) {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;multiplier *= input;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<b>return</b> secret * multiplier;<br/>
        &nbsp;&nbsp;&nbsp;}<br/>
        &nbsp;&nbsp;&nbsp;<b>return </b>mystery2;<br/>
        }<br/>
        <br/>
        <b>var hidden = mystery(4);<br/>var result  = hidden(2);</b>
      </td>
      <td>multiplier is 2 <br/>input is 4 <br /><br/>
      result is same as hidden(2), which is 40;
      </td>
    </tr>
  </tbody>
</table>


##### Example 2 (from Codeschool)
<table>
  <tbody>
    <tr>
      <td>
        <b>function</b> mystery ( input ){  <br/>
         &nbsp;&nbsp;<b>var</b> secret = 4;  <br/>
         &nbsp;&nbsp;input+=2;  <br/>
         &nbsp;&nbsp;<b>function</b> mystery2 ( multiplier ) {   <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;multiplier *= input;  <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;return secret * multiplier;  <br/>
          &nbsp;&nbsp;}  <br/>
          &nbsp;&nbsp;<b>return</b> mystery2;  <br/>
        }  <br/>
        <b>function</b> mystery3 ( param ){  <br/>
          &nbsp;&nbsp;<b>function</b> mystery4 ( bonus ){  <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<b>return</b> param(6) + bonus;  <br/>
          &nbsp;&nbsp;}  <br/>
         &nbsp;&nbsp; <b>return</b> mystery4;  <br/>
        }
        <br/>
        <br/>
        <b>var hidden = mystery(3);<br/>
        <b>var jumble = mystery3(hidden);<br/>
        <b>var result = jumble(2);</b><br/>
      </td>
      <td>
       result = jumble(2)<br />
       = mystery3(hidden)(2)<br />
       = mystery3( mystery(3) )(2)<br /><br />
       So <b>bonus = 2</b> (wihin mystery4)<br /><br />
       mystery3(param) is mystery3(hidden).<br />so hidden = param, <br/><br/>and since hidden = mystery(3),<br/> param(6) = hidden(3)(6).<br/>So 6 is fed into mystery's internal function (ie <b>multiplier = 6</b>)<br />
      </td>
    </tr>
  </tbody>
</table>

So, here we input the values:

```javascript
function mystery ( input = 3 ){
  var secret = 4;
  input+=2; // 3 + 2 = 5
  function mystery2 ( multiplier = 6 ) { //
    multiplier *= input;  // multiplier = 6 * 5 = 30
    return secret * multiplier;  // 4 * 30 = 120  (apparently this is param(6) rather than just param)
  }
  return mystery2;
}
```
Then,

```javascript
function mystery3 ( param ){
  function mystery4 ( bonus = 2 ){
    return param(6) + bonus;    // 120 + 2 = 122
  }
  return mystery4;
}
```

> result is 122

---

### A note on scope (from Crockford)
Most languages with C syntax have block scope, but JS doesn't. It has function scope - ie parameters and variables defined in a function arent't visible outside of it. In modern languages it is recommended that variables be declared as late as possible, at the first point of use - but because JavaScipt lacks block scope you should declare all variables used in a function at the top of a function body.

---

##### Loops within closure
#### Bad loop example
```javascript
var fruits = ['banana', 'apple', 'orange'];
var numberFruits = function(fruits){
  var i;
  for(i=0; i < fruits.length; i+=1) {
      $('cite').after("<div id='fruitcontainer' style='background:pink; height: 2em; width: 100%;'></div>");
      $('#fruitcontainer').after("<div style='color:orange;background:aliceblue;' class ='yo'>HI_THERE " + fruits + "</div>");
      var domfruits = $('.yo');
      domfruits[i].onclick = function(){
        console.log(i);
     };
  }
};
numberFruits(fruits);
```
NB: Do it in the console of Modernizr.com because the DOM element "cite" is nice and obvious.
Now click on anything created and you'll only ever get 3 console logged, on the third item.

The above is meant to give each fruit a number, i, but instead the handler functions are bound to the variable i, nt the value of i at the time the function was made.

#### Better loop example
A better verison is:
(NB: run it after the above)

```javascript
var numberFruits2 = function(){
   var helper = function(i){
     return function(){
        alert(i);
     };
   };
 var domfruits = $('.yo');
  var i;
  for(i=0;i < domfruits.length; i+=1){
    domfruits[i].onclick = helper(i);
  }
}
```
Now you can see that the alert gives the actual index of each clicked dom element.

---

##### Initialising an instance
Instead of initialising myObject with an object literal, do it by calling a function which returns one:

```javascript
var myObject = (function(){
  var value = 0;✝

  return{
    increment: function(inc){
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function(){
      return value;
    }
  };
}());
```
✝. This value variable is always available to the `increment` and `getValue` methods, but the function's scope keeps it hidden from the rest of the programme.
> myObject >> Object {increment: function, getValue: function}

We are assigning to myObject the result of invoking a function. The function returns an object containing two methods, which continue to enjoy access to the `value` variable.

#### Quo Eg 1 of 2
```javascript
var Quo = function(string)✡{
  this.status = string;
}
✝Quo.prototype.get_status = function(){
  return this.status;
};
✝✝var myQuo = new Quo("confused");
console.log(myQuo.get_status()); //confused
```
✡. Create a constructor function called Quo. It makes an object with a `status` property.
✝. Give all instances of Quo a public method called `get_status`.
✝✝. Make an instance of Quo.


#### Quo Eg 2 of 2
```javascript
✡var quo = function(status){
  return{
    get_status: function(){
      return status;
    }
  };
};
✝var myQuo = quo("amazed");
console.log(myQuo.get_status()); //amazed
```
✡. Create a maker function called quo. It makes an object with a `get_status` method and a private status property.
✝. Make an instance of quo.

This quo function is designed to be used without the `new` prefix, so the name isn't capitalised. Calling `quo` returns a new object containing a `get_status` method.
A reference to that object is stored in myQuo. The `get_status` method still has privileged access to quo's `status` property even though `quo` has already returned.