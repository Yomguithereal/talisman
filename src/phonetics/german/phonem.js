/**
 * Talisman phonetics/german/phonem
 * =================================
 *
 * The phonem algorithm.
 *
 * [Reference]:
 * http://web.archive.org/web/20070209153423/http://uni-koeln.de/phil-fak/phonetik/Lehre/MA-Arbeiten/magister_wilz.pdf
 *
 * [Article]:
 * Wilde, Georg and Carsten Meyer. 1999. "Doppelgaenger
 * gesucht - Ein Programm fuer kontextsensitive phonetische Textumwandlung."
 * ct Magazin fuer Computer & Technik 25/1999.
 */
import {squeeze, translation} from '../../helpers';

/**
 * Rules.
 */
const SUBSTITUTIONS = [
  [/(?:SC|SZ|CZ|TZ|TS)/g, 'C'],
  [/KS/g, 'X'],
  [/(?:PF|PH)/g, 'V'],
  [/QU/g, 'KW'],
  [/UE/g, 'Y'],
  [/AE/g, 'E'],
  [/OE/g, 'Ö'],
  [/E[IY]/g, 'AY'],
  [/EU/g, 'OY'],
  [/AU/g, 'A§'],
  [/OU/g, '§']
];

const TRANSLATION = translation(
  'ZKGQÇÑßFWPTÁÀÂÃÅÄÆÉÈÊËIJÌÍÎÏÜÝ§ÚÙÛÔÒÓÕØ',
  'CCCCCNSVVBDAAAAAEEEEEEYYYYYYYYUUUUOOOOÖ'
);

const ACCEPTABLE_LETTERS = new Set('ABCDLMNORSUVWXYÖ');

/**
 * Function taking a single name and computing its phonem code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The phonem code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function phonem(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/german/phonem: the given name is not a string.');

  let code = name.toUpperCase();

  for (let i = 0, l = SUBSTITUTIONS.length; i < l; i++)
    code = code.replace(...SUBSTITUTIONS[i]);

  let translatedCode = '';
  for (let i = 0, l = code.length; i < l; i++)
    translatedCode += TRANSLATION[code[i]] || code[i];

  translatedCode = squeeze(translatedCode);

  code = '';
  for (let i = 0, l = translatedCode.length; i < l; i++) {
    if (ACCEPTABLE_LETTERS.has(translatedCode[i]))
      code += translatedCode[i];
  }

  return code;
}
