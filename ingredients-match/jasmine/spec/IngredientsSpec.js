describe("Ingredients", function(){
  var item = "vegetable";


//  for this one, download and use the fixtures feature of the Jasmine extension from https://github.com/velesin/jasmine-jquery. You can test the outputted HTML.


  console.log(item);
  // describe("ItemIsVegan", function(){
  //   it("Tells you item is vegan", function(){
  //     var result =  checkIngredients([item]);

      // expect(result).toEqual();
      // <<<appended item on appropriate container>>>
  //   });
  });

  describe("showItems function", function(){
    it("Displays item in list", function(){
      var container = $('<ol></ol>');
      showItems([item], container);
      expect(container.text()).toEqual("vegetable");
    })
  });
})