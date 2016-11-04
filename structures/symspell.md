---
layout: page
title: SymSpell
---

<span class="marginnote">
  Reference: <a href="https://github.com/wolfgarbe/symspell">https://github.com/wolfgarbe/symspell</a><br><br>
</span>

<span class="marginnote">
  Author: [Wolfe Garbe](https://github.com/wolfgarbe)
</span>

The Symmetric delete spelling correction algorithm is a data-structure used for spelling correction & fuzzy search.

## Use case

Let's say we want to build an autocomplete system.

When the user inputs a string, we are going to search for every term we know being at most at a Levenshtein distance of 2 of the user's query.

The naive method would be to "brute-force" the list of terms likewise:

```js
const suggestions = terms.filter(term => {
  return levenshtein(term, query) <= 2;
});
```

But, even if this works with few terms, it will soon become hard to compute if the list of terms grows too much.

The SymSpell structure solves this problem by indexing the list of terms such as it becomes efficient to query.

```js
import SymSpell from 'talisman/structures/symspell';

const index = new SymSpell();

terms.forEach(term => {
  index.add(term);
});

// We can now query the index easily:
const suggestions = index.search(query);
```

## Instantiation

```js
import SymSpell from 'talisman/structures/symspell';

const index = new SymSpell(options);
```

*Arguments*

* **options** <code class="type">[object]</code> - options:
  - **maxDistance** <code class="type">[number=2]</code> - maximum edit distance between stored terms and query.
  - **verbosity** <code id="verbosity" class="type">[number=2]</code> - verbosity of the index:
    + <code class="type">0</code>: Returns only the top suggestion.
    + <code class="type">1</code>: Returns suggestions with the smallest edit distance.
    + <code class="type">2</code>: Returns every found suggestion.

## Methods

* [#.add](#add)
* [#.search](#search)

<h3 id="add">#.add</h3>

Adds a single word to the index.

```js
index.add('hello');
```

*Arguments*

* **word** <code class="type">string</code> - word to add to the index.

<h3 id="search">#.search</h3>

Returns suggestions from the index for the desired query (you can tweak the output using the [verbosity](#verbosity) option).

```js
tree.add('back');
tree.add('bolk');
tree.add('hello');

tree.search('book');
>>> [
  {distance: 1, count: 1, term: 'back'},
  {distance: 1, count: 1, term: 'bolk'}
]
```

*Arguments*

* **query** <code class="type">string</code> - Query.
