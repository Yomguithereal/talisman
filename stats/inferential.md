---
layout: page
title: Inferential Statistics
---

The `stats/inferential` module gather a handful of functions related to inferential statistics.

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Statistical_inference">https://en.wikipedia.org/wiki/Statistical_inference</a>
</span>

## Summary

* [sampleStdev](#sample-stdev)
* [sampleVariance](#sample-variance)
* [stdev](#stdev)
* [variance](#variance)

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
