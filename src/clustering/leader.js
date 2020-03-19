/**
 * Talisman clustering/record-linkage/leader
 * ==========================================
 *
 * The Leader clustering algorithm is a quite simple algorithm used to partition
 * arbitrary data and running in O(ln) time complexity, l being the number of
 * clusters.
 *
 * It's also important to note that the resulting partition might change with
 * the order of given items.
 */
import RecordLinkageClusterer from './abstract';

/**
 * Leader Clusterer class.
 *
 * @constructor
 */
export class LeaderClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);

    // Validating the distance function
    if (typeof params.distance !== 'function')
      throw new Error('talisman/clustering/record-linkage/leader: the given distance is not a function.');

    // Validating the thresholds
    if (typeof params.threshold !== 'number')
      throw new Error('talisman/clustering/record-linkage/leader: the given threshold is not a number.');

    this.distance = params.distance;
    this.params.threshold = params.threshold;
  }

  run() {
    const clusters = [];

    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i];

      let closestClusterIndex = null,
          closest = Infinity;

      for (let j = 0, m = clusters.length; j < m; j++) {
        const clusterLeader = clusters[j][0],
              distance = this.distance(clusterLeader, item);

        if (distance < closest) {
          closest = distance;
          closestClusterIndex = j;
        }
      }

      if (closest <= this.params.threshold) {
        clusters[closestClusterIndex].push(item);
      }
      else {
        clusters.push([item]);
      }
    }

    return clusters;
  }
}

/**
 * Shortcut function for the leader clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function leader(params, items) {
  const clusterer = new LeaderClusterer(params, items);

  return clusterer.run();
}
