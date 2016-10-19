/**
 * Talisman keyers/skeleton
 * =========================
 *
 * Keyer taking a string and normalizing it into a "skeleton key".
 *
 * [Article]:
 * Pollock, Joseph J. and Antonio Zamora. 1984. "Automatic Spelling Correction
 * in Scientific and Scholarly Text." Communications of the ACM, 27(4).
 * 358--368.
 */
import deburr from 'lodash/deburr';

// TODO: check source

/**
 * Constants.
 */
const UNDESIRABLES = /[^A-Z]/g,
      VOWELS = new Set('AEIOU');

/**
 * Helpers.
 */
function consume(set) {
  return Array.from(set).join('');
}

/**
 * Skeleton key function.
 *
 * @param  {string} string - Target string.
 * @return {string}        - The skeleton key.
 */
export default function skeleton(string) {

  // Normalizing case
  string = string.toUpperCase();

  // Deburring
  string = deburr(string);

  // Dropping useless characters
  string = string.replace(UNDESIRABLES, '');

  // Composing the key
  const firstLetter = string[0];

  if (!firstLetter)
    return '';

  const consonants = new Set(),
        vowels = new Set();

  for (let i = 1, l = string.length; i < l; i++) {
    const letter = string[i];

    if (letter === firstLetter)
      continue;

    if (VOWELS.has(letter))
      vowels.add(letter);
    else
      consonants.add(letter);
  }

  return firstLetter + consume(consonants) + consume(vowels);
}
