$(document).ready(function(){
  var c = $("#highlight").val(); // raw code

  // regex
  // highlighting special characters: /, *, + are escaped using a backslash
  // g replaces all occurences of the match
  // $1 is a back-reference to the parenthesised part of the match
  c = c.replace(/(=|%|\/|\*|-|,|;|\+|<|>)/g, "<span class=\|sc\">$1</span>");

  $("#layer").html(c); // injecting code into <pre></pre>
})