---
layout: page
title: Spanish Phonetic Algorithms
---

The `phonetics/spanish` module gathers phonetic algorithms for the Spanish language.

## Summary

Modules under the `talisman/phonetics/spanish` namespace:

* [fonetico](#fonetico)

<h2 id="fonetico">fonetico</h2>

<span class="marginnote">
  Author: <a href="https://github.com/Yomguithereal">Guillaume Plique</a>
</span>

An experimental phonetic algorithm for the Spanish language taking into account some imported words from native south american languages such as Quechua or Nahuatl and their Spanish transliteration.

```js
import fonetico from 'talisman/phonetics/spanish/fonetico';

fonetico('Vergüenza');
>>> 'BERGWENSA'
```

<div id="fonetico-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics-spanish.js"></script>
