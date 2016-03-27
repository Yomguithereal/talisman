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
  },

  Ç() {
    return ['S', 'S', 1];
  },

  D(string, pos) {
    if (string.slice(pos, 2) === 'DG') {
      return /^I|E|Y$/.test(string.slice(pos + 2, 1)) ?
        ['J', 'J', 3] :
        [['T', 'K'], ['T', 'K'], 2];
    }

    return ['T', 'T', /^D(T|D)$/.test(string.slice(pos, 2)) ? 2 : 1];
  },

  F(string, pos) {
    return ['F', 'F', string.slice(pos + 1, 1) === 'F' ? 2 : 1];
  },

  GH(string, pos) {
    if (pos && !isVowel(string.slice(pos - 1), 1)) {
      return ['K', 'K', 2];
    }

    if (!pos) {
      return string.slice(pos + 2, 1) === 'I' ?
        ['J', 'J', 2] :
        ['K', 'K', 2];
    }

    if ((pos > 1 && /^B|H|D$/.test(string.slice(pos - 2, 1))) ||
        (pos > 2 && /^B|H|D$/.test(string.slice(pos - 3, 1))) ||
        (pos > 3 && /^B|H$/.test(string.slice(pos - 4, 1)))) {
      return [null, null, 2];
    }

    if (pos > 2 &&
        string.slice(pos - 1, 1) === 'U' &&
        /^C|G|L|R|T$/.test(string.slice(pos - 3, 1))) {
      return ['F', 'F', 2];
    }

    if (pos && string.slice(pos - 1, 1) !== 'I') {
      return ['K', 'K', 2];
    }

    return [null, null, 2];
  },

  GN(string, pos) {
    if (pos === 1 && isVowel(string.slice(0, 1)) && !isSlavoGermanic(string)) {
      return [['K', 'N'], 'N', 2];
    }

    if (string.slice(pos + 2, 2) !== 'EY' &&
        string.slice(pos + 1, 1) !== 'Y' &&
        !isSlavoGermanic(string)) {
      return ['N', ['K', 'N'], 2];
    }

    return [['K', 'N'], ['K', 'N'], 2];
  },

  G(string, pos) {
    const nextLetter = string.slice(pos + 1, 1),
          nextPair = string.slice(pos + 1, 2);

    if (nextLetter === 'H') {
      return LOOKUPS.GH(string, pos);
    }

    if (nextLetter === 'N') {
      return LOOKUPS.GN(string, pos);
    }

    if (nextPair === 'LI' && !isSlavoGermanic(string)) {
      return [['K', 'L'], 'L', 2];
    }

    if (!pos &&
        (nextLetter === 'Y' ||
         /^(E(S|P|B|L|Y|I|R)|I(B|L|N|E))$/.test(nextPair))) {
      return ['K', 'J', 2];
    }

    if ((nextPair === 'ER' || nextLetter === 'Y') &&
        !/^(D|R|M)ANGER$/.test(string.slice(0, 6)) &&
        !/^E|I$/.test(string.slice(pos - 1, 1)) &&
        !/^(R|O)GY$/.test(string.slice(pos - 1, 3))) {
      return ['K', 'J', 2];
    }

    if (/^E|I|Y$/.test(nextLetter) ||
        /^(A|O)GGI$/.test(string.slice(pos - 1, 4))) {

      if (/^V(A|O)N /.test(string.slice(0, 4)) ||
          string.slice(0, 3) === 'SCH' ||
          string.slice(pos + 1, 2 === 'ET')) {
        return ['K', 'K', 2];
      }

      return string.slice(pos + 1, 4) === 'IER ' ?
        ['J', 'J', 2] :
        ['J', 'K', 2];
    }

    return ['K', 'K', nextLetter === 'G' ? 2 : 1];
  },

  H(string, pos) {
    if ((!pos || isVowel(string.slice(pos - 1, 1))) &&
        isVowel(string.slice(pos + 1, 1))) {
      return ['H', 'H', 2];
    }

    return [null, null, 1];
  },

  J(string, pos, lastIndex) {
    if (string.slice(pos, 4) === 'JOSE' ||
        string.slice(0, 4) === 'SAN ') {

      if ((!pos && string.slice(pos + 4, 1) === ' ') ||
          string.slice(0, 4) === 'SAN ') {
        return ['H', 'H', 1];
      }

      return ['J', 'H', 1];
    }

    const offset = string.slice(pos + 1, 1) === 'J' ? 2 : 1;

    if (!pos && string.slice(pos, 4) !== 'JOSE') {
      return ['J', 'A', offset];
    }

    if (isVowel(string.slice(pos - 1, 1)) &&
        !isSlavoGermanic(string) &&
        /^A|O$/.test(string.slice(pos + 1, 1))) {
      return ['J', 'J', offset];
    }

    if (lastIndex === pos) {
      return ['J', null, offset];
    }

    if (!/^L|T|K|S|N|M|B|Z$/.test(string.slice(pos + 1, 1)) &&
        !/^S|K|L$/.test(string.slice(pos - 1, 1))) {
      return ['J', 'J', offset];
    }

    return [null, null, offset];
  },

  K(string, pos) {
    return ['K', 'K', string.slice(pos + 1, 1) === 'K' ? 2 : 1];
  },

  L(string, pos, lastIndex, length) {
    if (string.slice(pos + 1, 1) === 'L') {

      if ((pos === length - 3 &&
           /^(ILL(O|A)|ALLE)$/.test(string.slice(pos - 1, 4))) ||
          ((/^(A|O)S$/.test(string.slice(lastIndex - 1, 2) ||
            /^A|O$/.test(string.slice(lastIndex, 1)))) &&
            string.slice(pos - 1, 4) === 'ALLE')) {
        return ['L', null, 2];
      }

      return ['L', 'L', 2];
    }

    return ['L', 'L', 1];
  },

  M(string, pos, lastIndex) {
    if (((string.slice(pos - 1, 3) === 'UMB') &&
          (pos === lastIndex - 1 || string.slice(pos + 2, 2) === 'ER')) ||
        string.slice(pos + 1, 1) === 'M') {
      return ['M', 'M', 2];
    }

    return ['M', 'M', 1];
  },

  N(string, pos) {
    return ['N', 'N', string.slice(pos + 1, 1) === 'N' ? 2 : 1];
  },

  Ñ() {
    return ['N', 'N', 1];
  },

  P(string, pos) {
    if (string.slice(pos + 1, 1) === 'H') {
      return ['F', 'F', 2];
    }

    return ['P', 'P', /^P|B$/.test(string.slice(pos + 1, 1)) ? 2 : 1];
  },

  Q(string, pos) {
    return ['K', 'K', string.slice(pos + 1, 1) === 'Q' ? 2 : 1];
  },

  R(string, pos, lastIndex) {
    const offset = string.slice(pos + 1, 1) === 'R' ? 2 : 1;

    if (pos === lastIndex &&
        !isSlavoGermanic(string) &&
        string.slice(pos - 2, 2) === 'IE' &&
        !/^M(E|A)$/.test(string.slice(pos - 4, 2))) {
      return [null, 'R', offset];
    }

    return ['R', 'R', offset];
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
