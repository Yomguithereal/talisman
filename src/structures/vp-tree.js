/**
 * Talisman structure/vp-tree
 * ===========================
 *
 * Implementation of the Vantage Point Tree.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Vantage-point_tree
 *
 * [Note]:
 * This implementation does not randomly select a point.
 */
import Heap from 'mnemonist/heap';
import {median} from '../stats/descriptive';

// TODO: implement random for choice? or better, a function to choose

/**
 * Constants.
 */
const SORTER = (a, b) => {
  if (a.distance < b.distance)
    return 1;
  if (a.distance > b.distance)
    return -1;

  return 0;
};

/**
 * Functions use to recursively build the tree.
 *
 * @param  {function} distance - Distance function to use.
 * @param  {array}    items    - Items to store.
 */
function makeTree(distance, items) {
  const tree = {
    vantage: items.pop()
  };

  if (!items.length)
    return tree;

  // Computing distances
  const distances = new Array(items.length);

  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];
    distances[i] = distance(tree.vantage, item);
  }

  tree.mu = median(distances);

  const left = [],
        right = [];

  for (let i = 0, l = items.length; i < l; i++) {
    const d = distances[i];

    if (d >= tree.mu)
      right.push(items[i]);
    else
      left.push(items[i]);
  }

  if (left.length)
    tree.left = makeTree(distance, left);
  if (right.length)
    tree.right = makeTree(distance, right);

  return tree;
}

/**
 * Vantage Point Tree class.
 *
 * @constructor
 * @param {function} distance - Distance function.
 * @param {array}    items    - Items to store.
 */
export default class VPTree {
  constructor(distance, items) {

    // Validation
    if (typeof distance !== 'function')
      throw new Error('talisman/structures/vp-tree.constructor: given distance is not a function.');

    if (!Array.isArray(items))
      throw new Error('talisman/structures/vp-tree.constructor: invalid items. Should be an array.');

    // Properties
    this.distance = distance;
    this.root = makeTree(distance, items.slice());
  }

  /**
   * Method used to retrieve the k nearest neighbors of query.
   *
   * @param {number} k     - Number of neighbors.
   * @param {any}    query - Query.
   * @param {array}        - Found neighbors.
   */
  nearestNeighbors(k, query) {
    const neighbors = new Heap(),
          queue = [this.root];

    neighbors.comparator = SORTER;

    let tau = Infinity;

    while (queue.length > 0) {
      const node = queue.pop();

      const d = this.distance(query, node.vantage);

      if (d < tau) {
        neighbors.push({distance: d, item: node.vantage});

        // Trimming
        if (neighbors.size > k)
          neighbors.pop();

        // Adjusting tau
        tau = neighbors.peek().distance;
      }

      if (!node.left && !node.right)
        continue;

      if (d < node.mu) {
        if (d < node.mu + tau && node.left)
          queue.push(node.left);
        if (d >= node.mu - tau && node.right)
          queue.push(node.right);
      }
      else {
        if (d >= node.mu - tau && node.right)
          queue.push(node.right);
        if (d < node.mu + tau && node.left)
          queue.push(node.left);
      }
    }

    const result = new Array(neighbors.size);

    for (let i = neighbors.size - 1; i >= 0; i--)
      result[i] = neighbors.pop();

    return result;
  }

  /**
   * Method used to retrieve every neighbors in the given range for the
   * given query.
   *
   * @param {number} range - Range.
   * @param {any}    query - Query.
   * @param {array}        - Found neighbors.
   */
  neighborsInRange(range, query) {
    const neighbors = [],
          queue = [this.root];

    const tau = range;

    while (queue.length > 0) {
      const node = queue.pop();

      const d = this.distance(query, node.vantage);

      if (d <= tau)
        neighbors.push({distance: d, item: node.vantage});

      if (!node.left && !node.right)
        continue;

      if (d < node.mu) {
        if (d < node.mu + tau && node.left)
          queue.push(node.left);
        if (d >= node.mu - tau && node.right)
          queue.push(node.right);
      }
      else {
        if (d >= node.mu - tau && node.right)
          queue.push(node.right);
        if (d < node.mu + tau && node.left)
          queue.push(node.left);
      }
    }

    return neighbors;
  }
}
