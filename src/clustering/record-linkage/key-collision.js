/**
 * Talisman clustering/record-linkage/key-collision
 * =================================================
 *
 * Simple clustering algorithm running in linear time just applying a
 * keying function to each data point and grouping them when the resulting
 * keys collide.
 */
import RecordLinkageClusterer from './abstract';

/**
 * Key Collision Clusterer class.
 *
 * @constructor
 */
export class KeyCollisionClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);

    // Validating keyer
    this.keyer = params.keys || params.key;

    if (typeof this.keyer !== 'function')
      throw new Error('talisman/clustering/record-linkage/key-collision: the given keyer is not a function.');
  }

  run() {
    const map = Object.create(null);

    // Computing buckets map
    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i],
            keys = [].concat(this.keyer(item));

      for (let j = 0, m = keys.length; j < m; j++) {
        const key = keys[j];

        // If the key is falsey, we continue
        if (!key)
          continue;

        if (!map[key])
          map[key] = new Set();
        map[key].add(item);
      }
    }

    // Retrieving clusters
    const clusters = [];

    for (const key in map) {
      if (map[key].size >= this.params.minClusterSize)
        clusters.push(Array.from(map[key]));
    }

    return clusters;
  }
}

/**
 * Shortcut function for the key collision clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function keyCollision(params, items) {
  const clusterer = new KeyCollisionClusterer(params, items);

  return clusterer.run();
}
