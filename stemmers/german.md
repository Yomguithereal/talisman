---
layout: page
title: German stemmers
---

The `stemmers/german` module gathers stemmers for the german language.

## Summary

Modules under the `talisman/stemmers/german` namespace:

* [caumanns](#caumanns)

<h2 id="caumanns">caumanns</h2>

<span class="marginnote">
  Reference:<br><a href="http://edocs.fu-berlin.de/docs/servlets/MCRFileNodeServlet/FUDOCS_derivate_000000000350/tr-b-99-16.pdf">http://edocs.fu-berlin.de/docs/servlets/MCRFileNodeServlet/FUDOCS_derivate_000000000350/tr-b-99-16.pdf</a><br><br>
</span>

<span class="marginnote">
  <em>Jörg Caumanns (1999) A Fast and Simple Stemming Algorithm for German Words.</em>
</span>

Quite simple but rather efficient stemmer for the German language.

```js
import caumanns from 'talisman/stemmers/german/caumanns';

caumanns('beliebtester');
>>> 'belieb'
```

<div id="caumanns-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/stemmers-german.js"></script>
