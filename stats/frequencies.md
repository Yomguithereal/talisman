---
layout: page
title: Frequencies
---

The `stats/frequencies` module gather functions used to compute absolute or relative frequencies.

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Frequency_(statistics)">https://en.wikipedia.org/wiki/Frequency_(statistics)</a>
</span>

This function takes a list and outputs the frequencies of the contained items.

```js
import frequencies from 'talisman/stats/frequencies';
// Alternatively
import {absolute, relative} from 'talisman/stats/frequencies';

frequencies === absolute

frequencies([1, 1, 2, 3, 3, 4, 4, 4]);
>>> {
  1: 2,
  2: 1,
  3: 2,
  4: 3
}

relative([1, 1, 2, 3, 3, 4, 4, 4]);
>>> {
  1: 0.25,
  2: 0.125,
  3: 0.25,
  4: 0.375
}
```
