---
layout: page
title: Metrics
---

The `metrics` module typically gathers functions aiming at finding a theoretical "distance" between two sequences.

They range from computing the edit distance between two strings to retrieving the distance between two points in space.

## Summary

Modules under the `talisman/metrics` namespace:

* [cosine](#cosine)
* [dice](#dice)
* [euclidean](#euclidean)
* [hamming](#hamming)
* [jaccard](#jaccard)
* [jaro-winkler](#jaro-winkler)
* [jaro](#jaro)
* [manhattan](#manhattan)
* [mra](#mra)
* [overlap](#overlap)
* [sorensen](#sorensen)
* [tversky](#tversky)

## Use case

*Edit distance*

Let's assume we want to determine whether two strings are similar or not.

For instance, let's compare *healed* & *sealed*.

They look somewhat the same, don't they?

Well, a computer would have a hard time stating this fact, since, at the end of the day, it only dabbles in mathematics.

That's why we have to use distance metrics to assess whether both words are similar.

In the example below, we used the [Dice](#dice) coefficient, rating the similarity of two words and ranging from 0 to 1:

```js
// Let's use the Dice coefficient
import dice from 'talisman/metrics/dice';

// We'll say two strings are similar if their Dice coefficient >= 0.8
function compare(a, b) {
  return dice(a, b) >= 0.8;
}

compare('healed', 'sealed')
>>> true

compare('healed', 'sold')
>>> false
```
