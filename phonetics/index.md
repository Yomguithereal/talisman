---
layout: page
title: Phonetics
---

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Phonetic_algorithm">https://en.wikipedia.org/wiki/Phonetic_algorithm</a>
</span>

The `phonetics` module aims at gathering various algorithms whose goal is to produce an approximative phonetic representation of the given strings.

This phonetic representation is then really useful when performing fuzzy matching.

The algorithms presented in this page generally work for the English language (even if they somewhat extend to a variety of european languages for some of them).

This said, the library also offers phonetic algorithms targeting other [languages](#languages), such as [French]({{ site.baseurl }}/phonetics/french) for instance.

## Summary

Modules under the `talisman/phonetics` namespace:

* [alpha-sis](#alpha-sis)
* [caverphone](#caverphone)
* [daitch-mokotoff](#daitch-mokotoff)
* [double-metaphone](#double-metaphone)
* [eudex](#eudex)
* [fuzzy-soundex](#fuzzy-soundex)
* [lein](#lein)
* [metaphone](#metaphone)
* [mra](#mra)
* [nysiis](#nysiis)
* [onca](#onca)
* [phonex](#phonex)
* [roger-root](#roger-root)
* [sound-d](#sound-d)
* [soundex](#soundex)
* [statcan](#statcan)

<h2 id="languages">Phonetic algorithms for other languages</h2>

* [french]({{ site.baseurl }}/phonetics/french)
* [german]({{ site.baseurl }}/phonetics/german)

## Use case

Let's say we want to compare two fairly similar names like *Catherine* & *Kathryn*.

One human would very easily agree that those two names do sound the same.

But, for a computer, stating this simple fact is daunting since:

```js
'Catherine' !== 'Kathryn'
```

Phonetic algorithms are therefore a way to solve this problem because they will try to produce a phonetic representation of the given strings that can be used to match them if they sound roughly the same.

```js
// Using the metaphone algorithm, for instance
import metaphone from 'talisman/phonetics/metaphone';

const catherineCode = metaphone('Catherine'),
      kathrynCode = metaphone('Kathryn');

catherineCode
>>> 'K0RN'

kathrynCode
>>> 'K0RN'

catherineCode === kathrynCode
>>> true
```

<h2 id="alpha-sis">alpha-sis</h2>

<span class="marginnote">
  Reference: <a href="https://archive.org/stream/accessingindivid00moor#page/15/mode/1up">https://archive.org/stream/accessingindivid00moor#page/15/mode/1up</a><br><br>
</span>

<span class="marginnote">
  <em>Accessing individual records from personal data files using non-unique identifiers" / Gwendolyn B. Moore, et al.; prepared for the Institute for Computer Sciences and Technology, National Bureau of Standards, Washington, D.C (1977)</em>
</span>

This algorithm, from IBM's Alpha Search Inquiry System (Alpha SIS), produces 14 characters-long [Soundex](#soundex)-like codes.

Note that it will return a list rather than a single code because it will try to encode some characters sequences, such as "DZ" for instance, using two or three possibilities (and all permutations are thusly returned).

```js
import alphaSis from 'talisman/phonetics/alpha-sis';

alphaSis('Rogers');
>>> ['04740000000000']
```

<div id="alpha-sis-mount"></div>

<h2 id="caverphone">caverphone</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Caverphone">https://en.wikipedia.org/wiki/Caverphone</a><br><br>
</span>

<span class="marginnote">
  Original algorithm: <a href="http://caversham.otago.ac.nz/files/working/ctp060902.pdf">http://caversham.otago.ac.nz/files/working/ctp060902.pdf</a><br><br>
</span>

<span class="marginnote">
  Revisited algorithm: <a href="http://caversham.otago.ac.nz/files/working/ctp150804.pdf">http://caversham.otago.ac.nz/files/working/ctp150804.pdf</a><br><br>
</span>

<span class="marginnote">
  The Caversham project: <a href="http://caversham.otago.ac.nz/">http://caversham.otago.ac.nz/</a>
</span>

The caverphone algorithm, written by David Hood for the Caversham project, aims at encoding names and specifically targeting names from New Zealand.

However, this shouldn't stop you from trying it on any dataset.

The library packs both the original & the revisited version of the algorithm.

```js
import caverphone from 'talisman/phonetics/caverphone';
// Alternatively
import {original, revisited} from 'talisman/phonetics/caverphone';

caverphone === original
>>> true

caverphone('Henrichsen');
>>> 'ANRKSN1111'

revisited('Henrichsen')
>>> 'ANRKSN1111'
```

*Original version*

<div id="caverphone-original-mount"></div>

*Revisited version*

<div id="caverphone-revisited-mount"></div>

<h2 id="daitch-mokotoff">daitch-mokotoff</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Daitch%E2%80%93Mokotoff_Soundex">https://en.wikipedia.org/wiki/Daitch%E2%80%93Mokotoff_Soundex</a>
</span>

The Daitch-Mokotoff Soundex is a refinement of the American [Soundex](#soundex) to match more properly Slavic & Yiddish names.

Note that sometimes, this algorithm give different solutions for encoding a sound.

Thus, the function will always return an array of possible encodings listing all the possible permutations (at least one, obviously).

```js
import daitchMokotoff from 'talisman/phonetics/daitch-mokotoff';

daitchMokotoff('Peters');
>>> ['739400', '734000']
```

<div id="daitch-mokotoff-mount"></div>

<h2 id="double-metaphone">double-metaphone</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Metaphone">https://en.wikipedia.org/wiki/Metaphone</a>
</span>

The double metaphone algorithm, created in 2000 by Lawrence Philips, is an improvement over the original [metaphone](#metaphone) algorithm.

It is called "double" because the algorithm will try to produce two possibilities for the phonetic encoding of the given string.

Note however, that unlike the original metaphone, the length of the produced code will never exceed 4 characters.

```js
import doubleMetaphone from 'talisman/phonetics/double-metaphone';

doubleMetaphone('Smith');
>>> ['SM0', 'XMT']
```

<div id="double-metaphone-mount"></div>

<h2 id="eudex">eudex</h2>

<span class="marginnote">
  Reference: <a href="https://github.com/ticki/eudex">https://github.com/ticki/eudex</a><br><br>
</span>

<span class="marginnote">
  Author: [ticki](https://github.com/ticki)
</span>

Eudex is a phonetic hashing algorithm that will produce a 64bits integer holding information about the given word.

The produced hashed can be used afterwards by specific [distance metrics]({{ site.baseurl }}/metrics/#eudex) to determine whether two given words seem phonetically similar or not.

**Important**: this function will return a 64bits integer wrapped in a `Long` object from the [long](https://www.npmjs.com/package/long) node library since JavaScript is natively unable to deal with such integers.

```js
import eudex from 'talisman/phonetics/eudex';

eudex('Guillaume');
>>> <Long>288230378836066816
```

<div id="eudex-mount"></div>

<h2 id="fuzzy-soundex">fuzzy-soundex</h2>

<span class="marginnote">
  Reference: <a href="http://wayback.archive.org/web/20100629121128/http://www.ir.iit.edu/publications/downloads/IEEESoundexV5.pdf">http://wayback.archive.org/web/20100629121128/http://www.ir.iit.edu/publications/downloads/IEEESoundexV5.pdf</a><br><br>
</span>

<span class="marginnote">
  <em>Holmes, David and M. Catherine McCabe. "Improving Precision and Recall for Soundex Retrieval."</em>
</span>

This algorithm is designed as an improvement over the classical [Soundex](#soundex).

This improvement is achieved by performing some substitutions in the style of what the [NYSIIS](#nysiis) algorithm does, plus fuzzying some name beginnings & endings.

```js
import fuzzySoundex from 'talisman/phonetics/fuzzy-soundex';

fuzzySoundex('Rogers');
>>> 'R769'
```

<div id="fuzzy-soundex-mount"></div>

<h2 id="lein">lein</h2>

<span class="marginnote">
  Reference: <a href="http://naldc.nal.usda.gov/download/27833/PDF">http://naldc.nal.usda.gov/download/27833/PDF</a>
</span>

The Lein name coding procedure is a [Soundex](#soundex)-like algorithm than will produce a 4-character code for the given name.

```js
import lein from 'talisman/phonetics/lein';

lein('Michael');
>>> 'M530'
```

<div id="lein-mount"></div>

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

<h2 id="mra">mra</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Match_rating_approach">https://en.wikipedia.org/wiki/Match_rating_approach</a><br><br>
</span>

<span class="marginnote">
  <em>Moore, G B.; Kuhns, J L.; Treffzs, J L.; Montgomery, C A. (Feb 1, 1977). Accessing Individual Records from Personal Data Files Using Nonunique Identifiers. US National Institute of Standards and Technology. p. 17. NIST SP - 500-2.</em>
</span>

This algorithm will compute the Match Rating Approach codex used by the same method to establish the similarity between two names.

This function is exported by the library for reference, but you should probably use [`talisman/metrics/mra`]({{ site.baseurl }}/metrics#mra) instead.

```js
import mra from 'talisman/phonetics/mra';

mra('Kathryn');
>>> 'KTHRYN'
```

<div id="mra-mount"></div>

<h2 id="nysiis">nysiis</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/New_York_State_Identification_and_Intelligence_System">https://en.wikipedia.org/wiki/New_York_State_Identification_and_Intelligence_System</a>
</span>

The New York State Identification and Intelligence System is basically a more modern alternative to the original [Soundex](#soundex).

Like its counterpart, it has been created to match names and is not really suited for dictionary words.

The library packs both the original and the refined version of the algorithm.

```js
import nysiis from 'talisman/phonetics/nysiis';
// Alternatively
import {original, refined} from 'talisman/phonetics/nysiis';

nysiis === original
>>> true

nysiis('Philbert');
>>> 'FFALBAD'

nysiis('Philbert');
>>> 'FALBAD'
```

*Original version*

<div id="nysiis-original-mount"></div>

*Refined version*

<div id="nysiis-refined-mount"></div>

<h2 id="onca">onca</h2>

The Oxford Name Compression Algorithm (ONCA).

Basically a glorified combination of the [NYSIIS](#nysiis) algorithm & the [Soundex](#soundex) one.

```js
import onca from 'talisman/phonetics/onca';

lein('Dionne');
>>> 'D500'
```

<div id="onca-mount"></div>

<h2 id="phonex">phonex</h2>

<span class="marginnote">
  Reference: <a href="http://homepages.cs.ncl.ac.uk/brian.randell/Genealogy/NameMatching.pdf">http://homepages.cs.ncl.ac.uk/brian.randell/Genealogy/NameMatching.pdf</a><br><br>
</span>

<span class="marginnote">
  <em>Lait, A. J. and B. Randell. "An Assessment of Name Matching Algorithms".</em>
</span>

This algorithm is an improved version of the [Soundex](#soundex) algorithm.

Its main change is to better fuzz some very common cases missed by the Soundex algorithm in order to match more orthographic variations.

```js
import phonex from 'talisman/phonetics/phonex';

phonex('Rogers');
>>> 'R26'
```

<div id="phonex-mount"></div>

<h2 id="roger-root">roger-root</h2>

<span class="marginnote">
  Reference: <a href="http://naldc.nal.usda.gov/download/27833/PDF">http://naldc.nal.usda.gov/download/27833/PDF</a>
</span>

The Roger Root name coding procedure is a [Soundex](#soundex)-like algorithm than will produce a 5-character code (completely numerical) for the given name.

Its specificity is to encode the beginning of the names differently than their rest.

```js
import rogerRoot from 'talisman/phonetics/roger-root';

rogerRoot('Michael');
>>> '03650'
```

<div id="roger-root-mount"></div>

<h2 id="sound-d">sound-d</h2>

<span class="marginnote">
  <em>Hybrid Matching Algorithm for Personal Names. Cihan Varol, Coskun Bayrak.</em>
</span>

The SoundD algorithm is a slight variant of the [Soundex](#soundex) algorithm.

```js
import soundD from 'talisman/phonetics/sound-d';

soundD('Martha');
>>> '5630'
```

<div id="sound-d-mount"></div>

<h2 id="soundex">soundex</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Soundex">https://en.wikipedia.org/wiki/Soundex</a>
</span>

The Soundex algorithm, created by Robert Russell and Margaret Odell, is often considered to be the first phonetic algorithm in history.

Note that it aims at matching anglo-saxons names and won't work well on dictionary words.

You are also free to use the refined version of this algorithm, as found in the Apache projects.

```js
import soundex from 'talisman/phonetics/soundex';
// Alternatively
import {refined} from 'talisman/phonetics/soundex';

soundex('Michael');
>>> 'M240'

refined('Michael');
>>> 'M80307'
```

*Original version*

<div id="soundex-mount"></div>

*Refined version*

<div id="soundex-refined-mount"></div>

<h2 id="statcan">statcan</h2>

<span class="marginnote">
  Reference: <a href="http://naldc.nal.usda.gov/download/27833/PDF">http://naldc.nal.usda.gov/download/27833/PDF</a>
</span>

The census modified statistics Canada name coding procedure is a [Soundex](#soundex)-like algorithm than will produce a 4-character code (alphabetical) for the given name.

```js
import statcan from 'talisman/phonetics/statcan';

statcan('Michael');
>>> 'MCHL'
```

<div id="statcan-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics.js"></script>
