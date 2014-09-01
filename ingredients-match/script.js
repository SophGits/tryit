window.onload = function(){
  // On submit, call checkIgredients(inputs)
  $("form").on('submit', function(e){
    e.preventDefault();

    var userItems = $('textarea').val();
    format(userItems);
  });
}


function format(items){
  var itemsArray = items
    .toLowerCase()
    .split(",")
    .map(function(item) {
      return item.trim();
    });
    itemsArray = $.unique(itemsArray);
  checkIngredients(itemsArray);
}

function showItems(items, container){
  $.each(items, function(index, item){
    container.append("<li>" + item + "</li>");
  });
}

// Check ingredient against a regex
function checkIngredients(items){
  var veganMatches = [];
  var nonVeganMatches = [];
  var nonMatches = [];

  // using the /g flag means you keep track of something you've already matched and may not match the same item all the time
  // var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/g;
  var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/;
  var regexMilks = /\s*(whole|semi-skimmed|semi-skim|skimmed|skim)\s*milk/;
  var regexMilk = /^\s*milk\s*$/;

  $.each(items, function(index, item){


  // these must be inside the .each because .test behaves unusually otherwise!
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
  showItems(veganMatches, $(".results ol"));
  showItems(nonVeganMatches, $(".non-vegan-results ol"));
  showItems(nonMatches, $(".non-match-results ol"));
}



