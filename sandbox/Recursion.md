### Recursion
##### Towers of Hanoi
* 3 posts: Source(s), Destination(d) and Auxillery(a)
* A set of discs of varying diameters (in the below example, three)
* Aim is to move the stack of discs from the Source post (where they are piled widest on the bottom to smallest on the top) one by one to another post, never placing a larger disc on a smaller disc.

###### Solution:
```javascript
var hanoi = function hanoi(disc, s, a, d){
  if(disc > 0){
    hanoi(disc-1, s, d, a);
    console.log("Move disc " + disc + " from " + s + " to " + d);
    hanoi(disc-1, a, s, d);
  }
};
hanoi(3, "Source", "Aux", "Destination");

> Results in:

Move disc 1 from Source to Destination VM118:5
Move disc 2 from Source to Aux VM118:5
Move disc 1 from Destination to Aux VM118:5
Move disc 3 from Source to Destination VM118:5
Move disc 1 from Aux to Source VM118:5
Move disc 2 from Aux to Destination VM118:5
Move disc 1 from Source to Destination
```