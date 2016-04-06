---
layout: page
title: Phonetics
---

The `phonetics` module aims at gathering various algorithms whose goal is to produce an approximative phonetic representation of the given strings.

## Summmary

Modules under the `talisman/phonetics` namespace:

* [metaphone](#metaphone)

<h2 id="metaphone">metaphone</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Metaphone">https://en.wikipedia.org/wiki/Metaphone</a>
</span>

```js
import metaphone from 'talisman/phonetics/metaphone';

metaphone('Michael');
>>> 'MXL'
```

<div id="metaphone-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics.js"></script>
