describe("Lexicon", function(){

  var testSrc;

  beforeEach(function() {
    testSrc = new CommaSeparatedLexicon("one,two,three,four,four");
  });

  it("should show me the next word", function() {
    expect(testSrc.nextWord()).toEqual("one");
  });

  it("should list frequencies of words", function() {
    expect(testSrc.top5Words()).toEqual({"four": 2, "one": 1, "three": 1, "two": 1});
  });

  it("should return lexicon length", function(){
    expect(testSrc.count()).toEqual(5);
  })

});
