---
layout: page
title: Keyers
---

The `keyers` module gathers several methods aiming at producing string fingerprints fit for fuzzy matching.

## Summary

* [fingerprint](#fingerprint)
* [ngram-fingerprint](#ngram-fingerprint)
* [name-sig](#name-sig)
* [omission](#omission)
* [skeleton](#skeleton)

## Use case

Let's say we stumbled upon those three lines in a table:

* <em>"University of north Carolina"</em>
* <em>"University of of North Carolina."</em>
* <em>"Carolina, North university of"</em>

One would easily agree that they are in fact duplicates & this is exactly the goal of this module's functions to be able to match them.

Those methods are indeed producing normalized "fingerprints" for the given strings so their users may match lines that look the same but are not perfectly equal for a computer.

For instance, the basic [fingerprint](#fingerprint) method would produce the following key for all three examples above:

`carolina north of university`

which is garbage for a human of course, but enables a computer to match those three different lines.

**N.B.** For different keying mechanisms involving phonetic representation of the given strings, be sure to check [this]({{ site.baseurl }}/phonetics) other module.

<h2 id="fingerprint">fingerprint</h2>

The fingerprint method applies the following transformation to the given string:

* Trimming
* Lowercasing
* Dropping punctuation & control characters
* Splitting the string into word tokens
* Dropping duplicate words
* Sorting the tokens alphabetically
* Rejoining the tokens separating them with a whitespace
* Normalizing accents

```js
import fingerprint from 'talisman/keyers/fingerprint';

fingerprint('University of north Carolina');
>>> 'carolina north of university'
```

<div id="fingerprint-mount"></div>

<h2 id="ngram-fingerprint">ngram-fingerprint</h2>

The ngram-fingerprint method is quite similar to the [fingerprint](#fingerprint) one, except it will apply it on the ngrams of the given string.

```js
import ngramFingerprint from 'talisman/keyers/ngram-fingerprint';

ngramFingerprint(2, 'University of north Carolina');
>>> 'arcaerfnhcinitivlinaninoofolorrorsrtsithtyunveyo'
```

*Arguments*

* **n** <span class="type">number</span>: size of the grams.
* **string** <span class="type">string</span>: target string.

*Bigrams*

<div id="bigram-fingerprint-mount"></div>

*Trigrams*

<div id="trigram-fingerprint-mount"></div>

<h2 id="name-sig">name-sig</h2>

<span class="marginnote">
  <em>Similarity Analysis of Patients’ Data: Bangladesh Perspective. Shahidul Islam Khan, Abu Sayed Md. Latiful Hoque. December 17, 2016</em>
</span>

The name significance "NameSig" similarity key. A keyer attempting to simplify names in order to make variations match.

```js
import namesig from 'talisman/keyers/name-sig';

namesig('Mr. Abdul Haque');
>>> 'abdlhk'
```

<div id="name-sig-mount"></div>

<h2 id="omission">omission</h2>

<span class="marginnote">
  Reference:<br><a href="http://dl.acm.org/citation.cfm?id=358048">http://dl.acm.org/citation.cfm?id=358048</a><br><br>
</span>

<span class="marginnote">
  <em>Pollock, Joseph J. and Antonio Zamora. 1984. "Automatic Spelling Correction in Scientific and Scholarly Text." Communications of the ACM, 27(4). 358--368.</em>
</span>

The omission key by Joseph Pollock & Antonio Zamora.

```js
import omission from 'talisman/keyers/omission';

omission('University of north Carolina');
>>> 'VYFHCLNTSRUIEOA'
```

<div id="omission-mount"></div>

<h2 id="skeleton">skeleton</h2>

<span class="marginnote">
  Reference:<br><a href="http://dl.acm.org/citation.cfm?id=358048">http://dl.acm.org/citation.cfm?id=358048</a><br><br>
</span>

<span class="marginnote">
  <em>Pollock, Joseph J. and Antonio Zamora. 1984. "Automatic Spelling Correction in Scientific and Scholarly Text." Communications of the ACM, 27(4). 358--368.</em>
</span>

The skeleton key by Joseph Pollock & Antonio Zamora.

```js
import skeleton from 'talisman/keyers/skeleton';

skeleton('University of north Carolina');
>>> 'UNVRSTYFHCLIEOA'
```

<div id="skeleton-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/keyers.js"></script>
