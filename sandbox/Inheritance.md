### Overriding prototypal properties
##### Never override a property in the Object prototypal level
##### Just do it here with valueOf()
```javascript
Apple.prototype.valueOf = function(){
  var sum = 0;
  for(var i=0; i < this.varieties.length; i++){
    sum += this.varieties[i][2];
  }
  return sum;
}
basket.valueOf();
> 5
```
> If you then add a new variety the number you get back will be updated, as the types array was passed in by *reference*.

```javascript
types.push(["Golden Delicious", "yellow", 1]);
basket.valueOf();
> 6
```
```javascript
basket.constructor.prototype
```
> Apple {valueOf: function}
or can use:  ```basket.__proto__;```
> use this to go "up" one in the object hierarchy (basket > Apple > Object > null)

---

#### [Useful blogpost by Alex Sexton](https://alexsexton.com/blog/2013/04/understanding-javascript-inheritance/) (see final code block)
