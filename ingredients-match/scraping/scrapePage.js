  var request = require('request');
  var cheerio = require('cheerio');


  var item = "";

  var veganResult = "";
  var veganLink = "";
  var allFruitNamesArray = [];

  var url = 'https://en.wikipedia.org/wiki/List_of_culinary_fruits';
  request(url, function(err, resp, body) {
      if (err)
          throw err;
      $ = cheerio.load(body);

      var allFruitNames = $('ul li span');
      for (i = 0; i < allFruitNames.length; i++) {
        allFruitNamesArray.push(allFruitNames[i]['attribs']['id']);
      }

      var resultsObj = [];

      for (i in allFruitNamesArray) {
        item = allFruitNamesArray[i];

        var resultArray = ($("#" + item, 'li'));
        // itemLink = (resultArray[0]['next']['attribs']['href']);
        // need to sort this bit out so it doesn't give up once an entry has no href attr or is undefined
        if (resultArray.length > 0) {
          // veganLink = "https://en.wikipedia.org" + itemLink;
          veganResult = "true";
        } else {
          console.log("no-go");
          veganResult = "false";
        }
        console.log(item);
        console.log(veganResult);
        // console.log(veganLink);
        resultsObj.push({
          item: item,
          isItVegan: veganResult
          //, veganLink: veganLink
        });

      };

    // Writing JSON to a file with node fs:
    var fs = require('fs');
    var outputFilename = '../scraping/my.json';

    fs.writeFile(outputFilename, JSON.stringify(resultsObj, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
    });

  });




