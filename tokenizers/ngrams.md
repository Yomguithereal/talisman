---
layout: page
title: Ngrams
---

<span class="marginnote">
  Reference:<br><a href="https://en.wikipedia.org/wiki/N-gram">https://en.wikipedia.org/wiki/N-gram</a>
</span>


The `tokenizers/ngrams` module gather functions used to compute ngrams from the given sequences.

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
