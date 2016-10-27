---
layout: page
title: Spanish stemmers
---

The `stemmers/spanish` module gathers stemmers for the spanish language.

## Summary

Modules under the `talisman/stemmers/spanish` namespace:

* [unine](#unine)

<h2 id="unine">unine</h2>

<span class="marginnote">
  Reference: <a href="http://members.unine.ch/jacques.savoy/clef/">http://members.unine.ch/jacques.savoy/clef/</a>
</span>

Implementation of the UniNE (University of Neuchâtel) stemmers by Jacques Savoy.

```js
import unine, {minimal} from 'talisman/stemmers/spanish/unine';

// Default export is the minimal version
unine === minimal;
>>> true

minimal('impositivos');
>>> 'impositiv'

complex('suelos');
>>> 'suel'
```

<div id="unine-minimal-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/stemmers-spanish.js"></script>
