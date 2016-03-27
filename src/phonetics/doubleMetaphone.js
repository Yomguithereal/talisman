/* eslint no-constant-condition: 0 */
/**
 * Talisman phonetics/doubleMetaphone
 * ===================================
 *
 * The double metaphone algorithm.
 */

/**
 * Lookups.
 */
const LOOKUPS = {
  B(string, pos) {
    return ['P', 'P', string.slice(pos + 1, 1) === 'B' ? 2 : 1];
  }
};

/**
 * Helpers.
 */
const STARTING_REGEX = /^GN|KN|PN|WR|PS$/;

const SLAVO_GERMANIC_REGEX = /W|K|CZ|WITZ/;

function isSlavoGermanic(string) {
  return SLAVO_GERMANIC_REGEX.test(string);
}

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

function isVowel(string) {
  return string.length === 1 && VOWELS.has(string);
}

/**
 * Function taking a single word and computing its double metaphone code.
 *
 * @param  {string}  word - The word to process.
 * @return {string}       - The double metaphone code.
 *
 * @throws {Error} The function expects the word to be a string.
 */
export default function doubleMetaphone(word) {
  if (typeof word !== 'string')
    throw Error('talisman/phonetics/doubleMetaphone: the given word is not a string.');

  // Preparing the word
  const preparedWord = word.toUpperCase() + '     ';

  // Defining the start position & finding necessary indexes
  const startPosition = STARTING_REGEX.test(preparedWord.slice(0, 2)) ? 1 : 0,
        length = word.length,
        lastIndex = length - 1;

  // Codes
  const primary = [],
        secondary = [];

  // Iterating
  let pos = startPosition;

  while (true) {

    if (pos > length || (primary.length >= 4 && secondary.length >= 4))
      break;

    // Lookup the current letter
    const letter = preparedWord[pos];

    let offset = 1;

    // Vowel lookup
    if (isVowel(letter)) {
      if (!pos) {
        primary.push('A');
        secondary.push('A');
      }
    }

    // Consonant lookup
    const method = LOOKUPS[letter];

    if (method) {
      const [
       one = null,
       two = null,
       newOffset = 1
      ] = method(preparedWord, pos, lastIndex, length);

      offset = newOffset;

      if (one)
        primary.push(one);
      if (two)
        secondary.push(two);
    }

    // Incrementing position
    pos += offset;
  }
}
