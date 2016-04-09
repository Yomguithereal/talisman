---
layout: page
title: Stats
---

The `stats` module compiles handy functions from frequencies computation to lexicometry utilities.

## Summary

* [frequencies](#frequencies)
* [ngrams](#ngrams)
* [tfidf](#tfidf)

<h2 id="frequencies">frequencies</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Frequency_(statistics)">https://en.wikipedia.org/wiki/Frequency_(statistics)</a>
</span>

This function takes a list and outputs the absolute frequencies of the contained items.

Alternatively, the same module exports a relative version of the function.

```js
import frequencies from 'talisman/stats/frequencies';
// Alternatively
import {absolute, relative} from 'talisman/stats/frequencies';

frequencies === relative

frequencies([1, 1, 2, 3, 3, 4, 4, 4]);
>>> {
  1: 2,
  2: 1,
  3: 2,
  4: 3
}

relative([1, 1, 2, 3, 3, 4, 4, 4]);
>>> {
  1: 0.25,
  2: 0.125,
  3: 0.25,
  4: 0.375
}
```

<h2 id="ngrams">ngrams</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/N-gram">https://en.wikipedia.org/wiki/N-gram</a>
</span>

n-grams are a sequence's subsequences of size n.

```js
import ngrams from 'talisman/stats/ngrams';
// Alternatively, you can use these convenient shortcuts
import {
  bigrams,
  trigrams,
  quadrigrams
} from 'talisman/stats/ngrams';

ngrams(2, ['The', 'cat', 'is', 'happy']);
>>> [
  ['The', 'cat'],
  ['cat', 'is'],
  ['is', 'happy']
]

trigrams(['The', 'cat', 'is', 'happy'])
>>> [
  ['The', 'cat', 'is'],
  ['cat', 'is', 'happy']
]
```

*Arguments*

* **n** <code class="type">number</code> - size of the subsequences.
* **sequence** <code class="type">array</code> - the target sequence.

<h2 id="tfidf">tfidf</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">https://en.wikipedia.org/wiki/Tf%E2%80%93idf</a>
</span>

This module exports a handy class fit to perform tf-idf calculations.

```js
import TfIdf from 'talisman/stats/tfidf';

// First you need to create a corpus
const corpus = new TfIdf();

// Then you can add named documents to it
corpus.addDocument(name, text);

// Getting the frequency of the given term in a given document
corpus.tf(term, name);

// Getting the frequency of the given term for every document
corpus.tf(term);

// Getting the inverse document frequency of the given term
corpus.idf(term);

// Getting the tf-idf metric of the given term in a given document
corpus.tfidf(term, name);

// Getting the tf-idf metric of the given term for every document
corpus.tfidf(term);
```
