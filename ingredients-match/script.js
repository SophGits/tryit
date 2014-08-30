window.onload = function(){


  // Check ingredient against a regex
  function checkIngredients(items){
    var veganMatches = [];
    var nonVeganMatches = [];

    $.each(items, function(index, item){

        // match for coconut milk
        var matchVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/g.exec(item)
        //match for skimmed milk
        var matchMilks = /\s*(whole|semi-skimmed|semi-skim|skimmed|skim)\s*milk/.exec(item);
        // match for "milk" on its own
        var matchMilk = /^\s*milk\s*$/g.exec(item)

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

  // On submit, call checkIgresients(inputs)
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



