window.onload = function(){


  // Check ingredient against a regex
  function checkIngredients(items){
    var veganMatches = [];
    var nonVeganMatches = [];
    var nonMatches = [];

    var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/g;
    var regexMilks = /\s*(whole|semi-skimmed|semi-skim|skimmed|skim)\s*milk/;
    var regexMilk = /^\s*milk\s*$/g;

    function checkItem(item, regex){
      var matches = regex.test(item)
      if(matches){
        return true;
      }
      else{
        nonMatches.push(item);
        return false;
      }
    }

    var veganMappedItems = items.filter(function(item){
      return checkItem(item, regexVeganMilks);
    });
    var nonVeganMappedItems = nonMatches.filter(function(item){
      return checkItem(item, regexMilks);
      nonMatches = [];
    });
    // var milkMappedItems = items.filter(function(item){
    //   return checkItem(item, regexMilk);
    // });
    // console.log(veganMappedItems);
    // console.log(nonVeganMappedItems);
    // console.log(milkMappedItems);
    // console.log(nonMatches);

    $.each(items, function(index, item){

        var matchVeganMilks = regexVeganMilks.exec(item)
        var matchMilks = regexMilks.exec(item);
        var matchMilk = regexMilk.exec(item)

        if (matchVeganMilks != null){
          var match = matchVeganMilks["input"];
          veganMatches.push(match);
        }
        else if (matchMilks != null){
          var match = matchMilks["input"];
          nonVeganMatches.push(match);
        }
        else if (matchMilk != null){
          var match = matchMilk["input"];
          nonVeganMatches.push(match);
        }

    });
    listIngredients(veganMatches);
    listNonVeganIngredients(nonVeganMatches);
  }

  // List each ingredient under Results or Non-vegan
  function listIngredients(items){
    $.each(items, function(index, item){
      $(".results ol").append("<li>" + item + "</li>");
    });
  }
  function listNonVeganIngredients(items){
    $.each(items, function(index, item){
      $(".non-vegan-results ol").append("<li>" + item + "</li>");
    });
  }

  // On submit, call checkIgredients(inputs)
  $("form").on('submit', function(e){
    e.preventDefault();

    var userItems = $('textarea').val();
    format(userItems);

    function format(items){
      var itemsArray = items.toLowerCase().split(",");
      checkIngredients(itemsArray);
    }

  });
}



