/**
 * Talisman clustering/sorted-neighborhood
 * ========================================
 *
 * Clustering method first sorting the dataset before applying pairwise
 * comparisons only within the given window. Time complexity is quite
 * better than the naive approach: O(n(w+log n)).
 *
 * [Note]: this clusterer may create "chained" clusters where the diameter
 * of the cluster is inintuively large.
 */

// TODO: multi-sampling with transitivity.

/**
 * Defaults.
 */
const DEFAULTS = {
  minClusterSize: 2
};

/**
 * Sorted Neighborhood Method (SNM) function.
 *
 * @param  {object}   options          - Options:
 * @param  {number}     minClusterSize - Minimum items in a cluster.
 * @param  {function}   similarity     - Function returning whether two points are
 *                                       similar.
 * @param  {number}     window         - Size of the window.
 * @param  {array}    data             - Sorted data points.
 * @return {array}                     - List of clusters.
 */
export default function sortedNeighborhood(options, data) {
  const similarity = options.similarity,
        minClusterSize = options.minClusterSize || DEFAULTS.minClusterSize,
        w = options.window;

  if (typeof similarity !== 'function')
    throw new Error('talisman/clustering/sorted-neighborhood: `similarity` option should be a function.');

  if (typeof w !== 'number' || w < 2)
    throw new Error('talisman/clustering/sorted-neighborhood: `window` option should be a number > 1.');

  const graph = new Array(data.length);

  // Iterating
  for (let i = 0, l = data.length; i < l; i++) {
    const a = data[i];
    graph[i] = {};

    for (let j = 1 + i, m = Math.min(l, 1 + i + w); j < m; j++) {
      const b = data[j];

      if (similarity(a, b))
        graph[i][j] = true;
    }
  }

  // Finding connected components
  const clusters = [],
        visited = new Set();

  let cluster = null;

  for (const i in graph) {
    if (!visited.has(i)) {
      visited.add(i);
      cluster = [data[i]];

      const stack = Object.keys(graph[i]);

      while (stack.length) {
        const j = stack.pop();

        if (!visited.has(j)) {
          visited.add(j);
          cluster.push(data[j]);
          stack.push.apply(stack, Object.keys(graph[j]));
        }
      }

      if (cluster.length >= minClusterSize)
        clusters.push(cluster);
    }
  }

  return clusters;
}
