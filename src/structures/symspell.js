/* eslint no-loop-func: 0 */
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
 * https://github.com/wolfgarbe/symspell
 *
 * [Author]:
 * Wolf Garbe
 */

/**
 * Constants.
 */
const DEFAULT_MAX_DISTANCE = 2,
      DEFAULT_VERBOSITY = 2;

const VERBOSITY = new Set([
  // Returns only the top suggestion
  0,
  // Returns suggestions with the smallest edit distance
  1,
  // Returns every suggestion (no early termination)
  2
]);

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
 * Function creating a suggestion item.
 *
 * @return {object} - The created item.
 */
function createSuggestionItem(term, distance, count) {
  return {
    term: term || '',
    distance: distance || 0,
    count: count || 0
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
 * Function used to conditionally add suggestions.
 *
 * @param {array}  words       - Words list.
 * @param {number} verbosity   - Verbosity level.
 * @param {object} item        - The target item.
 * @param {string} suggestion  - The target suggestion.
 * @param {number} int         - Integer key of the word.
 * @param {object} deletedItem - Considered deleted item.
 * @param {SymSpell}
 */
function addLowestDistance(words, verbosity, item, suggestion, int, deletedItem) {
  const first = item.suggestions.values().next().value;

  if (verbosity < 2 &&
      item.suggestions.size > 0 &&
      words[first].length - deletedItem.length > suggestion.length - deletedItem.length) {
    item.suggestions = new Set();
    item.count = 0;
  }

  if (verbosity === 2 ||
      !item.suggestions.size ||
      words[first].length - deletedItem.length >= suggestion.length - deletedItem.length) {
    item.suggestions.add(int);
  }
}

/**
 * Custom Damerau-Levenshtein used by the algorithm.
 *
 * @param  {string} source - First string.
 * @param  {string} target - Second string.
 * @return {number}        - The distance.
 */
function damerauLevenshtein(source, target) {
  const m = source.length,
        n = target.length,
        H = [[]],
        INF = m + n,
        sd = new Map();

  H[0][0] = INF;

  for (let i = 0; i <= m; i++) {
    if (!H[i + 1])
      H[i + 1] = [];
    H[i + 1][1] = i;
    H[i + 1][0] = INF;
  }

  for (let j = 0; j <= n; j++) {
    H[1][j + 1] = j;
    H[0][j + 1] = INF;
  }

  const st = source + target;

  for (let i = 0, l = st.length; i < l; i++) {
    const letter = st[i];

    if (!sd.has(letter))
      sd.set(letter, 0);
  }

  // Iterating
  for (let i = 1; i <= m; i++) {
    let DB = 0;

    for (let j = 1; j <= n; j++) {
      const i1 = sd.get(target[j - 1]),
            j1 = DB;

      if (source[i - 1] === target[j - 1]) {
        H[i + 1][j + 1] = H[i][j];
        DB = j;
      }
      else {
        H[i + 1][j + 1] = Math.min(
          H[i][j],
          H[i + 1][j],
          H[i][j + 1]
        ) + 1;
      }

      H[i + 1][j + 1] = Math.min(
        H[i + 1][j + 1],
        H[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1)
      );
    }

    sd.set(source[i - 1], i);
  }

  return H[m + 1][n + 1];
}

/**
 * Lookup function.
 *
 * @param  {object} dictionary  - A SymSpell dictionary.
 * @param  {array}  words       - Unique words list.
 * @param  {number} verbosity   - Verbosity level.
 * @param  {number} maxDistance - Maximum distance.
 * @param  {number} maxLength   - Maximum word length in the dictionary.
 * @param  {string} input       - Input string.
 * @return {array}              - The list of suggestions.
 */
function lookup(dictionary, words, verbosity, maxDistance, maxLength, input) {
  const length = input.length;

  if (length - maxDistance > maxLength)
    return [];

  const candidates = [input],
        candidateSet = new Set(),
        suggestionSet = new Set();

  let suggestions = [];

  // Exhausting every candidates
  while (candidates.length > 0) {
    const candidate = candidates.shift();

    // Early termination
    if (
      verbosity < 2 &&
      suggestions.length > 0 &&
      length - candidate.length > suggestions[0].distance
    )
      break;

    let item = dictionary[candidate];

    if (item !== undefined) {
      if (typeof item === 'number')
        item = createDictionaryItem(item);

      if (item.count > 0 && !suggestionSet.has(candidate)) {
        suggestionSet.add(candidate);

        const suggestItem = createSuggestionItem(
          candidate,
          length - candidate.length,
          item.count
        );

        suggestions.push(suggestItem);

        // Another early termination
        if (verbosity < 2 && length - candidate.length === 0)
          break;
      }

      // Iterating over the item's suggestions
      item.suggestions.forEach(index => {
        const suggestion = words[index];

        // Do we already have this suggestion?
        if (suggestionSet.has(suggestion))
          return;

        suggestionSet.add(suggestion);

        // Computing distance between candidate & suggestion
        let distance = 0;

        if (input !== suggestion) {
          if (suggestion.length === candidate.length) {
            distance = length - candidate.length;
          }
          else if (length === candidate.length) {
            distance = suggestion.length - candidate.length;
          }
          else {
            let ii = 0,
                jj = 0;

            const l = suggestion.length;

            while (
              ii < l &&
              ii < length &&
              suggestion[ii] === input[ii]
            ) {
              ii++;
            }

            while (
              jj < l - ii &&
              jj < length &&
              suggestion[l - jj - 1] === input[length - jj - 1]
            ) {
              jj++;
            }

            if (ii > 0 || jj > 0) {
              distance = damerauLevenshtein(
                suggestion.substr(ii, l - ii - jj),
                input.substr(ii, length - ii - jj)
              );
            }
            else {
              distance = damerauLevenshtein(suggestion, input);
            }
          }
        }

        // Removing suggestions of higher distance
        if (verbosity < 2 &&
            suggestions.length > 0 &&
            suggestions[0].distance > distance) {
          suggestions = [];
        }

        if (verbosity < 2 &&
            suggestions.length > 0 &&
            distance > suggestions[0].distance) {
          return;
        }

        if (distance <= maxDistance) {
          const target = dictionary[suggestion];

          if (target !== undefined) {
            suggestions.push(createSuggestionItem(
              suggestion,
              distance,
              target.count
            ));
          }
        }
      });
    }

    // Adding edits
    if (length - candidate.length < maxDistance) {

      if (verbosity < 2 &&
          suggestions.length > 0 &&
          length - candidate.length >= suggestions[0].distance)
        continue;

      for (let i = 0, l = candidate.length; i < l; i++) {
        const deletedItem = (
          candidate.substring(0, i) +
          candidate.substring(i + 1)
        );

        if (!candidateSet.has(deletedItem)) {
          candidateSet.add(deletedItem);
          candidates.push(deletedItem);
        }
      }
    }
  }

  if (verbosity === 0)
    return suggestions.slice(0, 1);

  return suggestions;
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
    this.maxDistance = typeof options.maxDistance === 'number' ?
      options.maxDistance :
      DEFAULT_MAX_DISTANCE;
    this.verbosity = typeof options.verbosity === 'number' ?
      options.verbosity :
      DEFAULT_VERBOSITY;

    // Sanity checks
    if (typeof this.maxDistance !== 'number' || this.maxDistance <= 0)
      throw Error('talisman/structure/symspell.constructor: invalid `maxDistance` option. Should be a integer greater than 0.');

    if (!VERBOSITY.has(this.verbosity))
      throw Error('talisman/structure/symspell.constructor: invalid `verbosity` option. Should be either 0, 1 or 2.');
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
            addLowestDistance(
              this.words,
              this.verbosity,
              target,
              word,
              number,
              deletedItem
            );
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
   * Method used to search for the desired input.
   *
   * @param  {string} input - Input query.
   * @return {array}        - The found suggestions.
   */
  search(input) {
    return lookup(
      this.dictionary,
      this.words,
      this.verbosity,
      this.maxDistance,
      this.maxLength,
      input
    );
  }
}
