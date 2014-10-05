  var request = require('request');
  var cheerio = require('cheerio');

  var item = "";
  var veganResult = "";
  var veganLink = "";
  var vegNamesArray = [];

  var url = 'https://simple.wikipedia.org/wiki/List_of_vegetables';
  request(url, function(err, resp, body){
      if (err)
          throw err;
      $ = cheerio.load(body);

      // var allVegNames = $('body div div div ul li a')[5];
      for (i = 0; i < 10; i++) {
        // vegNamesArray.push(allVegNames[i]['attribs']['title']);
        console.log($('body #mw-content-text ul li'));
        // console.log(allVegNames[i]['attribs']['href']);
      }

      // var resultsObj = [];

      // for (i in vegNamesArray) {
      //   item = vegNamesArray[i];
      //   if(item != undefined){
      //     resultsObj.push({
      //       item: item,
      //       isItVegan: "False"
      //     });
      //   }
      // };

    // Writing JSON to a file with node fs:
    // var fs = require('fs');
    // var outputFilename = '../scraping/veg.json';

    // fs.writeFile(outputFilename, JSON.stringify(resultsObj, null, 4), function(err) {
    //   if(err) {
    //     console.log(err);
    //   } else {
    //     console.log("JSON saved to " + outputFilename);
    //   }
    // });

  });