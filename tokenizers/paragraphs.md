---
layout: page
title: Paragraphs Tokenizers
---

The `tokenizers/paragraphs` module gathers the library's various paragraphs tokenizers aiming at splitting raw text into lists of paragraphs.

## Summary

* [naive](#naive)

<h2 id="naive">naive</h2>

Naive function using a simple regular expression to split raw text into paragraphs.

This function will consider we have a paragraph split when finding at least two consecutive line breaks while ignoring any line in between containing only spaces or tabulations.

```js
import paragraphs from 'talisman/tokenizers/paragraphs';

paragraphs('First paragraph.\n\nSecond Paragraph.');
>>> [
  'First paragraph.',
  'Second paragraph.'
]
```

<div id="naive-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/tokenizers-paragraphs.js"></script>
