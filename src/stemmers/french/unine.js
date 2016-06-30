/**
 * Talisman stemmers/french/unine
 * ===============================
 *
 * The UniNE stemmers for the French language.
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
 */

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
export function complex(word) {
  // WIP
  return word;
}
