---
layout: page
title: Inferential Statistics
---

The `stats/inferential` module gather a handful of functions related to inferential statistics.

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Statistical_inference">https://en.wikipedia.org/wiki/Statistical_inference</a>
</span>

## Summary

* [sampleCorrelation](#sample-correlation)
* [sampleCovariance](#sample-covariance)
* [sampleStdev](#sample-stdev)
* [sampleVariance](#sample-variance)
* [stdev](#stdev)
* [variance](#variance)

<h2 id="sample-correlation">sampleCorrelation</h2>

Computes the sample correlation coefficient between the two given samples.

```js
import {sampleCorrelation} from 'talisman/stats/inferential';

sampleCorrelation(
  [4, 5, 6, 3, 5],
  [4, 5, 9, 10, 7]
);
>>> ~-0.086
```

<h2 id="sample-covariance">sampleCovariance</h2>

Computes the sample covariance of the two given samples.

```js
import {sampleCovariance} from 'talisman/stats/inferential';

sampleCovariance(
  [4, 5, 6, 3, 5],
  [4, 5, 9, 10, 7]
);
>>> -0.25
```

<h2 id="sample-stdev">sampleStdev</h2>

Computes the sample standard deviation of the given sequence, which is the same as applying the [stdev](#stdev) function using 1 degree of freedom (Bessel's correction).

```js
import {sampleStdev} from 'talisman/stats/inferential';

sampleStdev([13, 14, 15, 8, 20]);
>>> ~4.30
```

<h2 id="sample-variance">sampleVariance</h2>

Computes the sample variance of the given sequence, which is the same as applying the [variance](#variance) function using 1 degree of freedom (Bessel's correction).

```js
import {sampleVariance} from 'talisman/stats/inferential';

sampleVariance([13, 14, 15, 8, 20]);
>>> 18.5
```

<h2 id="stdev">stdev</h2>

Computes the standard deviation of the given sequence using the given degrees of freedom.

```js
import {stdev} from 'talisman/stats/inferential';

stdev(1, [13, 14, 15, 8, 20]);
>>> ~4.30
```

*Arguments*

* **ddof** <code class="type">number</code> - delta degrees of freedom (must be >= 1).
* **sequence** <code class="type">array</code> - the sequence.

<h2 id="variance">variance</h2>

Computes the variance of the given sequence using the given degrees of freedom.

```js
import {variance} from 'talisman/stats/inferential';

variance(1, [13, 14, 15, 8, 20]);
>>> 18.5
```

*Arguments*

* **ddof** <code class="type">number</code> - delta degrees of freedom (must be >= 1).
* **sequence** <code class="type">array</code> - the sequence.
