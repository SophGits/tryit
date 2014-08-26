window.onload = function(){


  // Check ingredient against a regex
  function checkIngredients(items){
    $.each(items, function(index, item){

      // match for "milk"
      var matchMilk = /(milk)/g.exec(item)
      if (matchMilk != null){
        var match = matchMilk["input"];
        // eg "milkman" or "milk" or "coconut milk"
      }

    });
  }

  // List each ingredient under Results
  function listIngredients(items){
    $.each(items, function(index, item){
      $(".results ol").append("<li>" + item + "</li>");
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



