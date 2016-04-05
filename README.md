[![Build Status](https://travis-ci.org/Yomguithereal/talisman.svg)](https://travis-ci.org/Yomguithereal/talisman)

# Talisman

[Documentation](http://yomguithereal.github.io/talisman/)

Talisman is a JavaScript library collecting series of algorithms related to the three following domains:

* [Fuzzy logic & fuzzy matching](https://en.wikipedia.org/wiki/Approximate_string_matching)
* [Natural Language Processing (NLP)](https://en.wikipedia.org/wiki/Natural_language_processing)
* [Machine learning](https://en.wikipedia.org/wiki/Machine_learning)

## Goals

**Modularity**

Talisman aims at being completely modular. This means that if you only need to compute a `levenshtein` distance, you will only load the relevant code.

```js
var levenshtein = require('talisman/metrics/levenshtein');

levenshtein('book', 'back');
>>> 2
```

**Straightforward & simple**

Just want to compute a jaccard index? No need to instantiate a class and use two methods to pass options and then finally succeed in getting the index.

Just apply the `jaccard` function and get going.

Plus, the library's API is fully consistent and one should not struggle to understand how to apply two different distance metrics.

**Functional**

Except for cases where classes might be useful (classifiers notably), **Talisman** only uses functions, only consumes raw data and will order functions' arguments to make partial application & currying etc. as easy as possible.

**Performant**

**Talisman** should be as performant as possible for a high-level programming language library.

**Cross-platform**

**Talisman** is cross-platform and can be used both on node.js and in the browser.

## Installation

You can install **Talisman** through npm:

```js
npm install talisman
```

## Documentation

The library's full documentation can be found [here](http://yomguithereal.github.io/talisman/).

## License

[MIT](./LICENSE.txt)

---

## Current modules

* clustering
  * k-means
* helpers
  * vectors
* metrics
  * cosine
  * dice
  * euclidean
  * hamming
  * jaccard
  * jaro
  * jaro-winkler
  * levenshtein
  * manhattan
  * mra
  * overlap
  * sorensen
  * tversky
* phonetics
  * caverphone
  * cologne
  * doubleMetaphone
  * metaphone
  * mra
  * nysiis
  * soundex
* regex
  * classes
* stats
  * frequencies
  * ngrams
  * tfidf
* stemmers
  * lancaster
  * lovins
  * porter
  * latin
    * schinke
* tokenizers
  * sentences
    * naive
  * words
    * naive
    * treebank
