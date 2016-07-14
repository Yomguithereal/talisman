---
layout: page
title: Syllables Tokenizers
---

The `tokenizers/syllables` module gathers the library's various syllables tokenizers.

Syllable tokenizer take raw words or sometimes their phonetic representation and output a list of syllables.

## Summary

* [legalipy](#legalipy)
* [sonoripy](#sonoripy)

<h2 id="legalipy">legalipy</h2>

<span class="marginnote">
  Reference: <a href="https://github.com/henchc/LegaliPy">https://github.com/henchc/LegaliPy</a><br><br>
</span>

<span class="marginnote">
  Author: <a href="https://github.com/henchc">Christopher Hench (UC Berkeley)</a>
</span>

LegaliPy is a language-independent syllables tokenizer based on the **Onset Maximisation Principle** (or principle of legality, hence the name).

It has to be trained with a sufficiently large corpus of text from a given language before being able to tokenize syllables from word.

```js
import {LegalipyTokenizer} from 'talisman/tokenizers/syllables/legalipy';

// First we need to train the tokenizer by feeding it word tokens
const tokenizer = new LegalipyTokenizer();
tokenizer.train(wordTokens);

// Note that training can be performed online & you can add more
// tokens on the fly until you decide to finalize the training
tokenizer.train(otherWordTokens);

// Now let's finalize the training
tokenizer.finalize();

// We can now tokenize words into syllables
tokenizer.tokenize('information');
>>> ['in', 'for', 'ma', 'tion']
```

*Using the default tokenizer*

If you are in a hurry and only need to train a LegaliPy tokenizer using word tokens and tokenize those words into syllables, know that you can alternatively use the default tokenizer exported by the module and that does just that:

```js
import legalipy from 'talisman/tokenizers/syllables/legalipy';

// Of course this example is bad and you should use a lot
// more tokens to have a satisfactory result
const wordTokens = ['history', 'is', 'dramatic'];

legalipy(wordTokens);
>>> [
  ['hist', 'or', 'y'],
  ['is'],
  ['dr', 'am', 'at', 'ic']
]
```

<div id="legalipy-mount"></div>

<h2 id="sonoripy">sonoripy</h2>

<span class="marginnote">
  Reference: <a href="https://github.com/henchc/LegaliPy">https://github.com/henchc/LegaliPy</a><br><br>
</span>

<span class="marginnote">
  Author:<br><a href="https://github.com/henchc">Christopher Hench (UC Berkeley)</a><br><u>Alex Estes</u>
</span>

SonoriPy is a language-independent syllabification algorithm following the **Sonority Sequencing Principle**.

As opposed to [LegaliPy](#legalipy), this algorithm doesn't need to be trained on word tokens but must instead be provided with the target language's sonority hierarchy.

Hence, note that the default tokenizer provided by this library is configured with a rough English sonority hierarchy but that you can create a custom tokenizer using your own hierarchy if needed.

```js
import sonoripy from 'talisman/tokenizers/syllables/sonoripy';

sonoripy('history');
>>> ['his', 'to', 'ry']
```

<div id="sonoripy-mount"></div>

*Creating a tokenizer with custom hierarchy*

If the basic sonority hierarchy provided by the library doesn't fit your case, here is how you can create your own custom tokenizer:

```js
import {createTokenizer} from 'talisman/tokenizers/syllables/sonoripy';

// Here is the shape of a sonority hierarchy object:
const customHierarchy = {
  vowels: 'aeiouy',
  approximates: '',
  nasals: 'lmnrw',
  fricatives: 'zvsf',
  affricates: '',
  stops: 'bcdgtkpqxhj'
};

const customTokenizer = createTokenizer({hierarchy: customHierarchy});

customTokenizer('shawarma');
>>> ['sha', 'war', 'ma']
```

<script src="{{ site.baseurl }}/assets/dist/tokenizers-syllables.js"></script>
