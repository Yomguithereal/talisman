/**
 * Talisman clustering/vp-tree
 * ============================
 *
 * Clustering method using a Vantage Point Tree (VPTree) to find the clusters
 * more efficiently.
 */
import VPTree from 'mnemonist/vp-tree';
import RecordLinkageClusterer from './abstract';

/**
 * Vantage Point Tree Clusterer class.
 *
 * @constructor
 */
export class VPTreeClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);

    // Validating radius
    if (typeof params.radius !== 'number')
      throw new Error('talisman/clustering/record-linkage/vp-tree: the given radius is not a number.');

    // Validating the distance function
    if (typeof params.distance !== 'function')
      throw new Error('talisman/clustering/record-linkage/vp-tree: the given distance is not a function.');

    // Properties
    this.radius = params.radius;
    this.distance = params.distance;
  }

  run() {

    // Building the tree
    const tree = new VPTree(this.distance, this.items);

    // Retrieving the clusters
    const clusters = [],
          visited = new Set();

    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i];

      if (visited.has(item))
        continue;

      const neighbors = tree.neighbors(this.radius, item);

      const cluster = new Array(neighbors.length);

      for (let j = 0, m = neighbors.length; j < m; j++) {
        visited.add(neighbors[j].item);
        cluster[j] = neighbors[j].item;
      }

      if (cluster.length >= this.params.minClusterSize)
        clusters.push(cluster);
    }

    return clusters;
  }
}

/**
 * Shortcut function for the vantage point tree clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function vpTree(params, items) {
  const clusterer = new VPTreeClusterer(params, items);

  return clusterer.run();
}
