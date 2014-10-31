### Backbone notes

The jQuery method:
`$('#todo-view').html();`
but `el` is a DOM element, so you can use:
`$(todoView.el).html();`
...but there's a shortcut for it:
`todoView.$el.html();`
This last one is the best because we may not know what the `$el`'s id will be - id could be constructed dynamically.
