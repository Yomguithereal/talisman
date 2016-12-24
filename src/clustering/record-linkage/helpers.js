/**
 * Talisman clustering/record-linkage/helpers
 * ===========================================
 *
 * Common function used throughout the clustering/record-linkage namespace.
 */

// NOTE: it is possible to sort the clusters by size beforehand to make
// the largest clusters possible

/**
 * Function returning a list of clusters from the given items & similarity
 * graph represented as an index of items to the array of neighbors.
 *
 * @param  {array}  items          - List of items.
 * @param  {object} graph          - Similarity graph.
 * @param  {number} minClusterSize - Minimum number of items in a cluster.
 */
export function clustersFromArrayGraph(items, graph, minClusterSize) {
  const clusters = [],
        visited = new Set();

  let cluster;

  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];

    if (visited.has(i))
      continue;

    if (!graph[i])
      continue;

    if (graph[i].length + 1 < minClusterSize)
      continue;

    cluster = new Array(graph[i].length + 1);
    cluster[0] = item;
    visited.add(i);

    // Adding neighbors to the cluster
    for (let j = 0, m = graph[i].length; j < m; j++) {
      const neighborIndex = graph[i][j],
            neighbor = items[neighborIndex];

      cluster[j + 1] = neighbor;
      visited.add(neighborIndex);
    }

    clusters.push(cluster);
  }

  return clusters;
}
