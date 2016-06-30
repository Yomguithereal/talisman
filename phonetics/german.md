---
layout: page
title: German Phonetic Algorithms
---

The `phonetics/german` module gathers phonetic algorithms for the German language.

## Summary

Modules under the `talisman/phonetics/german` namespace:

* [cologne](#cologne)
* [phonem](#phonem)

<h2 id="cologne">cologne</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Cologne_phonetics">https://en.wikipedia.org/wiki/Cologne_phonetics</a><br><br>
</span>

<span class="marginnote">
  <em>Hans Joachim Postel: Die Kölner Phonetik. Ein Verfahren zur Identifizierung von Personennamen auf der Grundlage der Gestaltanalyse. in: IBM-Nachrichten, 19. Jahrgang, 1969, S. 925-931.</em>
</span>

The "cologne" phonetic algorithm, written by Hans Joachim Postel, was primarily designed to match german names.

```js
import cologne from 'talisman/phonetics/german/cologne';

cologne('Müller-Lüdenscheidt');
>>> '65752682'
```

<div id="cologne-mount"></div>

<h2 id="phonem">phonem</h2>

<span class="marginnote">
  Reference:<br><a href="http://web.archive.org/web/20070209153423/http://uni-koeln.de/phil-fak/phonetik/Lehre/MA-Arbeiten/magister_wilz.pdf">http://uni-koeln.de/phil-fak/phonetik/Lehre/MA-Arbeiten/magister_wilz.pdf</a><br><br>
</span>

<span class="marginnote">
  <em>Wilde, Georg ; Meyer, Carsten: Doppelgänger gesucht - Ein Programm fur kontext-sensitive phonetische Textumwandlung. In: ct Magazin fur Computer & Technik 25 (1988)</em>
</span>

The phonem algorithms mainly targets German names, has no character limit and produces a code "readable" by a human by using letters instead of numbers like the [Cologne](#cologne) algorithm.

```js
import phonem from 'talisman/phonetics/german/phonem';

phonem('Müller-Lüdenscheidt');
>>> 'MYLRLYDNCAYD'
```

<div id="phonem-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics-german.js"></script>
