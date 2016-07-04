/**
 * Talisman stemmers/s-stemmer
 * ============================
 *
 * Implementation of the English "S-Stemmer".
 *
 * [Reference]:
 * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.9828&rep=rep1&type=pdf
 *
 * [Article]:
 * Donna Harman (1991) How effective is suffixing?
 * Journal of the American Society for Information Science (vol. 42 issue 1).
 *
 * [Note]:
 * I cannot find the original author of the algorithm, only its explanation in
 * the linked article.
 */

/**
 * Function stemming the given world using the "S-Stemmer".
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function sStemmer(word) {
  const length = word.length;

  if (length < 3 || word[length - 1] !== 's')
    return word;

  const penultimate = word[length - 2];

  if (penultimate === 'u' || penultimate === 's')
    return word;

  if (penultimate === 'e') {
    if (length > 3 &&
        word[length - 3] === 'i' &&
        word[length - 4] !== 'a' &&
        word[length - 4] !== 'e') {
      return word.slice(0, -3) + 'y';
    }

    if (word[length - 3] === 'i' ||
        word[length - 3] === 'a' ||
        word[length - 3] === 'o' ||
        word[length - 3] === 'e') {
      return word;
    }
  }

  return word.slice(0, -1);
}
