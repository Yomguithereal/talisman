/**
 * Talisman phonetics/soundex
 * ===========================
 *
 * The Soundex algorithm.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Soundex
 *
 * [Authors]:
 * Robert C. Russel
 * Margaret King Odell
 */
import {squeeze} from '../helpers';
import deburr from 'lodash/deburr';

/**
 * Translations.
 */
const LETTERS = 'AEIOUYWHBPFVCSKGJQXZDTLMNR'.split(''),
      CODES = '000000DD111122222222334556'.split('');

const TRANSLATIONS = {};

LETTERS.forEach((letter, i) => TRANSLATIONS[letter] = CODES[i]);

const REFINED_LETTERS = 'AEIOUYWHBPFVCKSGJQXZDTLMNR'.split(''),
      REFINED_CODES = '000000DD112233344555667889'.split('');

const REFINED_TRANSLATIONS = {};

REFINED_LETTERS.forEach((letter, i) => REFINED_TRANSLATIONS[letter] = REFINED_CODES[i]);

/**
 * Helpers.
 */
function pad(code) {
  return (code + '0000').slice(0, 4);
}

/**
 * Function taking a single name and computing its Soundex code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The Soundex code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function soundex(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/soundex: the given name is not a string.');

  name = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  const firstLetter = name.charAt(0);

  // Process the code for the name's tail
  let tail = '';

  for (let i = 1, l = name.length; i < l; i++) {
    if (TRANSLATIONS[name[i]] !== 'D')
      tail += TRANSLATIONS[name[i]];
  }

  // Dropping first code's letter if duplicate
  if (tail.charAt(0) === TRANSLATIONS[firstLetter])
    tail = tail.slice(1);

  // Composing the code from the tail
  const code = squeeze(tail).replace(/0/g, '');

  return pad(firstLetter + code);
}

/**
 * Function taking a single name and computing its refined Soundex code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The refined Soundex code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export function refined(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/soundex#refined: the given name is not a string.');

  name = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  const firstLetter = name.charAt(0);

  // Process the code for the name's tail
  let tail = '';

  for (let i = 0, l = name.length; i < l; i++) {
    if (REFINED_TRANSLATIONS[name[i]] !== 'D')
      tail += REFINED_TRANSLATIONS[name[i]];
  }

  // Composing the code from the tail
  const code = squeeze(tail);

  return firstLetter + code;
}
