### Closure

##### Example 1 (from http://javascript-roadtrip-part3.codeschool.com/levels/2/challenges/3)


```javascript
var hidden = mystery(4);
var result  = hidden(2);

function mystery ( input ){
  var secret = 5;
  function mystery2 ( multiplier ) {
    multiplier *= input;
    return secret * multiplier;
  }
  return mystery2;
}
```
result is same as hidden(2), which is 40;

<table>
  <tbody>
    <tr>
      <th align="center">col1</th>
      <th align="center">col2</th>
      <th align="right">col3</th>
    </tr>
    <tr style="vertical-align:top;">
      <td>
        ```
        function mystery( input ){<br/>
        &nbsp;&nbsp;&nbsp;var secret = 5;<br/>
        &nbsp;&nbsp;&nbsp;function mystery2 ( multiplier ) {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;multiplier *= input;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;return secret * multiplier;<br/>
        &nbsp;&nbsp;&nbsp;}<br/>
        &nbsp;&nbsp;&nbsp;return mystery2;<br/>
        }
        ```
      </td>
      <td>multiplier is 2 <br/>input is 4 </td>
      <td>row 1 col 3</td>
    </tr>
    <tr>
      <td>row 2 col 1</td>
      <td>row 2 col 2</td>
      <td>row 2 col 3</td>
    </tr>
  </tbody>
</table>