/**
 * Talisman clustering/naive
 * ==========================
 *
 * Naive clustering working by performing the n(n-1)/2 distance calculations
 * between all relevant pairs & retrieving connected components. Time complexity
 * of such a clustering is therefore O(n^2), which is quite bad.
 */

/**
 * Naive clustering function.
 *
 * @param  {object}   options      - Options:
 * @param  {function}   similarity - Function returning whether two points are
 *                                   similar.
 * @param  {boolean}    asymmetric - Whether similarity matrix is asymmetric.
 * @param  {array}    data         - Data points.
 * @return {array}                 - List of clusters.
 */
export default function naive(options, data) {
  const similarity = options.similarity,
        asymmetric = options.asymmetric === true;

  if (typeof similarity !== 'function')
    throw new Error('talisman/clustering/naive: `similarity` option should be a function.');

  const graph = new Array(data.length);

  // Iterating over the needed pairs to compute similarity
  for (let i = 0, l = data.length; i < l; i++) {
    const a = data[i];
    graph[i] = {};

    for (let j = asymmetric ? 0 : i; j < l; j++) {
      if (i === j)
        continue;

      const b = data[j];

      if (similarity(a, b))
        graph[i][j] = true;
    }
  }

  // Finding connected components
  const clusters = [],
        visited = new Set();

  let currentCluster = null;

  for (const i in graph) {
    if (!visited.has(i)) {
      visited.add(i);
      currentCluster = [data[i]];
      clusters.push(currentCluster);

      const stack = Object.keys(graph[i]);

      while (stack.length) {
        const j = stack.pop();

        if (!visited.has(j)) {
          visited.add(j);
          currentCluster.push(data[j]);
          stack.push.apply(stack, Object.keys(graph[j]));
        }
      }
    }
  }

  return clusters;
}
