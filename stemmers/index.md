---
layout: page
title: Stemmers
---

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Stemming">https://en.wikipedia.org/wiki/Stemming</a>
</span>

The `stemmers` module gathers several algorithms aiming at computing the "stem" of the given words.

Note that this stem will not compulsorily be grammatically correct since the goal of a stemmers is just to enable fuzzy comparisons between similar words.

If what you need is to obtain the correct grammatical *lemma* of a word, you should use [lemmatization](https://en.wikipedia.org/wiki/Stemming#Lemmatisation_algorithms) instead, which is often done by using a proper dictionary.

As stemmers are often language-specific, the `talisman/stemmers` module exports stemmers for the English language by default.

This said, the library also offers stemmers for some other [languages](#languages), such as [latin]({{ site.baseurl }}/stemmers/latin) for instance.

## Summary

Modules under the `talisman/stemmers` namespace:

* [lancaster](#lancaster)
* [lovins](#lovins)
* [porter](#porter)
* [s-stemmer](#s-stemmer)
* [uea-lite](#uea-lite)

<h2 id="languages">Stemmers for other languages</h2>

* [french]({{ site.baseurl }}/stemmers/french)
* [german]({{ site.baseurl }}/stemmers/german)
* [latin]({{ site.baseurl }}/stemmers/latin)

## Use case

Let's say we are searching some text for the occurrence of the term *built* but without really knowing if this term is the best one to find what we need.

That is to say, we might also want to retrieve occurrences of related terms such as *build*, *building* or even *builder*.

It would be quite tedious to manually specify all of those and one could quite easily say that those terms are similar and belong to the same family of words.

For a computer, however, this is not as straightforward.

Stemmers therefore provide an elegant solution to this problem by computing the stem of the words you give as input. A stem that you will be able to use in later comparisons.

```js
// Using the Lancaster stemmer, for instance
import lancaster from 'talisman/stemmers/lancaster';

const builderStem = lancaster('builder'),
      buildingStem = lancaster('building');

builderStem
>>> 'build'

buildingStem
>>> 'build'

builderStem === buildingStem
>>> true
```

<h2 id="lancaster">lancaster</h2>

<span class="marginnote">
  <em>A word stemmer based on the Lancaster stemming algorithm. Paice, Chris D. "Another Stemmer." ACM SIGIR Forum 24.3 (1990): 56-61.</em>
</span>

Created by Chris Pace in 1990, the Lancaster stemmer is more "aggressive" than Martin Porter's [one](#porter).

This means that produced stems are often shorter and that further comparisons are fuzzier.

```js
import lancaster from 'talisman/stemmers/lancaster';

lancaster('building');
>>> 'build'
```

<div id="lancaster-mount"></div>

<h2 id="lovins">lovins</h2>

<span class="marginnote">
  Reference: <a href="http://snowball.tartarus.org/algorithms/lovins/stemmer.html">http://snowball.tartarus.org/algorithms/lovins/stemmer.html</a><br><br>
</span>

<span class="marginnote">
  <em>Lovins JB (1968) Development of a stemming algorithm. Mechanical Translation and Computational Linguistics, 11: 22-31.</em>
</span>

This stemmer, written by Judith Beth Lovins in 1968, is deemed to be the first historical stemmer for the English language.

While it is often considered as obsolete, do not hesitate to use it on your dataset as it results might somethimes better fit your data.

```js
import lovins from 'talisman/stemmers/lovins';

lovins('building');
>>> 'build'
```

<div id="lovins-mount"></div>

<h2 id="porter">porter</h2>

<span class="marginnote">
  Reference: <a href="http://tartarus.org/martin/PorterStemmer/">http://tartarus.org/martin/PorterStemmer/</a><br><br>
</span>

<span class="marginnote">
  <em>C.J. van Rijsbergen, S.E. Robertson and M.F. Porter, 1980. New models in probabilistic information retrieval. London: British Library. (British Library Research and Development Report, no. 5587).</em>
</span>

Martin Porter's stemmer is probably the most popular stemmer for the English language.

This is often the first one to try on your dataset to see if stemming is relevant for your use case.

```js
import porter from 'talisman/stemmers/porter';

porter('building');
>>> 'build'
```

<div id="porter-mount"></div>

<h2 id="s-stemmer">s-stemmer</h2>

<span class="marginnote">
  Reference: <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.9828&rep=rep1&type=pdf">http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.9828&rep=rep1&type=pdf</a><br><br>
</span>

<span class="marginnote">
  <em>Donna Harman (1991) How effective is suffixing? Journal of the American Society for Information Science (vol. 42 issue 1).</em>
</span>

Very minimal stemmer designed to handle a English words finishing by the letter "s" such as plural forms etc.

```js
import sStemmer from 'talisman/stemmers/s-stemmer';

sStemmer('queries');
>>> 'query'
```

<div id="s-stemmer-mount"></div>

<h2 id="uea-lite">uea-lite</h2>

<span class="marginnote">
  Reference: <a href="http://www2.cmp.uea.ac.uk/~djs/projects/UEAlite/stemmer.html">http://www2.cmp.uea.ac.uk/~djs/projects/UEAlite/stemmer.html</a><br><br>
</span>

<span class="marginnote">
  Authors:<br><u>Marie-CLaire Jenkins</u><br><u>Dan Smith</u><br><a href="http://github.com/ealdent">Jason M. Adams</a>
</span>

The University of East Anglia (UEA) stemmer, edited by Jason M. Adams in his [Ruby port](http://github.com/ealdent/uea-stemmer).

Note that this stemmers comes with the possibility to return you the matched rule along with the resulting stem if needed.

```js
import ueaLite, {withRule} from 'talisman/stemmers/uea-lite';

ueaLite('ordained');
>>> 'ordain'

// Or if you want to know the matched rule:
withRule('ordained');
>>> {
  stem: 'ordain',
  rule: 13.6
}
```

<div id="uea-lite-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/stemmers.js"></script>

