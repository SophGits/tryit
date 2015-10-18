### Errors

```javascript
  try {
      t % 6;
  }
  catch(err) {
      console.log("error is: ", err);
  }
  finally {
    console.log("Oh, well.");
  }
```


```javascript
  function UserException(message) {
     this.message = message;
     this.name = "UserException";
  }

  function getCatName(cat) {
     cat;
     if (cat !== "Charlie") {
        return cat + " is a great name.";
     } else {
        throw new UserException("BadNameForACat");
     }
  }
```