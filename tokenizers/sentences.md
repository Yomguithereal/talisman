---
layout: page
title: Sentences tokenizers
---

The `tokenizers/sentences` module gathers the library's various sentences tokenizers.

Sentences tokenizers take raw text and output a list of this text's sentences.

## Summary

* [naive](#naive)

<h2 id="naive">naive</h2>

<span class="marginnote">
  Author: <a href="https://github.com/Yomguithereal">Guillaume Plique</a>
</span>

This tokenizer is called "naive" because it relies only on regular expressions and some amount of exceptions' listing.

It should work approximately well in a majority of texts correctly written in Western European languages.

```js
import sentences from 'talisman/tokenizers/sentences';

sentences('Hello World! Goodbye everyone.');
>>> [
  'Hello World!',
  'Goodbye everyone.'
]
```

<div id="naive-mount"></div>

*Creating a tokenizer with custom exceptions*

The default tokenizer provided by the library has a limited knowledge of the exceptions you might encounter and only targets the English and to some extent the French language.

So, if what you need is to feed your own list of exceptions to the tokenizer, you can create a custom one very easily:

```js
import {createTokenizer} from 'talisman/tokenizers/sentences';

// Pass your exceptions without the '.'
const customExceptions = ['Sgt', 'M', 'Mr'];

const customTokenizer = createTokenizer({exceptions: customExceptions});

customTokenizer('Hello Sgt. Loyall. How are you?');
>>> [
  'Hello Sgt. Loyall',
  'How are you?'
]
```

<script src="{{ site.baseurl }}/assets/dist/tokenizers-sentences.js"></script>
