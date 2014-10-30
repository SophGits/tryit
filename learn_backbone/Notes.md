### MVC (in the Backbone context)

##### Model:
Contains the interactive data and the logic, such as data validation, getters and setters, default values, data initialization, conversions and so on.

###### Collections:
Ordered sets of models, where you can get and set models in the collection, listen for events when any element in the collection changes, and fetch a model’s data from the server.

Collections allow us to save data (in database, file, memory), and require a reference to it. Therefore, you need to specify the url parameter with a relative url, where the model’s resource would be located on the server.

We are going to use HTML5’s local storage for persistence through (see index.html). So, we need to define the localStorage property instead of URL.


##### View:
Views doesn’t have the HTML markup for our application; instead they process data (like the controller in MVC frameworks).


### Trying things out in the console

// Model
var todo = new app.Todo({title: 'Learn Backbone.js', completed: false});
todo.get('title'); // "Learn Backbone.js"
todo.get('completed'); // false
todo.get('created_at'); // undefined
todo.set('created_at', Date());
todo.get('created_at'); // "Wed Sep 12 2012 12:51:17 GMT-0400 (EDT)"

//Collection
var todoList = new app.TodoList()
todoList.create({title: 'Learn Backbone\'s Collection'}); // NB: `completed` will be set to false by default.
var lmodel = new app.Todo({title: 'Learn Models', completed: true});
todoList.add(lmodel);
todoList.pluck('title');     // ["Learn Backbone's Collection", "Learn Models"]
todoList.pluck('completed'); // [false, true]
JSON.stringify(todoList);    // "[{"title":"Learn Backbone's Collection","completed":false,"id":"d9763e99-2267-75f5-62c3-9d7e40742aa6"},{"title":"Learn Models","completed":true}]"