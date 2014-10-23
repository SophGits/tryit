### Closure

##### Example 1 (from http://javascript-roadtrip-part3.codeschool.com/levels/2/challenges/3)


```javascript
var hidden = mystery(4);<br/>
var result  = hidden(2);
<br/><br/>
function mystery ( input ){<br/>
  var secret = 5;<br/>
  function mystery2 ( multiplier ) {<br/>
    multiplier *= input;<br/>
    return secret * multiplier;<br/>
  }<br/>
  return mystery2;<br/>
}
```
result == hidden(2) == 40;



| col 1 | col2 | col3 |
| --- | --- | --- |
|function mystery ( input ){
  var secret = 5;
  function mystery2 ( multiplier ) {
    multiplier *= input;
    return secret * multiplier;
  }
  return mystery2;
}| col 2  |col3 |
| col 1 | col2 | col3 |

