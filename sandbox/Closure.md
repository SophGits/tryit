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
      <td>multiplier is 2 <br/>input is 4 <br />
      result is same as hidden(2), which is 40;
      </td>
    </tr>
  </tbody>
</table>