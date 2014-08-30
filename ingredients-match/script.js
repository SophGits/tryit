window.onload = function(){


  // Check ingredient against a regex
  function checkIngredients(items){
    var veganMatches = [];
    var nonVeganMatches = [];
    var nonMatches = [];

    var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/g;
    var regexMilks = /\s*(whole|semi-skimmed|semi-skim|skimmed|skim)\s*milk/;
    var regexMilk = /^\s*milk\s*$/g;

    $.each(items, function(index, item){

        var matchVeganMilks = regexVeganMilks.test(item);
        var matchMilks = regexMilks.test(item);
        var matchMilk = regexMilk.test(item);

        switch (true){
          case matchVeganMilks:
            veganMatches.push(item);
            break;
          case matchMilks:
            nonVeganMatches.push(item);
            break;
          case matchMilk:
            nonVeganMatches.push(item);
            break;
          default:
            nonMatches.push(item);
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



