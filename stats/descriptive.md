---
layout: page
title: Descriptive Statistics
---

The `stats/descriptive` module gather a handful of functions related to descriptive statistics such as central tendancy measures.

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Descriptive_statistics">https://en.wikipedia.org/wiki/Descriptive_statistics</a>
</span>

## Summary

*Basics*

* [quantile](#quantile)
* [mean](#mean)
* [median](#median)
* [mode](#mode)
* [stdev](#stdev)
* [sum](#sum)
* [variance](#variance)

*Advanced*

* [addToMean](#add-to-mean)
* [combineMeans](#combine-means)
* [combineVariances](#combine-variances)
* [substractFromMean](#substract-from-mean)

<h2 id="quantile">quantile</h2>

Finds the desired quantile of the given sequence.

```js
import {quantile} from 'talisman/stats/descriptive';

quantile(.9, [6, 4, 3, 3, 5, 7, 4, 7, 8, 1]);
>>> 7.5

// Using custom interpolation
const interpolation = (values) => {
  return values[0];
};

quantile({p: 0.9, interpolation}, [6, 4, 3, 3, 5, 7, 4, 7, 8, 1]);
>>> 7
```

*Arguments*

* **options** <code class="type">number|object</code> - either the desired quantile or the following options:
  * **p** <code class="type">number</code>: desired quantile.
  * **interpolation** <code class="type">function</code>: custom interpolation function. Will default to [mean](#mean).

<h2 id="mean">mean</h2>

Computes the mean of the given sequence.

```js
import {mean} from 'talisman/stats/descriptive';

mean([13, 14, 15, 8, 20]);
>>> 14
```

<h2 id="median">median</h2>

Find the median of the given sequence.

```js
import {median} from 'talisman/stats/descriptive';

median([6, 4, 3, 3, 5, 7, 7, 8, 1]);
>>> 5
```

<h2 id="mode">mode</h2>

Computes the mode of the given sequence.

```js
import {mode} from 'talisman/stats/descriptive';

mode([13, 14, 15, 8, 20]);
>>> 20
```

<h2 id="stdev">stdev</h2>

Computes the standard deviation of the given sequence.

```js
import {stdev} from 'talisman/stats/descriptive';

stdev([13, 14, 15, 8, 20]);
>>> ~3.85
```

<h2 id="sum">sum</h2>

Computes the sum of the given sequence.

```js
import {sum} from 'talisman/stats/descriptive';

sum([13, 14, 15, 8, 20]);
>>> 70
```

<h2 id="variance">variance</h2>

Computes the variance of the given sequence.

```js
import {variance} from 'talisman/stats/descriptive';

variance([13, 14, 15, 8, 20]);
>>> 14.8
```

<h2 id="add-to-mean">addToMean</h2>

Computes the new mean of a sequence after adding a single value in constant time rather than having to recompute the mean in linear time.

```js
import {mean, addToMean} from 'talisman/stats/descriptive';

const m = mean([13, 14, 15, 8, 20]);
addToMean(m, 50);
>>> 20

addToMean(m, 50) === mean([13, 14, 15, 8, 20, 50]);
```

*Arguments*

* **previousMean** <code class="type">number</code> - mean of the sequence.
* **valueToAdd** <code class="type">number</code> - the value added to the sequence.

<h2 id="combine-means">combineMeans</h2>

Computes the combination of two sequences' means in constant time rather than having to compute the mean of the concatenated sequences in linear time.

```js
import {mean, combineMeans} from 'talisman/stats/descriptive';

const m1 = mean([13, 14, 15]),
      m2 = mean([8, 20, 50]);

combineMeans(m1, 3, m2, 3);
>>> 20
```

*Arguments*

* **mean1** <code class="type">number</code> - mean of the first sequence.
* **length1** <code class="type">number</code> - length of the first sequence.
* **mean2** <code class="type">number</code> - mean of the second sequence.
* **length2** <code class="type">number</code> - length of the second sequence.

<h2 id="combine-variances">combineVariances</h2>

Computes the combination of two sequences' variances in constant time rather than having to compute the variance of the concatenated sequences in linear time.

```js
import {
  mean,
  variance,
  combineVariances
} from 'talisman/stats/descriptive';

const s1 = [13, 14, 15],
      s2 = [8, 20]
      m1 = mean(s1),
      m2 = mean(s2),
      v1 = variance(s1),
      v2 = variance(s2);

combineVariances(m1, v1, s1.length, m2, v2, s2.length);
>>> 14.8
```

*Arguments*

* **mean1** <code class="type">number</code> - mean of the first sequence.
* **variance1** <code class="type">number</code> - variance of the first sequence.
* **length1** <code class="type">number</code> - length of the first sequence.
* **mean2** <code class="type">number</code> - mean of the second sequence.
* **length2** <code class="type">number</code> - length of the second sequence.
* **variance2** <code class="type">number</code> - variance of the second sequence.

<h2 id="substract-from-mean">substractFromMean</h2>

Computes the new mean of a sequence after removing a single value in constant time rather than having to recompute the mean in linear time.

```js
import {mean, substractFromMean} from 'talisman/stats/descriptive';

const m = mean([13, 14, 15, 8, 20, 50]);
substractFromMean(m, 50);
>>> 14

substractFromMean(m, 50) === mean([13, 14, 15, 8, 20]);
```

*Arguments*

* **previousMean** <code class="type">number</code> - mean of the sequence.
* **valueToSubstract** <code class="type">number</code> - the value substracted from the sequence.

