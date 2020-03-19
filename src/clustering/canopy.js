/**
 * Talisman clustering/canopy
 * ===========================
 *
 * Canopy clustering implementation.
 */
import RecordLinkageClusterer from './abstract';

/**
 * Canopy Clusterer class.
 *
 * @constructor
 */
export class CanopyClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);

    // Validating the distance function
    if (typeof params.distance !== 'function')
      throw new Error('talisman/clustering/record-linkage/canopy: the given distance is not a function.');

    // Validating the thresholds
    if (typeof params.loose !== 'number')
      throw new Error('talisman/clustering/record-linkage/canopy: the given loose distance is not a number.');
    if (typeof params.tight !== 'number')
      throw new Error('talisman/clustering/record-linkage/canopy: the given tight distance is not a number.');

    if (params.loose < params.tight)
      throw new Error('talisman/clustering/record-linkage/canopy: loose distance should be greater than tight distance.');

    this.distance = params.distance;
    this.params.loose = params.loose;
    this.params.tight = params.tight;
  }

  run() {
    const itemsIndex = {},
          clusters = [];

    for (let i = 0, l = this.items.length; i < l; i++)
      itemsIndex[i] = true;

    for (const k in itemsIndex) {
      const a = this.items[k];

      // Starting a new canopy
      delete itemsIndex[k];
      const cluster = [a];

      // Comparing to other elements in the set
      for (const k2 in itemsIndex) {
        const b = this.items[k2],
              d = this.distance(a, b);

        if (d <= this.params.loose)
          cluster.push(b);

        if (d <= this.params.tight)
          delete itemsIndex[k2];
      }

      clusters.push(cluster);
    }

    return clusters;
  }
}

/**
 * Shortcut function for the canopy clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function canopy(params, items) {
  const clusterer = new CanopyClusterer(params, items);

  return clusterer.run();
}
