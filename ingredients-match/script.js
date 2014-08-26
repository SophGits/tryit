window.onload = function(){

  // Lists each ingredient under Results
  function checkIngredients(items){
    // console.log(items);
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



