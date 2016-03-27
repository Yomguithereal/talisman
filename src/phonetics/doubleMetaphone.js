/* eslint no-constant-condition: 0 */
/**
 * Talisman phonetics/doubleMetaphone
 * ===================================
 *
 * The double metaphone algorithm.
 */

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
 * Lookups.
 */
const CHSet1 = new Set(['HARAC', 'HARIS']),
      CHSet2 = new Set(['HOR', 'HYM', 'HIA', 'HEM']),
      CHSet3 = new Set(['VAN ', 'VON ']),
      CHSet4 = new Set(['ORCHES', 'ARCHIT', 'ORCHID']),
      ChSet5 = new Set(['T', 'S']),
      CHSet6 = new Set(['A', 'O', 'U', 'E']),
      CHSet7 = new Set(['L', 'R', 'N', 'M', 'B', 'H', 'F', 'V', 'W', ' ']),
      CSet1 = new Set(['CE', 'CI']);

const LOOKUPS = {
  B(string, pos) {
    return ['P', 'P', string.slice(pos + 1, 1) === 'B' ? 2 : 1];
  },

  CH(string, pos) {
    if (pos && string.slice(pos, 4) === 'CHAE') {
      return ['K', 'X', 2];
    }

    else if (!pos &&
             (CHSet1.has(string.slice(pos + 1, 5)) ||
              CHSet2.has(string.slice(pos + 1, 3))) &&
             string.slice(0, 5) !== 'CHORE') {
      return ['K', 'K', 2];
    }

    else if (CHSet3.has(string.slice(0, 4)) ||
             string.slice(0, 3) === 'SCH' ||
             CHSet4.has(string.slice(pos - 2, 6)) ||
             ChSet5.has(string.slice(pos + 2, 1)) ||
             ((!pos || CHSet6.has(string.slice(pos - 1, 1))) &&
              CHSet7.has(string.slice(pos + 2, 1)))) {
      return ['K', 'K', 2];
    }

    else if (pos) {
      return [string.slice(0, 2) === 'MC' ? 'K' : 'X', 'K', 2];
    }

    return ['X', 'X', 2];
  },

  CC(string, pos) {
    if (/^I|E|H$/.test(string.slice(pos + 2, 1)) &&
        string.slice(pos + 2, 2) !== 'HU') {
      if ((pos === 1 && string.slice(pos - 1) === 'A') ||
          /^UCCE(E|S)$/.test(string.slice(pos - 1), 5)) {
        return [['K', 'S'], ['K', 'S'], 3];
      }
      else {
        return ['X', 'X', 3];
      }
    }

    return ['K', 'K', 2];
  },

  C(string, pos) {
    if (pos > 1 &&
        isVowel(string.slice(pos - 2), 1) &&
        string.slice(pos - 1, 3) === 'ACH' &&
        string.slice(pos + 2, 1) !== 'I' &&
        (string.slice(pos + 2, 1) !== 'E' ||
         /^(B|M)ACHER$/.test(string.slice(pos - 2, 6)))) {
      return ['K', 'K', 2];
    }

    if (!pos && string.slice(pos - 2, 6) === 'CAESAR') {
      return ['S', 'S', 2];
    }

    if (string.slice(pos, 4) === 'CHIA') {
      return ['K', 'K', 2];
    }

    if (string.slice(pos, 2) === 'CH') {
      return LOOKUPS.CH(string, pos);
    }

    if (string.slice(pos, 2) === 'CZ' &&
        string.slice(pos - 2, 4) !== 'WICZ') {
      return ['S', 'X', 2];
    }

    if (string.slice(pos, 3) === 'CIA') {
      return ['X', 'X', 3];
    }

    if (string.slice(pos + 1, 2) === 'CC' &&
        !(pos === 1 || string.slice(0, 1) === 'M')) {
      return LOOKUPS.CC(string, pos);
    }

    if (/^C(K|G|Q)$/.test(string.slice(pos, 2))) {
      return ['K', 'K', 2];
    }

    if (/^C(I|E|Y)$/.test(string.slice(pos, 2))) {
      return ['S', /^CI(O|E|A)$/.test(string.slice(pos, 3)) ? 'X' : 'S', 2];
    }

    if (/^ (C|Q|G)$/.test(string.slice(pos + 1, 2))) {
      return ['K', 'K', 2];
    }

    let offset = 1;

    if (/^C|K|Q$/.test(string.slice(pos + 1, 1)) &&
        !CSet1.has(string.slice(pos + 1, 2))) {
      offset = 2;
    }

    return ['K', 'K', offset];
  }
};

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
  let primary = [],
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
        primary = primary.concat(one);
      if (two)
        secondary = secondary.concat(two);
    }

    // Incrementing position
    pos += offset;
  }
}
