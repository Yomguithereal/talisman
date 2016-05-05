/**
 * Talisman phonetics/french/soundex2
 * ===================================
 *
 * French phonetic algorithm loosely based upon the classifcal Soundex.
 *
 * [Reference]:
 * http://www-info.univ-lemans.fr/~carlier/recherche/soundex.html
 */
import deburr from 'lodash/deburr';
import {squeeze} from '../../helpers';

/**
 * Rules.
 */
const GROUPS = [
  [/GU([IE])/g, 'K$1'],
  [/G([AO])/g, 'K$1'],
  [/GU/g, 'K'],
  [/C([AOU])/g, 'K$1'],
  [/(?:Q|CC|CK)/g, 'K']
];

const PREFIXES = [

  // Note: the way the algorithm is described, it is highly probable that
  // the 'MAC' rule cannot work because of precendent modifications
  ['MAC', 'MCC'],
  ['SCH', 'SSS'],
  ['ASA', 'AZA'],
  ['KN', 'NN'],
  ['PH', 'FF'],
  ['PF', 'FF']
];

/**
 * Helpers.
 */
function pad(code) {
  return code.slice(0, 4);
}

/**
 * Function taking a single name and computing its Soundex2 code.
 *
 * Note: the description of the algorithm says to pad the code using spaces, but
 * as I cannot see why one would do that (plus it is quite error-prone when
 * debugging), I decided to drop it.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The Soundex2 code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function soundex2(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/french/soundex2: the given name is not a string.');

  let code = deburr(name.trim())
    .toUpperCase()
    .replace(/[^A-Z]/, '');

  // Replacing some letter groups
  for (let i = 0, l = GROUPS.length; i < l; i++)
    code = code.replace(...GROUPS[i]);

  // Replacing vowels
  code = code.charAt(0) + code.slice(1).replace(/[AEIOU]/g, 'A');

  // Replacing prefixes
  for (let i = 0, l = PREFIXES.length; i < l; i++) {
    const [prefix, replacement] = PREFIXES[i],
          length = prefix.length;

    if (code.slice(0, length) === prefix)
      code = replacement + code.slice(length);
  }

  // Handling the letter H
  code = code.replace(/([^CS])H/g, '$1');

  // Handling the letter Y
  code = code.replace(/([^A])Y/g, '$1');

  // Removing some endings
  code = code.replace(/[ADTS]$/, '');

  // Removing non-leading vowels
  code = code.charAt(0) + code.slice(1).replace(/A/g, '');

  return pad(squeeze(code));
}
