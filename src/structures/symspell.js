/**
 * Talisman structure/symspell
 * ============================
 *
 * JavaScript implementation of the Symmetric Delete Spelling dictionary to
 * efficiently index & query expression based on edit distance.
 * Note that the current implementation target the v3.0 of the algorithm.
 *
 * [Reference]:
 * http://blog.faroo.com/2012/06/07/improved-edit-distance-based-spelling-correction/
 *
 * [Author]:
 * Wolf Garbe
 */

/**
 * Constants.
 */
const DEFAULT_MAX_DISTANCE = 2,
      DEFAULT_VERBOSITY = 2;

/**
 * Functions.
 */

/**
 * Function creating a dictionary item.
 *
 * @param  {number} [value] - An optional suggestion.
 * @return {object}         - The created item.
 */
function createDictionaryItem(value) {
  const suggestions = new Set();

  if (typeof value === 'number')
    suggestions.add(value);

  return {
    suggestions,
    count: 0
  };
}

/**
 * Simplified edit function.
 *
 * @param {string} word      - Target word.
 * @param {number} distance  - Distance.
 * @param {number} max       - Max distance.
 * @param {Set}    [deletes] - Set mutated to store deletes.
 */
function edits(word, distance, max, deletes) {
  deletes = deletes || new Set();
  distance++;

  const l = word.length;

  if (l > 1) {
    for (let i = 0; i < l; i++) {
      const deletedItem = word.substring(0, i) + word.substring(i + 1);

      if (!deletes.has(deletedItem)) {
        deletes.add(deletedItem);

        if (distance < max)
          edits(deletedItem, distance, max, deletes);
      }
    }
  }

  return deletes;
}

/**
 * The SymSpell class.
 *
 * @constructor
 * @param {object} [options]       - Options:
 * @param {number}   [maxDistance] - Maximum edit distance of index.
 */
export default class SymSpell {
  constructor(options) {
    options = options || {};

    // Properties
    this.dictionary = Object.create(null);
    this.maxLength = 0;
    this.words = [];
    this.maxDistance = options.maxDistance || DEFAULT_MAX_DISTANCE;
    this.verbosity = options.verbosity || DEFAULT_VERBOSITY;
  }

  /**
   * Method used to add a word to the index.
   *
   * @param {string} word       - Word to add.
   * @param {SymSpell}
   */
  add(word) {
    let item = this.dictionary[word];

    if (item !== undefined) {
      if (typeof item === 'number') {
        item = createDictionaryItem(item);
        this.dictionary[word] = item;
      }

      item.count++;
    }

    else {
      item = createDictionaryItem();
      item.count++;

      this.dictionary[word] = item;

      if (word.length > this.maxLength)
        this.maxLength = word.length;
    }

    if (item.count === 1) {
      const number = this.words.length;
      this.words.push(word);

      const deletes = edits(word, 0, this.maxDistance);

      deletes.forEach(deletedItem => {
        let target = this.dictionary[deletedItem];

        if (target !== undefined) {
          if (typeof target === 'number') {
            target = createDictionaryItem(target);

            this.dictionary[deletedItem] = target;
          }

          if (!target.suggestions.has(number)) {
            this._addLowestDistance(target, word, number, deletedItem);
          }
        }
        else {
          this.dictionary[deletedItem] = number;
        }
      });
    }

    return this;
  }

  /**
   * Private method used to conditionally add suggestions.
   *
   * @param {object} item        - The target item.
   * @param {string} suggestion  - The target suggestion.
   * @param {number} int         - Integer key of the word.
   * @param {object} deletedItem - Considered deleted item.
   * @param {SymSpell}
   */
  _addLowestDistance(item, suggestion, int, deletedItem) {
    const verbosity = this.verbosity,
          first = item.suggestions.values().next().value;

    if (verbosity < 2 &&
        item.suggestions.size > 0 &&
        this.words[first].length - deletedItem.length > suggestion.length - deletedItem.length) {
      item.suggestions = new Set();
      item.count = 0;
    }

    if (verbosity === 2 ||
        !item.suggestions.size ||
        this.words[first].length - deletedItem.length >= suggestion.length - deletedItem.length) {
      item.suggestions.add(int);
    }

    return this;
  }
}
