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
  var jsonArray = [];

  // using the /g flag means you keep track of something you've already matched and may not match the same item all the time
  // var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/g;
  var regexVeganMilks = /\s*(coconut|soy|soya)\s*milk\s*/;
  var regexMilks = /\s*(whole|semi-skimmed|semi-skim|skimmed|skim)\s*milk/;
  var regexMilk = /^\s*milk\s*$/;

  $.each(items, function(index, item){

    // for scraped data
    $.getJSON( "scraping/my.json", function(data){
      $.each(data, function(i, datum){
        jsonArray.push(datum['item']);
      });
    });

    temp = false;
    var checkJson = function(item){
      for(i = 0; i < jsonArray.length; i++){
        if(jsonArray[i]['item'] == item){
          temp = true;
          // console.log("Yes here, at index " + i + ": " + jsonArray[i]['item'] + "! And var temp = " + temp);
          break;
        } else {
          temp = false;
          // console.log("Not here, at index " + i + ", which is " + jsonArray[i]['item'] + " And var temp = " + temp);
        }
      };
      // it needs to return true here to work
    }

    var matchesJson = checkJson(item); // when this is true it works!
    matchesJson = temp;
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
        case matchesJson:
          veganMatches.push(item);
          break;
        default:
          nonMatches.push(item);
      }

    });
    showItems(veganMatches, $(".results ol"));
    showItems(nonVeganMatches, $(".non-vegan-results ol"));
    showItems(nonMatches, $(".non-match-results ol"));
}
