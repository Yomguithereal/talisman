---
layout: page
title: French stemmers
---

The `stemmers/french` module gathers stemmers for the french language.

## Summary

Modules under the `talisman/stemmers/french` namespace:

* [carry](#carry)
* [eda](#eda)
* [porter](#porter)
* [unine](#unine)

<h2 id="carry">carry</h2>

<span class="marginnote">
  Reference: <a href="http://www.otlet-institute.org/docs/Carry.pdf">http://www.otlet-institute.org/docs/Carry.pdf</a><br><br>
</span>

<span class="marginnote">
  <em>
    Carry, un algorithme de désuffixation pour le français. M. Paternostre, P. Francq, J. Lamoral, D. Wartel et M. Saerens. 2002
  </em>
</span>

Carry is a French stemmer that was designed to beat the French version of the [Porter](#porter) algorithm. Its name is a pun based on the fact that the verb "porter" means "to carry" in French.

Note that the algorithm has been slightly modified by me to improve some obvious cases.

```js
import carry from 'talisman/stemmers/french/carry';

carry('Tissaient');
>>> 'tis'
```

<div id="carry-mount"></div>

<h2 id="eda">eda</h2>

<span class="marginnote">
  Reference: <a href="https://cedric.cnam.fr/fichiers/RC1314.pdf">https://cedric.cnam.fr/fichiers/RC1314.pdf</a><br><br>
</span>

<span class="marginnote">
  <em>
    Extraction automatique des diagnostics à partir des comptes rendus médicaux textuels. Didier Nakache, 2007.
  </em>
</span>

The EDA French stemmer was specially designed to handle words from the medical field.

```js
import eda from 'talisman/stemmers/french/eda';

eda('intestinales');
>>> 'intestin'
```

<div id="eda-mount"></div>

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
