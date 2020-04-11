---
layout: page
title: Skipgrams
---

<span class="marginnote">
  Reference:<br><a href="https://en.wikipedia.org/wiki/N-gram#Skip-gram">https://en.wikipedia.org/wiki/N-gram#Skip-gram</a>
</span>


The `tokenizers/skipgrams` module gather functions related to skipgrams computation.

Skipgrams are a variant of [ngrams]({{ site.baseurl }}/tokenizers/ngrams) that allows some tokens to be skipped, hence the name. It can be useful to enhance the relevance of some ngrams-related methods but it can become computationally expensive due to their combinatorial nature.

For instance, the famous [word2vec](https://en.wikipedia.org/wiki/Word2vec) embedding method sometimes relies on skipgrams.

Note that you will also find them called k-skip-n-grams. The most used types of skipgrams in the litterature are the 2-skip-bigrams and the 2-skip-trigrams.

```js
import skipgrams from 'talisman/tokenizers/skipgrams';

skipgrams(1, 2, 'abcd')
>>> ['ab', 'ac', 'bc', 'bd', 'cd']
```

*Arguments*

* **k** <code class="type">number</code> - number of elements to skip.
* **n** <code class="type">number</code> - size of the subsequences.
* **sequence** <code class="type">array</code> - the target sequence.
