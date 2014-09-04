window.Ingredients = {};

window.onload = function(){
  // for scraped data
  Ingredients.jsonArray = [];
  Ingredients.nonVeganJsonArray = [];

  var jsonFilesVegan = ['scraping/my.json'];
  $.each(jsonFilesVegan, function(i, file){
    $.getJSON( file, function(data){
      $.each(data, function(i, datum){
        Ingredients.jsonArray.push(datum['item']);
      });
    });
  });
  var jsonFilesNonVegan = ['scraping/my-dairy.json'];
  $.each(jsonFilesNonVegan, function(i, file){
    $.getJSON( file, function(data){
      $.each(data, function(i, datum){
       // console.log(datum['item'].toLowerCase());
        var item = datum['item'].toLowerCase();
        Ingredients.nonVeganJsonArray.push(item);
      });
    });
  });

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
    container.html('');
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
  var regexArrayNonVegan = [/^\s*milk\s*$/, /^\s*lactose\s*$/]

  $.each(items, function(index, item){

    var checkJson = function(item){
    temp = false;
      for(i = 0; i < Ingredients.jsonArray.length; i++){
        if(Ingredients.jsonArray[i] == item){
          temp = true;
          break;
        } else {
          temp = false;
        }
      };
      return temp; // it needs to return true here to work
    }

    var checkNonVeganJson = function(item){
    temp = false;
      for(i = 0; i < Ingredients.nonVeganJsonArray.length; i++){
        if(Ingredients.nonVeganJsonArray[i] == item){
          temp = true;
          break;
        } else {
          temp = false;
        }
      };
      return temp; // it needs to return true here to work
    }

    var matchesJson = checkJson(item); // when this is true it works!
    var matchesNonVeganJson = checkNonVeganJson(item);

    // these must be inside the .each because .test behaves unusually otherwise!
    var matchVeganMilks = regexVeganMilks.test(item);
    var matchMilks = regexMilks.test(item);
    var matchNonVeganRegex = function(item){
        return regexArrayNonVegan.some(function(regex){
          return regex.test(item);
        });
      };

      switch (true){
        case matchVeganMilks:
          veganMatches.push(item);
          break;
        case matchMilks:
          nonVeganMatches.push(item);
          break;
        case matchNonVeganRegex(item):
          nonVeganMatches.push(item);
          break;
        case matchesJson:
          veganMatches.push(item);
          break;
        case matchesNonVeganJson:
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
