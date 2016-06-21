/**
 * Talisman phonetics/spanish/fonetico
 * ====================================
 *
 * An experimental phonetic algorithm for the Spanish language taking into
 * account some imported words from native south american languages such as
 * Quechua or Nahuatl and their Spanish transliteration.
 *
 * [Author]:
 * Guillaume Plique
 */
import {translation} from '../../helpers';

/**
 * Constants.
 */
const DIACRITICS = translation('ÁÉÍÓÚ', 'AEIOU');

/**
 * Rules.
 */
const RULES = [

  // Dropping consecutive duplicates
  [/([^L])\1+/g, '$1'],

  // Handling hard "CH"
  // NOTE: check this & Huitzilopochtli
  [/CH(?![AEIOUY])/g, 'K'],

  // Handling "CH"
  [/CH/g, '§'],

  // Handling initial "SH"
  [/^SH/g, 'ʃ'],

  // Handling soft "C"
  [/C([EIY])/g, 'S$1'],

  // Handling hard "C"
  [/C/g, 'K'],

  // Handling soft "G"
  [/G([EIY])/g, 'J$1'],

  // Handling "GUA"
  [/GUA/g, 'GWA'],

  // Handling "GU"
  [/GU/g, 'G'],

  // Handling "GÜ"
  [/GÜ/g, 'GW'],

  // Cleaning up strange remaining Ü
  [/Ü/g, 'U'],

  // Handling "QU"
  // NOTE: might be KW for some vowels
  [/QU?/g, 'K'],

  // Handling "W" sounds (HUA, OA etc. for instance)
  [/H?[UO]([AIE])/g, 'W$1'],

  // Handling "Z"
  [/Z/g, 'S'],

  // Handling "V"
  [/V/g, 'B'],

  // Handling initial "PS"
  [/^PS/g, 'S'],

  // Handling archaic "PH"
  [/PH/g, 'F'],

  // Dropping useless "H"
  [/H/g, ''],

  // Handling final "Y"
  [/Y$/g, 'I'],

  // Handling initial "XI"
  [/^XI/g, 'SI'],

  // Handling "X"
  [/X/g, 'J'],

  // "LL" -> Y
  [/LL/g, 'Y']
];

/**
 * Function taking a single word and computing its fonetico code.
 *
 * @param  {string}  word - The word to process.
 * @return {string}       - The fonetico code.
 *
 * @throws {Error} The function expects the word to be a string.
 */
export default function fonetico(word) {

  if (typeof word !== 'string')
    throw Error('talisman/phonetics/spanish/fonetico: the given word is not a string.');

  // Preparing the word by going upper-case and deburring some characters.
  word = word.toUpperCase();

  let code = '';

  for (let i = 0, l = word.length; i < l; i++)
    code += DIACRITICS[word[i]] || word[i];

  // Removing non-special characters (Ñ/Ü remaining)
  code = code.replace(/[^A-ZÑÜ\s]/g, '');

  // Applying rules
  for (let i = 0, l = RULES.length; i < l; i++)
    code = code.replace(...RULES[i]);

  return code;
}
