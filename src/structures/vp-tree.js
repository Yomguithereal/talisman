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
import {median} from '../stats/descriptive';

// TODO: implement random for choice? or better, a function to choose

/**
 * Functions.
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
}
