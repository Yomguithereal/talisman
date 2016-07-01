/**
 * Talisman stemmers/french/unine
 * ===============================
 *
 * The UniNE (University of Neuchâtel) stemmers for the French language.
 *
 * [Reference]:
 * http://members.unine.ch/jacques.savoy/clef/
 *
 * [Articles]:
 * Savoy, J. (1993). Stemming of French words based on grammatical category.
 * Journal of the American Society for Information Science, 44(1), 1-9.
 *
 * Savoy, J. (1999). A stemming procedure and stopword list for general French
 * corpora. Journal of the American Society for Information Science, 50(10),
 * 944-952.
 *
 * [Note]:
 * It should be possible to fix some bug relevant to SOLR's implementation.
 */

/**
 * Function replacing the character at the given index in the target string.
 *
 * @param  {string} string - The target string.
 * @param  {number} index  - Index of the character to substitute.
 * @param  {string} char   - The replacing character.
 * @return {string}        - The resulting string.
 */
function replaceAt(string, index, char) {
  return string.substr(0, index) + char + string.substr(index + char.length);
}

/**
 * Function deleting the character at the given index in the target string.
 *
 * @param  {string} string - The target string.
 * @param  {number} index  - Index of the character to substitute.
 * @return {string}        - The resulting string.
 */
function deleteAt(string, index) {
  return string.substr(0, index) + string.substr(index + 1);
}

/**
 * Function checking whether the string has the given suffix.
 *
 * @param  {string} string - The target string.
 * @param  {number} length - Length offset.
 * @param  {string} suffix - The considered suffix.
 * @return {boolean}
 */
function endsWith(string, length, suffix) {
  if (suffix.length > length)
    return false;
  return string.slice(0, length).slice(-suffix.length) === suffix;
}

/**
 * Function stemming the given world using the minimal UniNE algorithm for the
 * French language.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export function minimal(word) {
  if (word.length < 6)
    return word;

  let length = word.length;

  if (word[length - 1] === 'x') {
    if (word[length - 3] === 'a' &&
        word[length - 2] === 'u')
      return word.slice(0, -2) + 'l';

    return word.slice(0, -1);
  }

  if (word[length - 1] === 's')
    length--;
  if (word[length - 1] === 'r')
    length--;
  if (word[length - 1] === 'e')
    length--;
  if (word[length - 1] === 'é')
    length--;
  if (word[length - 1] === word[length - 2])
    length--;

  return word.slice(0, length);
}

export default minimal;

/**
 * Function stemming the given world using the complex UniNE algorithm for the
 * French language.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
function normalize(stem, length) {
  if (length > 4) {
    for (let i = 0; i < length; i++) {
      switch (stem[i]) {
        case 'à':
        case 'á':
        case 'â':
          stem = replaceAt(stem, i, 'a');
          break;
        case 'ô':
          stem = replaceAt(stem, i, 'o');
          break;
        case 'è':
        case 'é':
        case 'ê':
          stem = replaceAt(stem, i, 'e');
          break;
        case 'ù':
        case 'û':
          stem = replaceAt(stem, i, 'u');
          break;
        case 'î':
          stem = replaceAt(stem, i, 'i');
          break;
        case 'ç':
          stem = replaceAt(stem, i, 'c');
          break;
        default:
      }
    }

    let character = stem[0];

    for (let i = 1; i < length; i++) {
      if (stem[i] === character && /[^\W\d]/.test(character)) {
        stem = deleteAt(stem, i--);
        length--;
      }
      else {
        character = stem[i];
      }
    }
  }

  if (length > 4 && endsWith(stem, length, 'ie'))
    length -= 2;

  if (length > 4) {
    if (stem[length - 1] === 'r')
      length--;
    if (stem[length - 1] === 'e')
      length--;
    if (stem[length - 1] === 'e')
      length--;
    if (stem[length - 1] === stem[length - 2] && /[^\W\d]/.test(stem[length - 1]))
      length--;
  }

  return stem.slice(0, length);
}

export function complex(word) {
  let length = word.length,
      stem = word;

  if (length > 5 && stem[length - 1] === 'x') {
    if (stem[length - 3] === 'a' &&
        stem[length - 2] === 'u' &&
        stem[length - 4] !== 'e') {
      stem = replaceAt(stem, length - 2, 'l');
    }
    length--;
  }

  if (length > 3 && stem[length - 1] === 'x')
    length--;

  if (length > 3 && stem[length - 1] === 's')
    length--;

  if (length > 9 && endsWith(stem, length, 'issement')) {
    length -= 6;
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 8 && endsWith(stem, length, 'issant')) {
    length -= 4;
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 6 && endsWith(stem, length, 'ement')) {
    length -= 4;

    if (length > 3 && endsWith(stem, length, 'ive')) {
      length--;
      stem = replaceAt(stem, length - 1, 'f');
    }

    return normalize(stem, length);
  }

  if (length > 11 && endsWith(stem, length, 'ficatrice')) {
    length -= 5;
    stem = replaceAt(stem, length - 2, 'e');
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 10 && endsWith(stem, length, 'ficateur')) {
    length -= 4;
    stem = replaceAt(stem, length - 2, 'e');
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 9 && endsWith(stem, length, 'catrice')) {
    length -= 3;
    stem = replaceAt(stem, length - 4, 'q');
    stem = replaceAt(stem, length - 3, 'u');
    stem = replaceAt(stem, length - 2, 'e');
    return normalize(stem, length);
  }

  if (length > 8 && endsWith(stem, length, 'cateur')) {
    length -= 2;
    stem = replaceAt(stem, length - 4, 'q');
    stem = replaceAt(stem, length - 3, 'u');
    stem = replaceAt(stem, length - 2, 'e');
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 8 && endsWith(stem, length, 'atrice')) {
    length -= 4;
    stem = replaceAt(stem, length - 2, 'e');
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 7 && endsWith(stem, length, 'ateur')) {
    length -= 3;
    stem = replaceAt(stem, length - 2, 'e');
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 6 && endsWith(stem, length, 'trice')) {
    length--;
    stem = replaceAt(stem, length - 3, 'e');
    stem = replaceAt(stem, length - 2, 'u');
    stem = replaceAt(stem, length - 1, 'r');
  }

  if (length > 5 && endsWith(stem, length, 'ième'))
    return normalize(stem, length - 4);

  if (length > 7 && endsWith(stem, length, 'teuse')) {
    length -= 2;
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 6 && endsWith(stem, length, 'teur')) {
    length--;
    stem = replaceAt(stem, length - 1, 'r');
    return normalize(stem, length);
  }

  if (length > 5 && endsWith(stem, length, 'euse'))
    return normalize(stem, length - 2);

  if (length > 8 && endsWith(stem, length, 'ère')) {
    length--;
    stem = replaceAt(stem, length - 2, 'e');
    return normalize(stem, length);
  }

  if (length > 7 && endsWith(stem, length, 'ive')) {
    length--;
    stem = replaceAt(stem, length - 1, 'f');
    return normalize(stem, length);
  }

  if (length > 4 &&
      (endsWith(stem, length, 'folle') ||
       endsWith(stem, length, 'molle'))) {
    length -= 2;
    stem = replaceAt(stem, length - 1, 'u');
    return normalize(stem, length);
  }

  if (length > 9 && endsWith(stem, length, 'nnelle'))
    return normalize(stem, length - 5);

  if (length > 9 && endsWith(stem, length, 'nnel'))
    return normalize(stem, length - 3);

  if (length > 4 && endsWith(stem, length, 'ète')) {
    length--;
    stem = replaceAt(stem, length - 2, 'e');
  }

  if (length > 8 && endsWith(stem, length, 'ique'))
      length -= 4;

  if (length > 8 && endsWith(stem, length, 'esse'))
    return normalize(stem, length - 3);

  if (length > 7 && endsWith(stem, length, 'inage'))
    return normalize(stem, length - 3);

  if (length > 9 && endsWith(stem, length, 'isation')) {
    length -= 7;
    if (length > 5 && endsWith(stem, length, 'ual'))
      stem = replaceAt(stem, length - 2, 'e');
    return normalize(stem, length);
  }

  if (length > 9 && endsWith(stem, length, 'isateur'))
    return normalize(stem, length - 7);

  if (length > 8 && endsWith(stem, length, 'ation'))
    return normalize(stem, length - 5);

  if (length > 8 && endsWith(stem, length, 'ition'))
    return normalize(stem, length - 5);

  return normalize(stem, length);
}
