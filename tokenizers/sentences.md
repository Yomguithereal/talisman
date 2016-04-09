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
import naive from 'talisman/tokenizers/sentences/naive';

naive('Hello World! Goodbye everyone.');
>>> [
  'Hello World!',
  'Goodbye everyone.'
]

// You can also add some exceptions to the regular ones such as Mr. etc.
naive('Hello World! I am Lt. Harrington.', ['Lt.', 'Capt.']);
>>> [
  'Hello World!',
  'I am Lt. Harrington.'
]
```

*arguments*

* **text** <code class="type">string</code> - raw text to tokenize.
* **[exceptions]** <code class="type">array</code> - list of additional exceptions.

<div id="naive-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/sentences-tokenizers.js"></script>
