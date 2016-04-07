---
layout: page
title: Phonetics
---

The `phonetics` module aims at gathering various algorithms whose goal is to produce an approximative phonetic representation of the given strings.

## Summary

Modules under the `talisman/phonetics` namespace:

* [metaphone](#metaphone)
* [soundex](#soundex)

<h2 id="metaphone">metaphone</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Metaphone">https://en.wikipedia.org/wiki/Metaphone</a>
</span>

The metaphone algorithm, created in 1990 by Lawrence Philips, is a phonetic algorithm working on dictionary words (rather than only processing names, as phonetic algorithms usually do).

Note also that the algorithm will not truncate the given word to output a codex limited to a specific number of letters.

Today, however, we often prefer to use the "improved" version of the algorithm called the [double metaphone](#double-metaphone).

```js
import metaphone from 'talisman/phonetics/metaphone';

metaphone('Michael');
>>> 'MXL'
```

<div id="metaphone-mount"></div>

<h2 id="soundex">soundex</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Soundex">https://en.wikipedia.org/wiki/Soundex</a>
</span>

The Soundex algorithm, created by Robert Russell and Margaret Odell, is often considered to be the first phonetic algorithm in history.

Note that it aims at matching anglo-saxons names and won't work well on dictionary words.

```js
import soundex from 'talisman/phonetics/soundex';

soundex('Michael');
>>> 'M240'
```

<div id="soundex-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics.js"></script>
