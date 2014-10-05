// Constructor function for ingredients object ("class")
window.Ingredients = function(){
  // for scraped data
  this.jsonArray = [];
  this.nonVeganJsonArray = [];
};

Ingredients.prototype = {
  get: function(filename, ingredientsContainer){
    var request = $.getJSON(filename);
    request.success(function(data){
      $.each(data, function(i, datum){
        if (datum['item']) {
          ingredientsContainer.push(datum['item'].toLowerCase());
        }
      });
    });
  }
}

var ingredients = new Ingredients();

window.onload = function(){

  var jsonFilesVegan = ['scraping/my.json'];
  var jsonFilesNonVegan = ['scraping/my-dairy.json'];

  ingredients.get(jsonFilesVegan, ingredients.jsonArray);
  ingredients.get(jsonFilesNonVegan, ingredients.nonVeganJsonArray);


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



// Check ingredient against a regex
function checkIngredients(items){
  var veganMatches = [];
  var nonVeganMatches = [];
  var nonMatches = [];

  // using the /g flag means you keep track of something you've already matched and may not match the same item all the time
  // var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/g;
  var regexPercentage = /\s*(\((100(?:\.0{1,2})? | 0*?\.\d{1,2} | \d{1,2}(?:\.\d{1,2}))\))?\s*/;
  var regexVeganMilks = new RegExp((/\s*(coconut|soy|soya)\s*milk\s*/).source + regexPercentage.source);
  var regexMilks = new RegExp((/\s*(whole|semi-skimmed|semi-skim|skimmed|skim)\s*milk/).source + regexPercentage.source);
  var regexArrayNV = [/^\s*milk\s*$/, /^\s*lactose\s*$/];
  var regexArrayNonVegan = $.map(regexArrayNV, function (val, i){
    return new RegExp(val.source + regexPercentage.source);
  })
  // var regexMilksWithPercentage = new RegExp(regexMilks.source + regexPercentage.source);

  $.each(items, function(index, item){

    var checkJson = function(item){
    temp = false;
      for(i = 0; i < ingredients.jsonArray.length; i++){
        if(ingredients.jsonArray[i] == item){
          temp = true;
          break;
        } else {
          temp = false;
        }
      };
      return temp; // it needs to return true here to work. (It does now work)
    }

    var checkNonVeganJson = function(item){
    temp = false;
      for(i = 0; i < ingredients.nonVeganJsonArray.length; i++){
        if(ingredients.nonVeganJsonArray[i] == item){
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
    // var matchMilksWithPercentage = regexMilksWithPercentage.test(item);

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
        case matchMilks:
          nonVeganMatches.push(item);
        default:
          nonMatches.push(item);
      }

    });
    showItems(veganMatches, $(".results ol"));
    showItems(nonVeganMatches, $(".non-vegan-results ol"));
    showItems(nonMatches, $(".non-match-results ol"));
}
