/**
 * Talisman phonetics/french/phonex
 * =================================
 *
 * Implementation of the French phonetic algorithm "phonex".
 *
 * [Author]: Frédéric Brouard
 */
import {translation, squeeze} from '../../helpers';

/**
 * Translations.
 */
const ACCENTUATED = translation('ÀÂÄÃÉÈÊËÌÎÏÒÔÖÕÙÛÜÑ', 'AAAAYYYYIIIOOOOUUUN'),
      SINGLE_LETTERS = translation('ADPJBVM', 'OTTGFFN');

/**
 * Rules.
 */
const RULES = [
  [/Y/g, 'I'],
  [/([^PCS])H/g, '$1'],
  [/PH/g, 'F'],
  [/G(AI?[NM])/g, 'K$1'],
  [/[AE]I[NM]([AEIOU])/g, 'YN$1'],
  [/EAU/, 'O'],
  [/OUA/, '2'],
  [/[EA]I[NM]/g, '4'],
  [/[EA]I/g, 'Y'],
  [/E([RTZ])/g, 'Y$1'],
  [/ESS/g, 'YS'],
  [/[AOE]N([^AEIOU1234])/g, '1$1'],
  [/[AE]M([^AEIOU1234])/g, '1$1'],
  [/IN([^AEIOU1234])/g, '4$1'],
  [/([AEIOUY1234])S([AEIOUY1234])/g, '$1Z$2'],
  [/(?:OE|EU)/g, 'E'],
  [/AU/g, 'O'],
  [/O[IY]/g, '2'],
  [/OU/g, '3'],
  [/(?:SCH|CH|SH)/g, '5'],
  [/SS/g, 'S'],
  [/SC?([EIY])/g, 'S$1'], // Note: this part was tweaked,
  [/(?:GU|QU|Q|C)/g, 'K'],
  [/G([AOY])/g, 'K$1'],
];

/**
 * Function taking a single word and computing its Phonex code.
 *
 * @param  {string}  word - The word to process.
 * @return {string}       - The Phonex code.
 *
 * @throws {Error} The function expects the word to be a string.
 */
export default function phonex(word) {
  if (typeof word !== 'string')
    throw Error('talisman/phonetics/french/phonex: the given word is not a string.');

  word = word.toUpperCase();

  // Replacing accentuated letters
  let code = '';

  for (let i = 0, l = word.length; i < l; i++) {
    const letter = word.charAt(i);
    code += ACCENTUATED[letter] || letter;
  }

  // Dropping shenanigans
  code = code.replace(/[^A-Z]/g, '');

  // Applying rules
  for (let i = 0, l = RULES.length; i < l; i++)
    code = code.replace(...RULES[i]);

  // Translating single letters
  const previousCode = code;
  code = '';

  for (let i = 0, l = previousCode.length; i < l; i++) {
    const letter = previousCode.charAt(i);
    code += SINGLE_LETTERS[letter] || letter;
  }

  // Dropping consecutive duplicates
  code = squeeze(code);

  // Dropping trailing T and X
  code = code.replace(/[TX]$/, '');

  return code;
}
