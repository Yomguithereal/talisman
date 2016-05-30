---
layout: page
title: German Phonetic Algorithms
---

The `phonetics/german` module gathers phonetic algorithms for the German language.

## Summary

Modules under the `talisman/phonetics/german` namespace:

* [cologne](#cologne)

<h2 id="cologne">cologne</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Cologne_phonetics">https://en.wikipedia.org/wiki/Cologne_phonetics</a><br><br>
</span>

<span class="marginnote">
  <em>Hans Joachim Postel: Die Kölner Phonetik. Ein Verfahren zur Identifizierung von Personennamen auf der Grundlage der Gestaltanalyse. in: IBM-Nachrichten, 19. Jahrgang, 1969, S. 925-931.</em>
</span>

The "cologne" phonetic algorithm, written by Hans Joachim Postel, was primarily designed to match german names.

```js
import cologne from 'talisman/phonetics/cologne';

cologne('Müller-Lüdenscheidt');
>>> '65752682'
```

<div id="cologne-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/phonetics-german.js"></script>
