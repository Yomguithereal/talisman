---
layout: page
title: Tweets Tokenizers
---

The `tokenizers/tweets` module gathers the library's tweets tokenizers.

The aim of those function is to split tweets into tokens relevant to further analysis.

## Summary

* [casual](#casual)

<h2 id="casual">casual</h2>

<span class="marginnote">
  Reference: <a href="http://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize.casual">http://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize.casual</a><br><br>
</span>

<span class="marginnote">
  Authors:<u><br>Christopher Potts<br>Ewan Klein<br>Pierpaolo Pantone</u>
</span>

JavaScript implementation of [nltk](http://www.nltk.org/)'s tweets tokenizers.

This tokenizer is aware of urls, handles, hashtags, some emoticons etc.

```js
import casual from 'talisman/tokenizers/tweets/casual';

casual('This is a cooool #dummysmiley: :-)');
>>> [
  'This',
  'is',
  'a',
  'cooool',
  '#dummysmiley',
  ':',
  ':-)'
]
```

<div id="casual-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/tokenizers-tweets.js"></script>
