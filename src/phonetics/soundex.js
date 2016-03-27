/**
 * Talisman phonetics/soundex
 * ===========================
 *
 * The Soundex algorithm.
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

/**
 * Helpers.
 */
function pad(code) {
  while (code.length < 4)
    code += '0';
  return code.slice(0, 4);
}

/**
 * Function taking a single name and computing its Soundex code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The soundex code.
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

  // Encoding the tail
  if (tail.charAt(0) === TRANSLATIONS[firstLetter])
    tail = tail.slice(1);

  // Composing the code from the tail
  const code = squeeze(tail).replace(/0/g, '');

  return pad(firstLetter + code);
}
