---
layout: page
title: Clustering
---

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Cluster_analysis">https://en.wikipedia.org/wiki/Cluster_analysis</a>
</span>

The `clustering` module consists in a compilation of algorithms whose goal is to take a dataset and regroup its data points into different *clusters*

## Summary

Modules under the `talisman/clustering` namespace:

* [k-means](#k-means)

<h2 id="k-means">k-means</h2>

<span class="marginnote">
  Reference:<br><a href="https://en.wikipedia.org/wiki/K-means_clustering">https://en.wikipedia.org/wiki/K-means_clustering</a>
</span>

k-means is one of the simplest clustering algorithms.

Starting from random centroids, it will iteratively try to fit your dataset into k clusters by:

1. placing a data point into the cluster whose centroid is the nearest;
2. recomputing the centroid of each cluster by finding its mean;
3. restarting this processus until a maximum number of iterations is performed or when the centroids stop moving.

```js
import kMeans from 'talisman/clustering/k-means';

const clusters = kMeans(options, data);
```

*arguments*

* **options**: <code class="type">object</code> - possible options:
  * **[k]**: <code class="type">number</code> (8) - the number of clusters to produce.
  * **[distance]** <code class="type">function</code> - the distance function to use. Will default to [`metrics/distance/euclidean`]({{ site.baseurl }}/metrics/distance#euclidean).
  * **[maxIterations]** <code class="type">number</code> (300) - maximum number of iterations to perform.
  * **[initialCentroids]** <code class="type">array|function</code> - an array of initial centroids or a function taking the input data & options and returning the initial centroids.
  * **[sample]** <code class="type">function</code> - a custom sampling function.
* **data**: <code class="type">array</code> - your dataset should be an array of vectors.
