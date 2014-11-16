## Background

A `Lexicon` is a source of words. You can get words from it by calling the `nextWord` method.

It keeps analytical information of each word that it has seen.

## Example

There are several potential sources for the words. In this example we assume that the word source has been initialised with the following string: `"lorem,ipsum,ipsum"`

```javascript
src = new CommaSeparatedLexicon("lorem,ipsum,ipsum");
src.nextWord();
  // => "lorem"
src.nextWord();
  // => "ipsum"
src.nextWord();
  // => "ipsum"
src.nextWord();
  // => null
src.top5Words();
  // => ["ipsum","lorem",null,null,null]
src.top5Consonants();
  // => ["m","p","s","l","r"]
src.count();
  // => 3 (total words seen)
```

### Run method

```javascript
src = new CommaSeparatedLexicon("lorem,ipsum,ipsum");
// This will run until there are no more words for the source implementation.
src.run();
// => true
```

## Assignment

1. Implement `CommaSeparatedLexicon`, including all methods listed above;
2. Add callbacks on specific words e.g. every time "semper" is encountered, call those callbacks registered for "semper";
3. Implement a Lexicon that uses the twitter API (instead of loading words from a file).