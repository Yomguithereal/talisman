/**
 * Talisman clustering/vp-tree
 * ============================
 *
 * Clustering method using a Vantage Point Tree (VPTree) to find the clusters
 * more efficiently.
 *
 * [Note]: this clusterer actually generates fuzzy clusters, meaning that one
 * data point may be present in several clusters.
 */
import VPTree from '../structures/vp-tree';

/**
 * Defaults.
 */
const DEFAULTS = {
  minClusterSize: 2
};

/**
 * VPTree clustering function.
 *
 * @param  {object}   options    - Options:
 * @param  {function}   distance - Distance function.
 * @param  {number}     radius   - Maximum radius of each cluster.
 * @param  {array}    data       - Data points.
 * @return {array}               - List of clusters.
 */
export default function vpTree(options, data) {
  const distance = options.distance,
        radius = options.radius,
        minClusterSize = options.minClusterSize || DEFAULTS.minClusterSize;

  if (typeof distance !== 'function')
    throw new Error('talisman/clustering/vp-tree: `distance` option should be a function.');

  if (typeof radius !== 'number' || radius < 0)
    throw new Error('talisman/clustering/vp-tree: `radius` option should be a number >= 0.');

  // Building the tree
  const tree = new VPTree(distance, data);

  // Building the clusters
  const clusters = [],
        visited = new Set();

  for (let i = 0, l = data.length; i < l; i++) {
    const item = data[i];

    if (!visited.has(item)) {
      const neighbors = tree.neighborsInRange(radius, item);

      const cluster = new Array(neighbors.length);

      for (let j = 0, m = neighbors.length; j < m; j++) {
        visited.add(neighbors[j].item);
        cluster[j] = neighbors[j].item;
      }

      if (cluster.length >= minClusterSize)
        clusters.push(cluster);
    }
  }

  return clusters;
}
