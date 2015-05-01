### Options: Instead of redefining 'this'

```javascript
function Person() {
  this.teeth = [{ clean: false }, { clean: false }, { clean: false }];
};

Person.prototype.brush = function() {
  var that = this; // Code smell

  this.teeth.forEach(function(tooth) {
    that.clean(tooth); // that. Code smell.
  });

  console.log('brushed');
};

Person.prototype.clean = function(tooth) {
  tooth.clean = true;
}

var person = new Person();
person.brush();
console.log(person.teeth);
```

##### Alternative to code smell of redefining 'this'

###### 1. Bind(this)
```javascript
Person.prototype.brush = function() {
  this.teeth.forEach(function(tooth) {
    this.clean(tooth);
  }.bind(this));

  console.log('brushed');
};
```
###### 2. Second parameter of forEach
```javascript
Person.prototype.brush = function() {
  this.teeth.forEach(function(tooth) {
    this.clean(tooth);
  }, this);

  console.log('brushed');
};
```
###### 3. ES6
```javascript
Person.prototype.brush = function() {
  this.teeth.forEach(tooth => {
    this.clean(tooth);
  });

  console.log('brushed');
};
```

###### 4. Functional programming
###### a)
```javascript
Person.prototype.brush = function() {
  this.teeth.forEach(this.clean);

  console.log('brushed');
};
```
###### b)
```javascript
Person.prototype.brush = function() {
  this.teeth.forEach(this.clean.bind(this));

  console.log('brushed');
};
```