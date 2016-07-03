/**
 * Talisman phonetics/lein
 * ========================
 *
 * The Lein name coding procedure.
 *
 * [Reference]:
 * http://naldc.nal.usda.gov/download/27833/PDF
 */
import deburr from 'lodash/deburr';
import {squeeze, translation} from '../helpers';

/**
 * Constants.
 */
const DROPPED = /[AEIOUYWH]/g;

const TRANSLATION = translation('DTMNLRBFPVCJKGQSXZ', '112233444455555555');

/**
 * Helpers.
 */
function pad(code) {
  return (code + '0000').slice(0, 4);
}

/**
 * Function taking a single name and computing its lein code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The lein code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function lein(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/lein: the given name is not a string.');

  let code = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z\s]/g, '');

  // 1-- Keeping the first letter
  const first = code[0];
  code = code.slice(1);

  // 2-- Dropping vowels and Y, W & H
  code = code.replace(DROPPED, '');

  // 3-- Dropping consecutive duplicates and truncating to 4 characters
  code = squeeze(code).slice(0, 4);

  // 4-- Translations
  const backup = code;
  code = '';

  for (let i = 0, l = backup.length; i < l; i++)
    code += TRANSLATION[backup[i]] || backup[i];

  return pad(first + code);
}
