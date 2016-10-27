/**
 * Talisman stemmers/spanish/unine
 * ================================
 *
 * The UniNE (University of Neuchâtel) stemmers for the Spanish language.
 *
 * [Reference]:
 * http://members.unine.ch/jacques.savoy/clef/
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
 * Function stemming the given world using the minimal UniNE algorithm for the
 * Spanish language.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export function minimal(word) {
  if (word.length < 5)
    return word;

  for (let i = 0, l = word.length; i < l; i++) {
    const letter = word[i];

    switch (letter) {
      case 'à':
      case 'á':
      case 'â':
      case 'ä':
        word = replaceAt(word, i, 'a');
        break;
      case 'ò':
      case 'ó':
      case 'ô':
      case 'ö':
        word = replaceAt(word, i, 'o');
        break;
      case 'è':
      case 'é':
      case 'ê':
      case 'ë':
        word = replaceAt(word, i, 'e');
        break;
      case 'ù':
      case 'ú':
      case 'û':
      case 'ü':
        word = replaceAt(word, i, 'u');
        break;
      case 'ì':
      case 'í':
      case 'î':
      case 'ï':
        word = replaceAt(word, i, 'i');
        break;
      default:
    }
  }

  const lastLetter = word[word.length - 1];

  if (lastLetter === 'o' || lastLetter === 'a' || lastLetter === 'e')
    return word.slice(0, -1);

  if (lastLetter === 's') {
    const l2 = word[word.length - 2],
          l3 = word[word.length - 3],
          l4 = word[word.length - 4];

    if (l2 === 'e' && l3 === 's' && l4 === 'e')
      return word.slice(0, -2);

    if (l2 === 'e' && l3 === 'c') {
      word = replaceAt(word, word.length - 3, 'z');
      return word.slice(0, - 2);
    }

    if (l2 === 'o' || l2 === 'a' || l2 === 'e')
      return word.slice(0, -2);
  }

  return word;
}

export default minimal;
