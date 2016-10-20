/**
 * Talisman keyers/omission
 * =========================
 *
 * Keyer taking a string and normalizing it into a "omission key".
 *
 * [Reference]:
 * http://dl.acm.org/citation.cfm?id=358048
 *
 * [Article]:
 * Pollock, Joseph J. and Antonio Zamora. 1984. "Automatic Spelling Correction
 * in Scientific and Scholarly Text." Communications of the ACM, 27(4).
 * 358--368.
 */
import deburr from 'lodash/deburr';

/**
 * Constants.
 */
const UNDESIRABLES = /[^A-Z]/g,
      CONSONANTS = 'JKQXZVWYBFMGPDHCLNTSR',
      CONSONANTS_SET = new Set(CONSONANTS);

/**
 * omission key function.
 *
 * @param  {string} string - Target string.
 * @return {string}        - The omission key.
 */
export default function omission(string) {

  // Normalizing case
  string = string.toUpperCase();

  // Deburring
  string = deburr(string);

  // Dropping useless characters
  string = string.replace(UNDESIRABLES, '');

  // Composing the key
  let key = '';
  const vowels = new Set();

  // Add consonants in order
  const letters = new Set(string);

  for (let i = 0, l = CONSONANTS.length; i < l; i++) {
    const consonant = CONSONANTS[i];

    if (letters.has(consonant))
      key += consonant;
  }

  // Add vowels in order they appeared in the word
  for (let i = 0, l = string.length; i < l; i++) {
    const letter = string[i];

    if (!CONSONANTS_SET.has(letter) && !vowels.has(letter)) {
      vowels.add(letter);
      key += letter;
    }
  }

  return key;
}
