### Refactoring the "Repeated reassignment" code smell

```javascript
data = this.appendAnalyticsData(data);
data = this.appendSubmissionData(data);
data = this.appendAdditionalInputs(data);
data = this.pruneObject(data);
```

#### Can do...
##### Nested function calls
```javascript
data = this.pruneObject(
  this.appendAdditionalInputs(
    this.appendSubmissionData(
      this.appendAnalyticsData(data) // does this first
    )
  )
);
```
##### forEach
```javascript
var funcs = [
  this.appendAnalyticsData,
  this.appendSubmissionData,
  this.appendAdditionalInputs,
  this.pruneObject
];

funcs.forEach(function(func) {
  data = func(data);
});
```
##### Reduce
```javascript
var funcs = [
  this.appendAnalyticsData,
  this.appendSubmissionData,
  this.appendAdditionalInputs,
  this.pruneObject
];

data = funcs.reduce(function(memo, func) {
  return func(memo);
}, data);
```