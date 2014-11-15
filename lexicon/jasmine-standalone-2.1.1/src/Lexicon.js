// var src = new CommaSeparatedLexicon("lorem,ipsum,loREm,lorem,one");
// src.nextWord();


var CommaSeparatedLexicon = function( input ){
  var wordsArray = [];
  input
    .toLowerCase()
    .split(",")
    .map(function(word){
      word.trim();
      wordsArray.push(word);
    })
    console.log(wordsArray);

    var wordcount = 0;
    this.nextWord = function(){
      var nextword = wordsArray[wordcount];
      return nextword;
      wordcount ++;
    };

    this.top5Words = function(){
      var sortedWords = wordsArray.sort();
      var wordtocheck = "";
      var ocurrence = {};

      while(sortedWords.length > 0){
        wordtocheck = sortedWords.shift();
        if ( wordtocheck === sortedWords[0] && ocurrence[wordtocheck] == undefined){
          ocurrence[wordtocheck] = 2;
        } else if( wordtocheck === sortedWords[0] && ocurrence[wordtocheck] !== false){
          ocurrence[wordtocheck] ++;
        } else if( wordtocheck !== sortedWords[0] && !!ocurrence[wordtocheck] !== true){
          ocurrence[wordtocheck] = 1;
        } else if ( sortedWords.length == 0 ) {
          ocurrence[wordtocheck] ++;
        } else{
          // console.log("done");
        }
      }
      return ocurrence;
      // Works. Now just need to put it in order
    }

    this.top5Consonants = function(){
      // var letters = letters in wordsArray;
      // while letters != 'a' || 'e' || 'i' "" 'o' || 'u'
      // letters.countAll(consonant)
      // will need to either cycle through a list of consonants, or count each letter as it occurs and check it's not a consonant

      // String.prototype.countAll = function(letter){
      //   var letterCount = 0;
      //   for(var i = 0; i < this.length; i++){
      //     if (this.charAt(i).toLowerCase() == letter.toLowerCase()){
      //       letterCount ++;
      //     }
      //   }
      // return letterCount;
      // }

    }

    this.count = function(){
      return wordsArray.length;
    }

    this.run - function(){
      // see README
    }

}; //commaseparatedLexicon



