/**
 * Talisman clustering/record-linkage/key-collision
 * =================================================
 *
 * Simple clustering algorithm running in linear time just applying a
 * keying function to each data point and grouping them when the resulting
 * keys collide.
 */
import RecordLinkageClusterer from './abstract';
import {
  clustersFromSetGraph
} from './helpers';

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
    this.merge = params.merge || false;

    if (typeof this.keyer !== 'function')
      throw new Error('talisman/clustering/record-linkage/key-collision: the given keyer is not a function.');
  }

  runWithMerge() {
    const map = Object.create(null);

    // Computing buckets map
    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i],
            keys = [].concat(this.keyer(item, i));

      for (let j = 0, m = keys.length; j < m; j++) {
        const key = keys[j];

        // If the key is falsy, we continue
        if (!key)
          continue;

        if (!map[key])
          map[key] = new Set();
        map[key].add(i);
      }
    }

    // Computing graph
    // TODO: I sense that we can do better & faster
    const graph = Object.create(null);

    for (const key in map) {
      const bucket = Array.from(map[key]);

      for (let i = 0, l = bucket.length; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
          graph[bucket[i]] = graph[bucket[i]] || new Set();
          graph[bucket[i]].add(bucket[j]);

          graph[bucket[j]] = graph[bucket[j]] || new Set();
          graph[bucket[j]].add(bucket[i]);
        }
      }
    }

    return clustersFromSetGraph(
      this.items,
      graph,
      this.params.minClusterSize
    );
  }

  runWithoutMerge() {
    const map = Object.create(null);

    // Computing buckets map
    for (let i = 0, l = this.items.length; i < l; i++) {
      const item = this.items[i],
            keys = [].concat(this.keyer(item, i));

      for (let j = 0, m = keys.length; j < m; j++) {
        const key = keys[j];

        // If the key is falsy, we continue
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

  run() {
    if (this.merge)
      return this.runWithMerge();
    else
      return this.runWithoutMerge();
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
