/**
 * Talisman phonetics/french/soundex
 * ==================================
 *
 * A version of the Soundex algorithm targeting the French language.
 *
 * [Author]: Mark Pilgrim
 */
import deburr from 'lodash/deburr';
import {squeeze} from '../../helpers';

/**
 * Translations.
 */

// TODO: get the correct encoding
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      CODES = '0123012022455012623010202'.split('');

const TRANSLATIONS = {};

LETTERS.forEach((letter, i) => TRANSLATIONS[letter] = CODES[i]);

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
    throw Error('talisman/phonetics/french/soundex: the given name is not a string.');

  // Preparing the string
  name = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  const firstLetter = name.charAt(0);

  // Process the code for the name's tail
  let tail = '';

  for (let i = 1, l = name.length; i < l; i++)
    tail += TRANSLATIONS[name[i]];

  // Dropping first code's letter if duplicate
  if (tail.charAt(0) === TRANSLATIONS[firstLetter])
    tail = tail.slice(1);

  // Composing the code from the tail
  const code = squeeze(tail).replace(/0/g, '');

  return pad(firstLetter + code);
}
