---
layout: page
title: Frequencies
---

The `stats/frequencies` module gather functions used to compute absolute or relative frequencies.

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Frequency_(statistics)">https://en.wikipedia.org/wiki/Frequency_(statistics)</a>
</span>

## Summary

* [absolute](#absolute)
* [relative](#relative)
* [updateFrequencies](#update-frequencies)

<h2 id="absolute">absolute</h2>

Function computing the absolute frequencies of the given sequence.

```js
import frequencies from 'talisman/stats/frequencies';
// Alternatively
import {absolute} from 'talisman/stats/frequencies';

frequencies([1, 1, 2, 3, 3, 4, 4, 4]);
>>> {
  1: 2,
  2: 1,
  3: 2,
  4: 3
}
```

<h2 id="relative">relative</h2>

Function computing the relative frequencies of the given sequence or computing relative frequencies from absolute ones.

```js
import {relative} from 'talisman/stats/frequencies';

relative([1, 1, 2, 3, 3, 4, 4, 4]);
>>> {
  1: 0.25,
  2: 0.125,
  3: 0.25,
  4: 0.375
}

// Or from absolute frequencies
const absoluteFrequencies = {
  1: 2,
  2: 1,
  3: 2,
  4: 3
};

relative(absoluteFrequencies);
>>> {
  1: 0.25,
  2: 0.125,
  3: 0.25,
  4: 0.375
}
```

<h2 id="update-frequencies">updateFrequencies</h2>

Function taking frequencies and updating them with a new sequence.

```js
import {updateFrequencies} from 'talisman/stats/frequencies';

const previousFrequencies = {
  apple: 4,
  plum: 3
};

const newSequence = ['plum', 'apple', 'apple', 'banana'];

const newFrequencies = updateFrequencies(previousFrequencies, newSequence);
>>> {
  apple: 6,
  plum: 4,
  banana: 1
}
```
