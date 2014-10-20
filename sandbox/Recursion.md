### Recursion
##### Towers of Hanoi
* 3 posts: Source(s), Destination(d) and Auxillery(a)
* A set of discs of varying diameters (in the below example, three)
* Aim is to move the stack of discs from the Source post (where they are piled widest on the bottom to smallest on the top) one by one to another post, never placing a larger disc on a smaller disc.

###### Solution:
```javascript
var hanoi = function hanoi(disc, s, a, d){ //move disc n from source to dest
  if(disc > 0){
    hanoi(disc-1, s, d, a); // move n-1 discs from source to aux, leaving the bigger one (above on dest)
    console.log("Move disc " + disc + " from " + s + " to " + d);
    hanoi(disc-1, a, s, d); // move n-1 discs from aux to dest, so they all sit on top of biggest disc, n
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
* Of the output above, the third line is the invocation of the third hanoi() - which is disc 2 -1.

Here's what happens when each of the hanoi()s occurs, relative to the original order of Source, Auxillery, Destination:


Outer/ inner1/ inner2| Source | Auxillery | Destination
--- | --- | --- | ---
Outer | S | A | D
Inner1 | S | D | A
Inner2 | A | S | D

Here's my (unfinished) attempt at the tree representation of this problem:
(Instead of including the log() bit, I've just said on the node what happens)

.
+-- hanoi(3 s-d)
|   +-- hanoi(2 s-a)
|   |   +-- hanoi(1 s-d)
|   |   |   +-- hanoi(0 end)
|   |   |   +-- hanoi(0 end)
|   |   +-- hanoi(1 a-d)
|   |   |   +-- hanoi(0 end)
|   |   |   +-- hanoi(0 end)
|   +-- hanoi(2 a-d)
|   |   +-- hanoi(1  )
|   |   |   +-- hanoi(0 end)
|   |   |   +-- hanoi(0 end)
|   |   +-- hanoi(1  )
|   |   |   +-- hanoi(0 end)
|   |   |   +-- hanoi(0 end)


##### Fibonacci
This might be a bit simpler.
Here is the sequence:

|nth position: | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9  | n   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---| --- |
| Fibonacci num: | 0   | 1   | 1   | 2   | 3   | 5   | 8   | 13  | 21 | n-1 + n-2 |


Here's the function:
```javascript
function fibonacci(n) {
   if (n < 2){
     return 1;
   }else{
     return fibonacci(n-1) + fibonacci(n-2);
   }
}

fibonacci(2); // 2
fibonacci(3); // 3
fibonacci(4); // 5

fibonacci(6); // 13
fibonacci(7); // 21
fibonacci(8); // 34
```

###### Explanation:
As you can see there's an if(n < 2). So, the base case is n == 1 (or 0).

* Call fibonacci(8)
* It's bigger than 2, so skip the if() and you get "return 8-1 + 8-2"
* As 8-2 is 6, you can imagine this is going to keep happening until you get below 2 and can access that if()
* So, when you get to 1 you can see 1 is returned
* Every time you call the function you're going working your way up to n from the base case, like so:

fibonacci(8) = 34. Here is what happens:

n=1: (where n-1 = 0 and n-2 is still <2 and therefore 1)

n=2: (where n-1 = 1 and n-2 = 0)  1 (returned)

n=3: (where n-1 = 2 and n-2 = 1)  1 + 1 = 2

n=4: (where n-1 = 3 and n-2 = 2)  2 + 1 = 3

n=5: (where n-1 = 4 and n-2 = 3)  3 + 2 = 5

n=6: (where n-1 = 5 and n-2 = 4)  8 + 5 = 13

n=7: (where n-1 = 6 and n-2 = 5)  13 + 8 = 21

n=8: (where n-1 = 7 and n-2 = 6)  21 + 13 = 34
