---
layout: page
title: Spanish Inflectors
---

The `inflectors/spanish` module gathers inflectors for the Spanish language.

## Summary

Functions under the `inflectors/spanish` namespace:

* [singularize](#singularize)

<h2 id="singularize">singularize</h2>

Function returning the singular version of the given Spanish noun.

```js
import {singularize} from 'talisman/inflectors/spanish';

singularize('playas');
>>> 'playa'
```

<div id="singularize-mount"></div>


<script src="{{ site.baseurl }}/assets/dist/inflectors-spanish.js"></script>
