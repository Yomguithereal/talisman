---
layout: page
title: Hyphenation Tokenizers
---

The `tokenizers/hyphenation` module gathers the library's various hyphenation algorithms.

Hyphenation algorithms take raw words and split them into parts that can be separated by hyphens when needing to justify text.

## Summary

* [liang](#liang)

<h2 id="liang">liang</h2>

<span class="marginnote">
  Reference: <a href="https://tug.org/docs/liang/">https://tug.org/docs/liang/</a><br><br>
</span>

<span class="marginnote">
  <em>Liang, Franklin Mark. "Word Hy-phen-a-tion by Com-pu-ter". PhD dissertation, Stanford University Department of Computer Science. Report number STAN-CS-83-977, August 1983.</em>
</span>

JavaScript implementation of Liang's hyphenation.

Note that this version stores patterns targeting the English language so you might want to avoid using it on other languages.

```js
import liang from 'talisman/tokenizers/hyphenation/liang';

liang('university');
>>> ['uni', 'ver', 'si', 'ty']
```

<div id="liang-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/tokenizers-hyphenation.js"></script>
