---
layout: page
title: Words tokenizers
---

The `tokenizers/words` module gathers the library's various words tokenizers.

Words tokenizers take raw text and output a list of this text's words.

## Summary

* [gersam](#gersam)
* [naive](#naive)
* [treebank](#treebank)


<h2 id="gersam">gersam</h2>

<span class="marginnote">
  Reference: <a href="http://www.statmt.org/moses/">http://www.statmt.org/moses/</a>
</span>

This heuristic word tokenizer is inspired by the Moses machine translation system's one. It supports a lot of languages and is able to handle many tricky cases.

Gersam is the Latin name of Moses' firstborn child.

```js
import words from 'talisman/tokenizers/gersam';

gersam('en', 'Hello World!');
>>> ['Hello', 'World', '!']
```

*Arguments*

* **lang** <span class="type">string</span>: target language in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
* **text** <span class="type">string</span>: text to tokenize.

*English version*

<div id="en-gersam-mount"></div>

*French version*

<div id="fr-gersam-mount"></div>

<h2 id="naive">naive</h2>

<span class="marginnote">
  Reference: <a href="https://lodash.com/">https://lodash.com/</a>
</span>

This words tokenizer is actually lodash's [words](https://lodash.com/docs#words) function re-exported for convenience.

It's quite robust and works in a lot of simple cases.

```js
import words from 'talisman/tokenizers/words';

words('Hello World!');
>>> ['Hello', 'World']
```

<div id="naive-mount"></div>

<h2 id="treebank">treebank</h2>

<span class="marginnote">
  Reference: <a href="http://www.cis.upenn.edu/~treebank/tokenizer.sed">http://www.cis.upenn.edu/~treebank/tokenizer.sed</a>
</span>

This words tokenizer is one of the most popular regular expression tokenizers for the English language.

It is able to split expressions such as *isn't* into two proper tokens.

Note that it won't strip punctuation and keep it as tokens.

```js
import treebank from 'talisman/tokenizers/words/treebank';

treebank("It wasn't me!");
>>> ['It', 'was', 'n\'t', 'me', '!']
```

<div id="treebank-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/tokenizers-words.js"></script>
