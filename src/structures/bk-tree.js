/**
 * Talisman structure/bk-tree
 * ===========================
 *
 * Implementation of a Buckhard-Keller tree, allowing fast lookups of words
 * that lie within a specified distance of the query word.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/BK-tree
 *
 * [Article]:
 * W. Burkhard and R. Keller. Some approaches to best-match file searching,
 * CACM, 1973
 */

/**
 * Helper used to insert a word in the tree.
 *
 * @param {function} distance - Distance function to use.
 * @param {object}   tree     - Target tree.
 * @param {string}   word     - Word to insert.
 */
function insertWord(distance, tree, word) {
  const d = distance(word, tree.word);

  if (d in tree.children)
    insertWord(distance, tree.children[d], word);
  else
    tree.children[d] = {word, children: {}};
}

/**
 * Helper used to search for words in the tree.
 *
 * @param {function} distance - Distance function to use.
 * @param {object}   tree     - Target tree.
 * @param {string}   word     - Word to query.
 * @param {number}   n        - Max distance.
 * @param {array}    acc      - Accumulator.
 */
function searchWord(distance, tree, word, n, acc) {
  const d = distance(word, tree.word);

  if (d <= n)
    acc.push(tree.word);

  for (let i = d - n, l = d + n + 1; i < l; i++) {
    const children = tree.children[i];

    if (children) {
      searchWord(distance, children, word, n, acc);
    }
  }
}

/**
 * The BKTree class.
 *
 * @constructor
 * @param {function} distance - Distance function to be used by the tree.
 * @param {array}    words    - Initial words.
 */
export default class BKTree {
  constructor(distance, words) {
    if (typeof distance !== 'function')
      throw Error('talisman/structure/bk-tree.constructor: given distance is not a function.');

    if (words && !Array.isArray(words))
      throw Error('talisman/structure/bk-tree.constructor: given words are not an array.');

    // Properties
    this.distance = distance;
    this.tree = null;

    if (words) {
      for (let i = 0, l = words.length; i < l; i++)
        this.add(words[i]);
    }
  }

  /**
   * Method used to add the given word into the tree.
   *
   * @param  {string} word - Word to add.
   * @return {BKTree}      - Returns itself for chaining.
   */
  add(word) {

    // Initializing the tree with first given word:
    if (!this.tree) {
      this.tree = {word, children: {}};
      return this;
    }

    // Else, we properly add the word in the tree
    insertWord(this.distance, this.tree, word);

    return this;
  }

  /**
   * Method used to search all words in the tree that are within the given
   * distance.
   *
   * @param  {number} n     - Maximum distance between query & targets.
   * @param  {string} word  - Word to query.
   * @return {array}        - Returns an array of near words.
   */
  search(n, word) {
    const found = [];

    searchWord(this.distance, this.tree, word, n, found);

    return found;
  }
}
