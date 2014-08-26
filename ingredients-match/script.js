window.onload = function(){


  // Check ingredient against a regex
  function checkIngredients(items){
    veganMatches =[];
    nonVeganMatches = [];

    $.each(items, function(index, item){

        // match for coconut milk
        var matchCoconutMilk = /\s*coconut\s*milk\s*/g.exec(item)
        //match for skimmed milk
        var matchSkimmedMilk = /\s*(skimmed|skim)\s*milk/.exec(item);
        // match for "milk" on its own
        var matchMilk = /^\s*milk\s*$/g.exec(item)

        if (matchCoconutMilk != null){
          var match = matchCoconutMilk["input"];
          veganMatches.push(match);
          // console.log(veganMatches)
        }
        else if (matchSkimmedMilk != null){
          var match = matchSkimmedMilk["input"];
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

  // On submit, call checkItems(inputs)
  $("form").on('submit', function(e){
    e.preventDefault();

    userItems = $('textarea').val();
    format(userItems);

    function format(items){
      var itemsArray = items.toLowerCase().split(",");
      checkIngredients(itemsArray);
    }

  });
}



