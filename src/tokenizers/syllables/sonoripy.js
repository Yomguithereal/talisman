/**
 * Talisman tokenizers/syllables/sonoripy
 * =======================================
 *
 * Language-independent syllabification algorithm following the sonority
 * sequencing principle. As opposed to LegaliPy, this algorithm doesn't need
 * to be trained on word tokens but must be provided with the target
 * language's sonority hierarchy.
 *
 * [Reference]:
 * https://github.com/henchc/SonoriPy
 *
 * [Authors]:
 * Christopher Hench (UC Berkeley)
 * Alex Estes
 */

/**
 * Constants.
 */
const DEFAULT_HIERARCHY = {
  vowels: 'aeiouy',
  approximates: '',
  nasals: '',
  fricatives: '',
  affricates: '',
  stops: 'bcdgtkpqvxhsfzj'
};

const MAP = {
  vowels: 5,
  approximates: 4,
  nasals: 3,
  fricatives: 2,
  affricates: 1,
  stops: 0
};

/**
 * Helpers.
 */
function strip(string) {
  return string.replace(/(?:^[.:;?!()'"]+)|(?:[.:;?!()'"]+$)/g, '');
}

/**
 * Tokenizer function factory aiming at building the required function.
 *
 * @param  {object}   options              - Possible options:
 * @param  {object}   [options.hierarchy]  - Target language's hierarchy.
 * @return {function}                      - The tokenizer function.
 */
export default function createTokenizer(options) {
  options = options || {};

  const hierarchy = options.hierarchy;

  if (!hierarchy)
    throw new Error('talisman/tokenizers/syllables/sonoripy: a hierachy must be provided.');

  const sets = {};

  // Iterating on default hierarchy to ensure every key is set
  for (const k in DEFAULT_HIERARCHY)
    sets[k] = new Set(hierarchy[k] || '');

  /**
   * Created tokenizer function.
   *
   * @param  {string} word - The word to tokenize.
   * @return {array}       - The syllables as tokens.
   */
  return function(word) {

    // Normalizing the word
    const normalizedWord = strip(word);

    // Collecting information
    let vowelCount = 0;
    const syllableSet = [];

    for (let i = 0, l = normalizedWord.length; i < l; i++) {
      const letter = normalizedWord[i],
            lowerLetter = letter.toLowerCase();

      if (sets.vowels.has(lowerLetter))
        vowelCount++;

      for (const k in MAP) {
        if (sets[k].has(lowerLetter)) {
          syllableSet.push([letter, MAP[k]]);
          break;
        }
      }
    }
  };
}
