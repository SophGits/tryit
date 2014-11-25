### About Promises
##### Taken from http://www.html5rocks.com/en/tutorials/es6/promises/#toc-async

JavaScript is single-threded, meaning two bits of script cannot run at the same time; they have to run one after another.

In browsers, JS shares a thread with other things, like painting, updating stylesm interacting with form controls. Activity in one of these things delays the others - JS has to get in the queue!

One way people get around this is using events and callbacks:

Events:
```
var yo = document.selector('.yo');

yo.addEventListener('load', function(){
  // woo, it loaded
});

yo.addEventListener('error', function(){
  // dammit, something's wrong
});
```
Here, we get yo (eg an image), add some listeners and then JavaScript stops executing until one of those listeners is called. But, the events might have happened before we started listening for them, so we need to use the property 'complete' that images have:

```
var yo = document.querySelector('.yo');

function loaded(){
  // woo, it loaded
}

if (yo.complete){
  loaded();
} else {
  yo.addEventListener('load', loaded);
}

yo.addEventListener('error', function(){
  // dammit, something's wrong
});
```

This doesn't catch images that errored before we had a chance to listen for them (the DOM doesn't let us do that). This gets more complicated when you want to know a whole set of images has loaded.

##### The disadvantage of events
Events are good for things that can happen multiple times on the same object - keyup, touchstart etc. With these, you don't really care about what happened before you attached the listener.

But when it comes to async success/failure, you want something like:

```
yo.callIfOrWhenLoaded(function(){
  //loaded
}).orIfFailedCallThis(function(){
  //failed
});

//and...:

whenAllHaveLoaded([yo, hihi]).callThis(function(){
  //all loaded
}).orIfSomeFailedCallThis(function(){
  // one or more failed
});
```

This is what promises do, but with better naming. Basically, they are a bit like event listeners, but:
* a promise can only succeed or fail once, and it can't switch from success to failure or vice versa.
* if a promise has succeeded or failed and you later add a success/failure callback, the correct callback will happen even though the event took place earlier.

This is great for async success/failure, because you're more interested in reacting to the outcome than you are in the exact time something became available.
