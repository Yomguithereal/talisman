---
layout: page
title: Buckhard-Keller Tree
---

Buckhard-Keller trees are data structures usually used to index strings and search strings using distance metrics such as the [Levenshtein]({{ site.baseurl }}/metrics/distance#levenshtein) distance.

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

Buckhard-Keller trees solves this problem by indexing the list of terms such as it becomes efficient to query them using a distance metric.

```js
import BKTree from 'talisman/structures/bk-tree';
import levenshtein from 'talisman/metrics/distance/levenshtein';

const tree = new BKTree(levenshtein, terms);

// We can now query the tree easily:
const suggestions = tree.search(query, 2);
```

**N.B.** you should probably also check the [SymSpell]({{ site.baseurl }}/structures/symspell) structure, which is able to perform the same kind of job but is even more efficient for this precise use case.

## Instantiation

## Methods

* [#.add](#add)
* [#.search](#search)
