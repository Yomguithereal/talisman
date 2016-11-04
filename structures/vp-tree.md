---
layout: page
title: Vantage Point Tree
---

<span class="marginnote">
  Reference: <a href="https://en.wikipedia.org/wiki/Vantage-point_tree">https://en.wikipedia.org/wiki/Vantage-point_tree</a>
</span>

Vantage point trees are handy data structures used to spatially index items by "neighborhood."

It works by choosing a point in the dataset and making it the "vantage point" of the node then splitting the remaining points into two children nodes one storing the nearest points and the other the farthest ones. It continues recursively until all points have been stored in the tree.

This is a very useful data structure for clustering, notably to cluster items in a non-metric space.

## Instantiation

```js
import VPTree from 'talisman/structures/vp-tree';
import levenshtein from 'talisman/metrics/distance/levenshtein';

const items ['book', 'back', 'love', 'live'];

const tree = new VPTree(levenshtein, items);
```

*Arguments*

* **distance** <code class="type">function</code>: distance function to use.
* **items** <code class="type">array</code>: initial items to store.

## Methods

* [#.nearestNeighbors](#nearest-neighbors)
* [#.neighborsInRange](#neighbors-in-range)

<h3 id="nearest-neighbors">#.nearestNeighbors</h3>

Return the k nearest neighbors of the query item in the tree.

```js
tree.nearestNeighbors(2, 'bolk');
```

*Arguments*

* **k** <code class="type">number</code>: number of nearest neighbors to retrieve.
* **query** <code class="type">any</code>: query item.

<h3 id="neighbors-in-range">#.neighborsInRange</h3>

Returns all the neighbors in the given range.

```js
tree.neighborsInRange(2, 'bolk');
```

*Arguments*

* **range** <code class="type">number</code>: range of the query.
* **query** <code class="type">any</code>: query item.
