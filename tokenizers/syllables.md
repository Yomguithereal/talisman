---
layout: page
title: Syllables tokenizers
---

The `tokenizers/syllables` module gathers the library's various syllables tokenizers.

Syllable tokenizer take raw words or sometimes their phonetic representation and output a list of syllables.

## Summary

* [legalipy](#legalipy)

<h2 id="legalipy">legalipy</h2>

<span class="marginnote">
  Reference: <a href="https://github.com/henchc/LegaliPy">https://github.com/henchc/LegaliPy</a><br><br>
</span>

<span class="marginnote">
  Author: <a href="https://github.com/henchc">Christopher Hench (UC Berkeley)</a>
</span>

Legalipy is a language-independent syllables tokenizer based on the **Onset Maximisation Principle** (or principle of legality, hence the name).

It has to be trained with a sufficiently large corpus of text from a given language before being able to tokenize syllables from word.

```js
// WIP
```

<div id="legalipy-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/tokenizers-syllables.js"></script>
