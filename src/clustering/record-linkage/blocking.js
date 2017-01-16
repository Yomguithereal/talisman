/**
 * Talisman clustering/record-linkage/blocking
 * ============================================
 *
 * Clusterer dispatching documents to blocks which we will then cluster. A
 * document may be attached to more than one block since the algorithm uses
 * an inverted index. Time complexity is nb(b-1)/2 where n is the number
 * of blocks and b the average size of a block.
 */
import RecordLinkageClusterer from './abstract';
import {
  handleSimilarityPolymorphisms,
  clustersFromSetGraph
} from './helpers';

/**
 * Blocking Clusterer class.
 *
 * @constructor
 */
export class BlockingClusterer extends RecordLinkageClusterer {
  constructor(params, items) {
    super(params, items);
    handleSimilarityPolymorphisms(this, params);

    const blocker = params.blocks || params.block;

    if (typeof blocker !== 'function')
      throw new Error('talisman/clustering/record-linkage/blocking: the given blocker is not a function.');

    this.blocker = blocker;
  }

  run() {
    const graph = {},
          blocks = Object.create(null);

    for (let i = 0, l = this.items.length; i < l; i++) {
      const tokens = [].concat(this.blocker(this.items[i], i));

      for (let j = 0, m = tokens.length; j < m; j++) {
        const token = tokens[j];

        // We skip falsey tokens
        if (!token)
          continue;

        if (!blocks[token])
          blocks[token] = [];

        blocks[token].push(i);
      }
    }

    for (const k in blocks) {
      const block = blocks[k];

      for (let i = 0, l = block.length; i < l; i++) {
        const a = this.items[block[i]];

        for (let j = i + 1; j < l; j++) {
          const b = this.items[block[j]];

          if (this.similarity(a, b)) {
            graph[block[i]] = graph[block[i]] || new Set();
            graph[block[i]].add(block[j]);

            graph[block[j]] = graph[block[j]] || new Set();
            graph[block[j]].add(block[i]);
          }
        }
      }
    }

    return clustersFromSetGraph(
      this.items,
      graph,
      this.params.minClusterSize
    );
  }
}

/**
 * Shortcut function for the blocking clusterer.
 *
 * @param {object} params - Clusterer parameters.
 * @param {array}  items  - Items to cluster.
 */
export default function blocking(params, items) {
  const clusterer = new BlockingClusterer(params, items);

  return clusterer.run();
}
