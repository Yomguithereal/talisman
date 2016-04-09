---
layout: page
title: Metrics
---

The `metrics` module typically gathers functions aiming at finding a theoretical "distance" between two sequences.

They range from computing the edit distance between two strings to retrieving the distance between two points in space.

**Note**: in all the testers below, know that you can separate sequences' elements by using a comma if you want to compare things different from single strings.

## Summary

Modules under the `talisman/metrics` namespace:

* [cosine](#cosine)
* [dice](#dice)
* [euclidean](#euclidean)
* [hamming](#hamming)
* [jaccard](#jaccard)
* [jaro](#jaro)
* [jaro-winkler](#jaro-winkler)
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

compare('healed', 'sealed');
>>> true

compare('healed', 'sold');
>>> false
```

<h2 id="cosine">cosine</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Cosine_similarity">https://en.wikipedia.org/wiki/Cosine_similarity</a>
</span>

Computes the cosine similarity between two vectors of same dimension.

```js
import cosine from 'talisman/metrics/cosine';
// Alternatively
import {similarity, distance} from 'talisman/metrics/cosine';

cosine([1, 3], [4, 5]);
>>> 0.94

distance(a, b) === 1 - similarity(a, b);
```

<div id="cosine-mount"></div>

<h2 id="dice">dice</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient">https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient</a><br><br>
</span>

<span class="marginnote">
  <em>Dice, Lee R. (1945). "Measures of the Amount of Ecologic Association Between Species". Ecology 26 (3): 297–302.</em>
</span>

Computes the Dice coefficient between two sequences, usually strings.

Note that the Dice & Sorensen coefficients are the same thing and that you remain free to use the module you prefer.

```js
import dice from 'talisman/metrics/dice';
// Alternatively
import {
  index,
  coefficient,
  similarity,
  distance
} from 'talisman/metrics/dice';

dice('healed', 'sealed');
>>> 0.8

distance(a, b) === 1 - similarity(a, b)
```

<div id="dice-mount"></div>

<h2 id="euclidean">euclidean</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Euclidean_distance">https://en.wikipedia.org/wiki/Euclidean_distance</a>
</span>

Computes the euclidean distance between two points in a N-dimensions space.

This distance is equal to the length of the straight line drawn between both points.

```js
import euclidean from 'talisman/metrics/euclidean';
// Alternatively
import {squared} from 'talisman/metrics/euclidean';

euclidean([1, 3], [4, 5]);
>>> ~3.61

// The squared distance is sometimes used to same some computation
squared([1, 3], [4, 5]);
>>> 13
```

<div id="euclidean-mount"></div>

<h2 id="hamming">hamming</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Hamming_distance">https://en.wikipedia.org/wiki/Hamming_distance</a><br><br>
</span>

<span class="marginnote">
  <em>Hamming, Richard W. (1950), "Error detecting and error correcting codes", Bell System Technical Journal 29 (2): 147–160</em>
</span>

Computes the Hamming distance between two equal-length sequences.

```js
import hamming from 'talisman/metrics/hamming';

hamming('night', 'nacht');
>>> 2

hamming([1, 0, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0, 1]);
>>> 2
```

<div id="hamming-mount"></div>

<h2 id="jaccard">jaccard</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Jaccard_index">https://en.wikipedia.org/wiki/Jaccard_index</a><br><br>
</span>

<span class="marginnote">
  <em>Jaccard, Paul (1912), "The distribution of the flora in the alpine zone", New Phytologist 11: 37–50</em>
</span>

Computes the Jaccard index between two sequences, usually strings.

```js
import jaccard from 'talisman/metrics/jaccard';
// Alternatively
import {
  index,
  similarity,
  distance
} from 'talisman/metrics/jaccard';

index === similarity === jaccard

jaccard('context', 'contact');
>>> ~0.57

distance(a, b) === 1 - similarity(a, b)
```

<div id="jaccard-mount"></div>

<h2 id="jaro">jaro</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance">https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance</a><br><br>
</span>

<span class="marginnote">
  <em>Jaro, M. A. (1989). "Advances in record linkage methodology as applied to the 1985 census of Tampa Florida". Journal of the American Statistical Association 84 (406): 414–20</em><br><br>
</span>

<span class="marginnote">
  <em>Jaro, M. A. (1995). "Probabilistic linkage of large public health data file". Statistics in Medicine 14 (5–7): 491–8.</em>
</span>

Computes the Jaro distance between two sequences, usually strings.

See also the [Jaro-Winkler](#jaro-winkler) distance.

```js
import jaro from 'talisman/metrics/jaro';
// Alternatively
import {
  similarity,
  distance
} from 'talisman/metrics/jaro';

similarity === jaro

jaro('Duane', 'Dwayne');
>>> 0.82

distance(a, b) === 1 - similarity(a, b)
```

<div id="jaro-mount"></div>

<h2 id="jaro-winkler">jaro-winkler</h2>

Computes the Jaro-Winkler distance between two sequences, usually strings.

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance">https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance</a><br><br>
</span>

<span class="marginnote">
  <em>Winkler, W. E. (1990). "String Comparator Metrics and Enhanced Decision Rules in the Fellegi-Sunter Model of Record Linkage". Proceedings of the Section on Survey Research Methods (American Statistical Association): 354–359.</em>
</span>

```js
import jaroWinkler from 'talisman/metrics/jaro-winkler';
// Alternatively
import {
  similarity,
  distance
} from 'talisman/metrics/jaro-winkler';

similarity === jaroWinkler

jaroWinkler('Duane', 'Dwayne');
>>> 0.84

distance(a, b) === 1 - similarity(a, b)
```

*Using custom parameters*

```js
import {custom} from 'talisman/metrics/jaro-winkler';

const parameters = {
  boostThreshold: 0.7,
  scalingFactor: 0.1
};

custom(parameters, 'Duane', 'Dwayne');
>>> 0.84
```

Options are the following:

* **boostThreshold** <code class="type">number</code> (0.7): boost threshold comprised between 0 and 1.
* **scalingFactor** <code class="type">number</code> (0.1): scaling factor. Should not exceed 0.25.

<div id="jaro-winkler-mount"></div>

<h2 id="manhattan">manhattan</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Taxicab_geometry">https://en.wikipedia.org/wiki/Taxicab_geometry</a>
</span>

Computes the Manhattan distance between two points in a N-dimensions space.

This distance if also often called the "city block" distance because it won't draw a straight line between both points but rather follow the other edges of the triangle.

```js
import manhattan from 'talisman/metrics/manhattan';

manhattan([1, 3], [4, 5]);
>>> 5
```

<div id="manhattan-mount"></div>

<h2 id="mra">mra</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Match_rating_approach">https://en.wikipedia.org/wiki/Match_rating_approach</a><br><br>
</span>

<span class="marginnote">
  <em>Moore, G B.; Kuhns, J L.; Treffzs, J L.; Montgomery, C A. (Feb 1, 1977). Accessing Individual Records from Personal Data Files Using Nonunique Identifiers. US National Institute of Standards and Technology. p. 17. NIST SP - 500-2.</em>
</span>

Assesses the similarity between two names by using the Match Rating Approach comparison.

```js
import mra from 'talisman/metrics/mra';

mra('Catherine', 'Kathryn');
>>> {
  minimum: 3,
  similarity: 4,
  codex: ['CTHRN', 'KTHRYN'],
  matching: true
}
```

*Output*

* **minimum** <code class="type">number</code> - The minimum similarity score needed for the names to be considered similar.
* **similarity** <code class="type">number</code> - The similarity score.
* **codex** <code class="type">array</code> - Both codex produced by [`talisman/phonetics/mra`]({{ site.baseurl }}/phonetics#mra).
* **matching** <code class="type">boolean</code> - Whether the comparison deemed both names similar or not.

<div id="mra-mount"></div>

<h2 id="overlap">overlap</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Overlap_coefficient">https://en.wikipedia.org/wiki/Overlap_coefficient</a>
</span>

Computes the overlap coefficient between two sequences.

```js
import overlap from 'talisman/metrics/overlap';

overlap('abc', 'abcde');
>>> 1
```

<div id="overlap-mount"></div>

<h2 id="sorensen">sorensen</h2>

The `sorensen` module is just an alias of the [dice](#dice) one.

<h2 id="tversky">tversky</h2>

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Tversky_index">https://en.wikipedia.org/wiki/Tversky_index</a><br><br>
</span>

<span class="marginnote">
  <em>Tversky, Amos (1977). "Features of Similarity". Psychological Reviews 84 (4): 327–352.</em>
</span>

Computes the Tversky index between two strings.

Note that the Tversky index can be seens as a generalization of both the [Jaccard](#jaccard) index and the [Dice](#coefficient).

```js
import tversky from 'talisman/metrics/tversky';

const parameters = {
  symmetric: false,
  alpha: 1,
  beta: 1
};

// Tversky with alpha = beta = 1 is the Jaccard index
const jaccard = tversky.bind(null, parameters);

jaccard('context', 'contact');
>>> ~0.57
```

*Parameters*

* **symmetric** <code class="type">boolean</code> (false) - whether to compute the symmetric or the asymmetric index.
* **alpha** <code class="type">number</code> (1) - alpha parameter. Must be >= 0.
* **beta** <code class="type">number</code> (1) - beta parameter. Must be >= 0.

<div id="tversky-mount"></div>

<script src="{{ site.baseurl }}/assets/dist/metrics.js"></script>

