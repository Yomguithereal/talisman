/**
 * Talisman clustering/helpers
 * ============================
 *
 * Common function used throughout the clustering namespace.
 */

/**
 * Function handling distance/similarity & radius parameter polymorphisms.
 *
 * @param {RecordLinkageClusterer} target - Target instance.
 * @param {object}                 params - Parameters.
 */
export function handleSimilarityPolymorphisms(target, params) {
  if ('radius' in params && typeof params.radius !== 'number')
    throw new Error('talisman/clustering/record-linkage: the given radius should be a number.');

  if (typeof params.distance !== 'function' && typeof params.similarity !== 'function')
    throw new Error('talisman/clustering/record-linkage: the clusterer should be given a distance or a similarity function.');

  if ('radius' in params) {
    target.radius = params.radius;

    if (params.distance)
      target.similarity = (a, b) => {
        return params.distance(a, b) <= target.radius;
      };
    else
      target.similarity = (a, b) => {
        return params.similarity(a, b) >= target.radius;
      };
  }
  else {

    if (params.distance)
      target.similarity = (a, b) => !params.distance(a, b);
    else
      target.similarity = params.similarity;
  }
}

// NOTE: it is possible to sort the clusters by size beforehand to make
// the largest clusters possible, or even to order in reverse

// NOTE: since we'd want to sort by lenghts here, it's possible to use
// a linear time algorithm such as radix sort

// NOTE: should iterate on graph rather than on items & delete keys from the
// graph rather than having a set register

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

/**
 * Function returning a list of clusters from the given items & similarity
 * graph represented as an index of items to the set of neighbors.
 *
 * @param  {array}  items          - List of items.
 * @param  {object} graph          - Similarity graph.
 * @param  {number} minClusterSize - Minimum number of items in a cluster.
 */
export function clustersFromSetGraph(items, graph, minClusterSize) {
  const clusters = [],
        visited = new Set();

  let cluster;

  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];

    if (visited.has(i))
      continue;

    if (!graph[i])
      continue;

    if (graph[i].size + 1 < minClusterSize)
      continue;

    cluster = new Array(graph[i].size + 1);
    cluster[0] = item;
    visited.add(i);

    // Adding neighbors to the cluster
    const iterator = graph[i].values();

    let step,
        j = 1;

    while ((step = iterator.next()) && !step.done) {
      const neighborIndex = step.value,
            neighbor = items[neighborIndex];

      cluster[j] = neighbor;
      visited.add(neighborIndex);
      j++;
    }

    clusters.push(cluster);
  }

  return clusters;
}
