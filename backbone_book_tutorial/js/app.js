(function ($) {
  var books = [{title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"},
          {title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript Programming"},
          {title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala Programming"},
          {title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel Splatter"},
          {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"}]

    // BOOK MODEL
    var Book = Backbone.Model.extend({
        defaults:{
            coverImage:"img/placeholder.gif",
            title:"Some title",
            author:"John Doe",
            releaseDate:"2012",
            keywords:"JavaScript Programming"
        }
    });
    // BOOK VIEW
    var BookView = Backbone.View.extend({
      tagName: "div",
      className: "bookContainer",
      template: $("#bookTemplate").html(),

      render: function(){
        var tmpl = _.template(this.template); //tmpl is a fn that takes a JSON object and returns HTML

        this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. Use $el to access the jQuery html() fn
        return this;
      }
    });
    // NEW BOOK MODEL INSTANCE
    var book = new Book({
      title: "Some title",
      author: "John Doe",
      ReleaseDate: "2012",
      keywords: "JavaScript Programming"
    });
    // NEW BOOK VIEW INSTANCE
    bookView = new BookView({
      model: book
    });
    // BOOK COLLECTION
    var Library = Backbone.Collection.extend({
        model:Book
    });
    //COLLECTION VIEW
    var LibraryView = Backbone.View.extend({
      el: $("#books"),
      // a view can take a tagName or an el. When using tagName the view will create the element for us (and we are responsibe for inserting it into the page). By using el we are specifying an existing element and the view will write it in where it already is on the page.
      initialize: function(){
      // initialize is optional but must contain a function - which will be called by Backbone when a view constructor is called.
      // the render means as soon as we call the LibraryView constructor it will get rendered, so this is a self rendering view. We don’t have to make it self rendered but it is common practice.
        this.collection = new Library(books);
        // Above: Library is a collection that expects an array of objects that it can use to create Book models. The books are defined at the top of this page.
        this.render();
      },
      // Below, we are iterating over all the models (Books) in our collection. The first argument to “each” is the array that will be iterated over. The second argument is the function that will be applied to each member of the array. The function in our case calls the renderBook function with the current model as argument. We need to use “that” to get this right since if we would have used “this” it would have referenced the function itself.
      render: function(){
        var that = this;
        _.each(this.collection.models, function(item){
          that.renderBook(item);
        }, this); // 'this' is the context it is rendering in
      },
      // Next we define renderBook, which takes a model (a Book) as argument and uses it to create a BookView. The bookView is then rendered and appended to the view container as specified in our el property (on line 02 of this fn).
      renderBook: function(item){
        var bookView = new BookView({
          model: item
        });
        this.$el.append(bookView.render().el);
      }
    })

})(jQuery);