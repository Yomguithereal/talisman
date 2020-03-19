/**
 * Talisman clustering/record-linkage/sorted-neighborhood
 * =======================================================
 *
 * Clustering method first sorting the dataset before applying pairwise
 * comparisons only within the given window. Time complexity is quite
 * better than the naive approach: O(n(w+log n)).
 */
import RecordLinkageClusterer from './abstract';
import {
  handleSimilarityPolymorphisms,
  clustersFromSetGraph
} from './helpers';

/**
 * Sorted Neighborhood Clusterer class.
 *
 * @constructor
 */
export class SortedNeighborhoodClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);
    handleSimilarityPolymorphisms(this, params);

    if (typeof params.window !== 'number' || params.window < 1)
      throw new Error('talisman/clustering/record-linkage/sorted-neighborhood: the given window should be a number > 0.');

    this.window = params.window;

    const comparators = [].concat(params.comparator || params.comparators);

    if (comparators.some(comparator => typeof comparator !== 'function'))
      throw new Error('talisman/clustering/record-linkage/sorted-neighborhood: the given comparators should all be functions.');

    this.comparators = comparators;

    // Cloning items because we are going to mutate the array
    this.sorted = new Array(this.items.length);

    for (let i = 0, l = this.items.length; i < l; i++) {
      this.sorted[i] = i;
    }
  }

  run() {
    const graph = {},
          w = this.window;

    // Applying comparators
    for (let c = 0, d = this.comparators.length; c < d; c++) {
      const comparator = this.comparators[c];

      // Sorting items
      this.sorted.sort((a, b) => comparator(this.items[a], this.items[b]));

      // Performing pairwise comparisons within allowed window
      for (let i = 0, l = this.sorted.length; i < l; i++) {
        const aIndex = this.sorted[i],
              a = this.items[aIndex];

        for (let j = i + 1, m = Math.min(l, 1 + i + w); j < m; j++) {
          const bIndex = this.sorted[j],
                b = this.items[bIndex];

          if (this.similarity(a, b)) {
            graph[aIndex] = graph[aIndex] || new Set();
            graph[aIndex].add(bIndex);

            // NOTE: undirected link seems to be mandatory for it to work
            graph[bIndex] = graph[bIndex] || new Set();
            graph[bIndex].add(aIndex);
          }
        }
      }
    }

    return clustersFromSetGraph(
      this.items,
      graph,
      this.params.minClusterSize
    );
  }
}

/**
 * Shortcut function for the sorted neighborhood clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function sortedNeighborhood(params, items) {
  const clusterer = new SortedNeighborhoodClusterer(params, items);

  return clusterer.run();
}
