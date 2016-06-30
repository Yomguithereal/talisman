---
layout: page
title: Tfidf
---

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">https://en.wikipedia.org/wiki/Tf%E2%80%93idf</a>
</span>

The `stats/tfidf` module exports a handy class fit to perform tf-idf calculations.

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
