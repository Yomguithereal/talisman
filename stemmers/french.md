---
layout: page
title: French stemmers
---

The `stemmers/french` module gathers stemmers for the french language.

## Summary

Modules under the `talisman/stemmers/french` namespace:

* [porter](#porter)

<h2 id="porter">porter</h2>

<span class="marginnote">
  Reference: <a href="http://snowball.tartarus.org/algorithms/french/stemmer.html">http://snowball.tartarus.org/algorithms/french/stemmer.html</a>
</span>

An implementation of the French Porter stemmer, ported from the Snowball version.

```js
import porter from 'talisman/stemmers/french/porter';

porter('abaissait');
>>> 'abaiss'
```

<div id="porter-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/stemmers-french.js"></script>
