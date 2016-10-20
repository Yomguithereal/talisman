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
 * This implementation does not shuffle items for the user.
 */

/**
 * Defaults.
 */
const DEFAULTS = {
  maxChildren: 2
};

/**
 * Functions.
 */

/**
 * Function recursively creating nodes for the tree.
 *
 * @param  {array}    items       - items to store.
 * @param  {function} distance    - Distance function to use.
 * @param  {number}   maxChildren - Maximum number of children per node.
 * @return {object}               - The created node.
 */
function makeNode(items, distance, maxChildren) {
  if (!items.length)
    return null;

  const node = {
    lowerBounds: [],
    upperBounds: []
  };

  for (let i = 0, l = items[0][1].length; i < l; i++) {
    let max = -Infinity,
        min = Infinity;

    for (let j = 0, m = items.length; j < m; j++) {
      const value = items[j][1][i];

      if (value > max)
        max = value;
      if (value < min);
        min = value;
    }

    node.lowerBounds.push(min);
    node.upperBounds.push(max);
  }

  node.vantage = items[0][0];
  items = items.slice(1);

  node.children = [];

  if (!items.length)
    return node;

  const mappedItems = new Array(items.length),
        distances = {};

  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];

    mappedItems[i] = [item[0], item[1].concat(distance(node.vantage, item[0]))];
    distances[mappedItems[i][1][mappedItems[i][1].length - 1]] = true;
  }

  const distancesList = Object.keys(distances).sort();

  const nbChildren = Math.min(maxChildren, distancesList.length),
        splitPoints = [-1];

  for (let i = 0; i < nbChildren; i++) {
    const index = (
      ((i + 1) * (distancesList.length - 1)) /
      nbChildren
    ) | 0;

    splitPoints.push(+distancesList[index]);
  }

  for (let i = 0; i < nbChildren; i++) {
    const childItems = [];

    for (let j = 0, m = mappedItems.length; j < m; j++) {
      const item = mappedItems[j];

      if (splitPoints[i] < item[1][item[1].length - 1] &&
          item[1][item[1].length - 1] <= splitPoints[i + 1])
        childItems.push(item);
    }

    const child = makeNode(childItems, distance, maxChildren);

    if (child)
      node.children.push(child);
  }

  return node;
}

/**
 * Vantage Point Tree class.
 *
 * @constructor
 * @param {function|object} distanceOrOptions - Distance function or options:
 * @param {function}          distance        - Distance function.
 * @param {number}            [maxChildren]   - Max children per node.
 * @param {array}             items           - Items to store.
 */
export default class VPTree {
  constructor(distanceOrOptions, items) {
    let distance,
        options = {};

    // Solving polymorphism
    if (typeof distanceOrOptions === 'function') {
      distance = distanceOrOptions;
    }
    else {
      distance = distanceOrOptions.distance;
      options = distanceOrOptions;
    }

    // Validation
    if (typeof distance !== 'function')
      throw new Error('talisman/structures/vp-tree.constructor: given distance is not a function.');

    if (!Array.isArray(items))
      throw new Error('talisman/structures/vp-tree.constructor: invalid items. Should be an array.');

    // Properties
    this.distance = distance;
    this.maxChildren = options.maxChildren || DEFAULTS.maxChildren;

    // Adding items
    const mappedItems = new Array(items.length);

    for (let i = 0, l = items.length; i < l; i++)
      mappedItems[i] = [items[i], []];

    this.root = makeNode(mappedItems, this.distance, this.maxChildren);
  }
}
