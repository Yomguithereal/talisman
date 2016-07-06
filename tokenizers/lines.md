---
layout: page
title: Lines Tokenizers
---

The `tokenizers/lines` module gathers the library's various lines tokenizers aiming at splitting raw text into lists of lines.

## Summary

* [naive](#naive)

<h2 id="naive">naive</h2>

Naive function using a simple regular expression to split raw text into lines.

```js
import lines from 'talisman/tokenizers/lines/naive';

lines('First line.\nSecond line.');
>>> [
  'First line.',
  'Second line.'
]
```

<div id="naive-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/tokenizers-lines.js"></script>
