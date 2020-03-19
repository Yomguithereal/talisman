/**
 * Talisman clustering/abstract
 * =============================
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
    this.items = items;
    this.params = {
      minClusterSize: params.minClusterSize || DEFAULTS.minClusterSize
    };
  }
}
