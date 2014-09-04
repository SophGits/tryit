  var request = require('request');
  var cheerio = require('cheerio');

  var item = "";
  var veganResult = "";
  var veganLink = "";
  var DairyNamesArray = [];

  var url = 'https://en.wikipedia.org/wiki/List_of_dairy_products';
  request(url, function(err, resp, body){
      if (err)
          throw err;
      $ = cheerio.load(body);

      var allDairyNames = $('table tr td a');
      for (i = 0; i < allDairyNames.length; i++) {
        DairyNamesArray.push(allDairyNames[i]['attribs']['title']);
        // console.log(allDairyNames[i]['attribs']['title']);
        // console.log(allDairyNames[i]['attribs']['href']);
      }

      var resultsObj = [];

      for (i in DairyNamesArray) {
        item = DairyNamesArray[i];
        if(item != undefined){
          resultsObj.push({
            item: item,
            isItVegan: "False"
          });
        }
      };

    // Writing JSON to a file with node fs:
    var fs = require('fs');
    var outputFilename = '../scraping/my-dairy.json';

    fs.writeFile(outputFilename, JSON.stringify(resultsObj, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
    });

  });