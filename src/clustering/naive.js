/**
 * Talisman clustering/record-linkage/naive
 * =========================================
 *
 * Naive clustering working by performing the n(n-1)/2 distance calculations
 * between all relevant pairs. Time complexity of such a clustering is therefore
 * O(n^2), which is quite bad.
 *
 * Note that the produced clusters are fuzzy.
 */
import RecordLinkageClusterer from './abstract';
import {
  handleSimilarityPolymorphisms,
  clustersFromArrayGraph
} from './helpers';

/**
 * Naive Clusterer class.
 *
 * @constructor
 */
export class NaiveClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);
    handleSimilarityPolymorphisms(this, params);
  }

  run() {
    const graph = {};

    // Iterating over the needed pairs
    for (let i = 0, l = this.items.length; i < l; i++) {
      const a = this.items[i];

      for (let j = i + 1; j < l; j++) {
        const b = this.items[j];

        if (this.similarity(a, b)) {
          graph[i] = graph[i] || [];
          graph[i].push(j);

          // NOTE: undirected link seems to be mandatory for it to work
          graph[j] = graph[j] || [];
          graph[j].push(i);
        }
      }
    }

    // Computing clusters
    return clustersFromArrayGraph(
      this.items,
      graph,
      this.params.minClusterSize
    );
  }
}

/**
 * Shortcut function for the naive clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function naive(params, items) {
  const clusterer = new NaiveClusterer(params, items);

  return clusterer.run();
}
