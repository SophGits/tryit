$(document).ready(function(){
  // reserved mysql.keywords:
  var k = ["AND", "AS", "ASC", "BETWEEN", "BY", "CASE", "CURRENT_DATE", "CURRENT_TIME", "DELETE", "DESC", "DISTINCT", "EACH", "ELSE", "ELSEIF", "FALSE", "FOR", "FROM", "GROUP", "HAVING", "IF", "IN", "INSERT", "INTERVAL", "INTO", "IS", "JOIN", "KEY", "KEYS", "LEFT", "LIKE", "LIMIT", "MATCH", "NOT", "NULL", "ON", "OPTION", "OR", "ORDER", "OUT", "OUTER", "REPLACE", "RIGHT", "SELECT", "SET", "TABLE", "THEN", "TO", "TRUE", "UPDATE", "VALUES", "WHEN", "WHERE"];
  var len = k.length;
  for(var i=0; i<len; i++){
    k.push(k[i].toLowerCase());
  }

  var re;
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

  // Reserved mysql.keywords
  for(var i=0; i<k.length; i++){
    // replace function does not accept a string as a regex pattern, so use a regex object:
    re = new RegExp("\\b"+k[i]+"\\b", "g");
    c = c.replace(re, "<span class=\"keyword\">"+k[i]+"</span>");
  }

  //  Comments
    //  - those starting with a #:
  c = c.replace(/(#.*?\n)/g, "<span class=\"comment\">$1</span>");
    // - those starting with '-- '
    // first, remove spans applied to each of the '-' as a special character
  c = c.replace(/<span class=\"sc\">-<\/span><span class=\"sc\">-<\/span>/g, "--");
  c = c.replace(/(-- .*?\n)/g, "<span class=\"comment\">$1</span>");

    // - those inside /*...*/
    // filtering out spans attached to /* and */ as special characters
  c = c.replace(/<span class=\"sc\">\/<\/span><span class=\"sc\">\*<\/span>/g, "/*");
  c = c.replace(/<span class=\"sc\">\*<\/span><span class=\"sc\">\/<\/span>/g, "*/");
    // in JS the dot operator cannot match newlines, so use [\s\S] as a hack to select everything (space or non-space characters)
  c = c.replace(/(\/\*[\s\S]*?\*\/)/g, "<span class=\"comment\">$1</span>");


  $("#layer").html(c); // injecting code into <pre></pre>

  //  Keywords inside comments
  // Create a filter function to remove spans, and use it in .replace() instead of replacement strings
  function clear_spans(match){
    match = match.replace(/<span.*?>/g, "");
    match = match.replace(/<\/span>/g, "");
    return "<span class=\"comment\">"+match+"</span>";
  }

})