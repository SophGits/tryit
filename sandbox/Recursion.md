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

> Results in the following:

Move disc 1 from Source to Destination
Move disc 2 from Source to Aux
Move disc 1 from Destination to Aux
Move disc 3 from Source to Destination
Move disc 1 from Aux to Source
Move disc 2 from Aux to Destination
Move disc 1 from Source to Destination
```

###### Explanation:
* The second line of the if() statement above only becomes executed one the "base case" is found.
* The function is originally invoked with `hanoi(3, ...)`, which enters the if() statement (as the disc is greater than 0) and immediately gets its disc minus 1 called with the function again (with a and d switched round).
* So hanoi(2, ...) is called and the same thing happens (and, side note: a and d switch again)
* It happens again with 1 and this time when the hanoi() within the if() calls the outer hanoi() it passes 0.
* When disc = 0 it cannot pass into the if() statement, so we return our focus to the invocation which caused this to happen.
* So, move to the second line (finally) of the if() statement: console.log(Move disc 1 from Source to Destination).
* The third line of the if() statement is calling hanoi() again with a disc = 0, so that's effectively the end of that job...and once again we go 'up a level' to whatever called if(){hanoi(1, ...)} which is, of course, hanoi(2, ...).
* "Move disc 2..." is logged and we progress to line 3 of the if() statement.
*

Here's what happens when each of the hanoi()s occurs, relative to the original order of Source, Auxillery, Destination:


Outer/ inner1/ inner2| Source | Auxillery | Destination
--- | --- | --- | ---
Outer | S | A | D
Inner1 | S | D | A
Inner2 | A | S | D
