/**
 * Talisman clustering/record-linkage/abstract
 * ============================================
 *
 * Abstract class used by every record-linkage clusterer to expose a same
 * interface.
 */

/**
 * Defaults.
 */
const DEFAULTS = {
  minClusterSize: 2
};

/**
 * Record Linkage Clusterer class.
 *
 * @constructor
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default class RecordLinkageClusterer {
  constructor(params, items) {
    if (!params || typeof params !== 'object')
      throw new Error('talisman/clustering/record-linkage: the given params should be an object.');

    if (!Array.isArray(items))
      throw new Error('talisman/clustering/record-linkage: the given items should be an array.');

    // Properties
    this.calculations = 0;
    this.items = items;
    this.graph = {};
    this.params = {
      minClusterSize: params.minClusterSize || DEFAULTS.minClusterSize
    };

    // Handling similarity
    if ('radius' in params && typeof params.radius !== 'number')
      throw new Error('talisman/clustering/record-linkage: the given radius should be a number.');

    if (typeof params.distance !== 'function' && typeof params.similarity !== 'function')
      throw new Error('talisman/clustering/record-linkage: the clusterer should be given a distance or a similarity function.');

    if ('radius' in params) {
      this.radius = params.radius;

      if (params.distance)
        this.similarity = (a, b) => {
          return params.distance(a, b) <= this.radius;
        };
      else
        this.similarity = (a, b) => {
          return params.similarity(a, b) >= this.radius;
        };
    }
    else {

      if (params.distance)
        this.similarity = (a, b) => !params.distance(a, b);
      else
        this.similarity = params.similarity;
    }
  }
}
