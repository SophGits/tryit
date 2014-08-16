$(document).ready(function(){
  var c = $("#highlight").val(); // raw code

  // regex
  // highlighting special characters: /, *, + are escaped using a backslash
  // g replaces all occurences of the match
  // $1 is a back-reference to the parenthesised part of the match
  c = c.replace(/(=|%|\/|\*|-|,|;|\+|<|>)/g, "<span class=\"sc\">$1</span>");

  //  Strings - text inside single quotes and backticks
  c = c.replace("/(['`].*?['`])/g", "<span class=\"string\">$1</span>");

  //  Numbers - same colour as strings
  c = c.replace(/(\d+)/g, "<span class=\"string\">$1</span>");

  // Functions - any string followed by a '('
  c = c.replace(/(\w*?)\(/g, "<span class=\"function\">$1</span>(");

  // Brackets - same as special characters
  c = c.replace(/([\(\)])/g, "<span class=\"sc\">$1</span>");


  $("#layer").html(c); // injecting code into <pre></pre>
})