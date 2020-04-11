---
layout: page
title: French Phonetic Algorithms
---

The `phonetics/french` module gathers phonetic algorithms for the French language.

## Summary

Modules under the `talisman/phonetics/french` namespace:

* [fonem](#fonem)
* [phonetic](#phonetic)
* [phonex](#phonex)
* [sonnex](#sonnex)
* [soundex](#soundex)
* [soundex2](#soundex2)

<h2 id="fonem">fonem</h2>

<span class="marginnote">
  Reference: <a href="http://www.persee.fr/doc/pop_0032-4663_1981_num_36_6_17248">http://www.persee.fr/doc/pop_0032-4663_1981_num_36_6_17248</a><br><br>
</span>

<span class="marginnote">
  <em>Bouchard Gérard, Brard Patrick, Lavoie Yolande. FONEM : Un code de transcription phonétique pour la reconstitution automatique des familles saguenayennes. In: Population, 36ᵉ année, n°6, 1981. pp. 1085-1103;</em>
</span>

The "FONEM" algorithm is a French phonetic algorithm that was designed to match family names from Saguenay.

```js
import fonem from 'talisman/phonetics/french/fonem';

fonem('Beaulac');
>>> 'BOLAK'
```

<div id="fonem-mount"></div>

<h2 id="phonetic">phonetic</h2>

<span class="marginnote">
  Reference: <a href="http://www.roudoudou.com/phonetic.php">http://www.roudoudou.com/phonetic.php</a><br><br>
</span>

<span class="marginnote">
  Author: <a href="http://www.roudoudou.com/">Edouard Bergé</a>
</span>

The "phonetic" algorithm is able to process any French word to produce a "human-readable" code often really near to the actual pronunciation of the word.

```js
import phonetic from 'talisman/phonetics/french/phonetic';

phonetic('gendarme');
>>> 'JANDARM'
```

<div id="phonetic-mount"></div>

<h2 id="phonex">phonex</h2>

<span class="marginnote">
  Reference:<br><a href="http://sqlpro.developpez.com/cours/soundex/">http://sqlpro.developpez.com/cours/soundex/</a><br><br>
</span>

<span class="marginnote">
  Author: <u>Frédéric Brouard</u>
</span>

The "phonex" algorithm, designed to work with French names, is an attempt to improve the classical [Soundex](#soundex) and [Soundex2](#soundex2) algorithms by adapting their design to some specificities of the French language.

```js
import phonex from 'talisman/phonetics/french/phonex';

phonex('Henri');
>>> 'H1RI'
```

<div id="phonex-mount"></div>

<h2 id="sonnex">sonnex</h2>

<span class="marginnote">
  Reference: <a href="https://github.com/Zigazou/Sonnex">https://github.com/Zigazou/Sonnex</a><br><br>
</span>

<span class="marginnote">
  Author: <a href="https://github.com/Zigazou">Frédéric Bisson</a>
</span>

The "sonnex" algorithm is able to process any French word and produces a quite accurate phonetic representation of them.

Note that the resulting code can contains sounds encoded as numbers to clearly distinguish them rather than keeping the combination of letters producing them in the French language. (<em>Example</em>: the sound "on" will be encoded as "3").

```js
import sonnex from 'talisman/phonetics/french/sonnex';

sonnex('ontologie');
>>> '3toloji'
```

<div id="sonnex-mount"></div>

<h2 id="soundex">soundex</h2>

<span class="marginnote">
  Reference:<br><a href="http://sqlpro.developpez.com/cours/soundex/">http://sqlpro.developpez.com/cours/soundex/</a><br><br>
</span>

French version of the classical [Soundex]({{ site.baseurl }}/phonetics#soundex) algorithm.

```js
import soundex from 'talisman/phonetics/french/soundex';

soundex('Florentin');
>>> 'F465'
```

<div id="soundex-mount"></div>

<h2 id="soundex2">soundex2</h2>

<span class="marginnote">
  Reference:<br><a href="http://sqlpro.developpez.com/cours/soundex2/">http://sqlpro.developpez.com/cours/soundex/</a><br><br>
</span>

Improved version of the French [Soundex](#soundex).

Note that the produced code will only contain letter rather than a leading letter followed by numbers.

```js
import soundex2 from 'talisman/phonetics/french/soundex2';

soundex2('Florentin');
>>> 'FLRN'
```

<div id="soundex2-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics-french.js"></script>
