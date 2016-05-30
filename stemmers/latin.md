---
layout: page
title: Latin stemmers
---

The `stemmers/latin` module gathers stemmers for the latin language.

## Summary

Modules under the `talisman/stemmers/latin` namespace:

* [schinke](#schinke)

<h2 id="schinke">schinke</h2>

<span class="marginnote">
  Reference: <a href="http://snowball.tartarus.org/otherapps/schinke/intro.html">http://snowball.tartarus.org/otherapps/schinke/intro.html</a>
</span>

Stemming latin words being notoriously difficult, this stemmer will output two different stems: one considering the given word is a noun, and another considering the word is a verb.

```js
import schinke from 'talisman/stemmers/latin/schinke';

schinke('aquila');
>>> {
  noun: 'aquil',
  verb: 'aquila'
}
```

<div id="schinke-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/stemmers-latin.js"></script>
