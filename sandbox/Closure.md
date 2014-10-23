### Closure

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
        function mystery ( input ){  <br/>
         &nbsp;&nbsp;var secret = 4;  <br/>
         &nbsp;&nbsp;input+=2;  <br/>
         &nbsp;&nbsp;function mystery2 ( multiplier ) {   <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;multiplier *= input;  <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;return secret * multiplier;  <br/>
          &nbsp;&nbsp;}  <br/>
          &nbsp;&nbsp;return mystery2;  <br/>
        }  <br/>
        function mystery3 ( param ){  <br/>
          &nbsp;&nbsp;function mystery4 ( bonus ){  <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;return param(6) + bonus;  <br/>
          &nbsp;&nbsp;}  <br/>
         &nbsp;&nbsp; return mystery4;  <br/>
        }
        <br/>
        <br/>
        var hidden = mystery(3);<br/>
        var jumble = mystery3(hidden);<br/>
        var result = jumble(2);<br/>
      </td>
      <td>
       result = jumble(2)<br />
       = mystery3(hidden)(2)<br />
       = mystery3( mystery(3) )(2)<br /><br />
       So bonus (within mystery4) = 2<br /><br />
       mystery3(param) is mystery3(hidden).<br />so hidden = param, <br/>and since hidden = mystery(3),<br/> param(6) = hidden(3)(6).<br/>So 6 is fed into mystery's internal function (ie multiplier = 6)<br />
      </td>
    </tr>
  </tbody>
</table>

So, here we input the values:

```javascript
function mystery ( input = 3 ){
  var secret = 4;
  input+=2;   // input = 3 + 2 = 5
  function mystery2 ( multiplier = 6 ) {  // param(6) -> multiplier = 6
    multiplier *= input;  // multiplier = 6 * 5 = 30
    return secret * multiplier;  // 4 * 30 = 120 = param(6)
  }
  return mystery2;
}
```
Then,

```javascript
function mystery3 ( param ){
  function mystery4 ( bonus = 2 ){
    return param(6) + bonus;    // 120 + 2 = 74
  }
  return mystery4;
}
```