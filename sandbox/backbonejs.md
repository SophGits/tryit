### Backbone notes

The jQuery method:
`$('#todo-view').html();`
but `el` is a DOM element, so you can use:
`$(todoView.el).html();`
...but there's a shortcut for it:
`todoView.$el.html();`
This last one is the best because we may not know what the `$el`'s id will be - id could be constructed dynamically.


##### Best practice
It is recommended in the Backbone documentation to insert all models when the page is generated on the server side, rather than fetching them from the client side once the page is loaded.

In the collection view, add a listener on the reset event. We need to do this since the fetching of models is asynchronous and happens after the page is rendered.
