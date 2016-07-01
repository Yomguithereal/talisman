---
layout: page
title: French stemmers
---

The `stemmers/french` module gathers stemmers for the french language.

## Summary

Modules under the `talisman/stemmers/french` namespace:

* [porter](#porter)
* [unine](#unine)

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

<h2 id="unine">unine</h2>

<span class="marginnote">
  Reference: <a href="http://members.unine.ch/jacques.savoy/clef/">http://members.unine.ch/jacques.savoy/clef/</a>
</span>

Implementation of both UniNE (University of Neuchâtel) stemmers by Jacques Savoy.

There is a "minimal" one, very simple but not very accurate, and a "complex" one handling more cases.

```js
import unine, {minimal, complex} from 'talisman/stemmers/french/unine';

// Default export is the minimal version
unine === minimal;
>>> true

minimal('chanter');
>>> 'chant'

complex('pratiquement');
>>> 'pratiqu'
```

*Minimal version*

<div id="unine-minimal-mount"></div>

*Complex version*

<div id="unine-complex-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/stemmers-french.js"></script>
