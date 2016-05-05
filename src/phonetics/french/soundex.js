/**
 * Talisman phonetics/french/soundex
 * ==================================
 *
 * A version of the Soundex algorithm targeting the French language.
 *
 * [Reference]:
 * http://www-info.univ-lemans.fr/~carlier/recherche/soundex.html
 * http://sqlpro.developpez.com/cours/soundex/
 */
import deburr from 'lodash/deburr';
import {translation, squeeze} from '../../helpers';

/**
 * Translations.
 */
const TRANSLATIONS = translation(
  'AEIOUYWHBPCKQDTLMNRGJSXZFV',
  '000000DD112223345567788899'
);

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

  // Converting ç & œ
  name = name.toUpperCase()
    .replace(/Ç/g, 'S')
    .replace(/Œ/g, 'E');

  // Preparing the string
  name = deburr(name).replace(/[^A-Z]/g, '');

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
