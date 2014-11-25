(function ($) {
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

})(jQuery);