/**
 * Talisman phonetics/daitch-mokotoff
 * ===================================
 *
 * The Daitch-Mokotoff Soundex.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Daitch%E2%80%93Mokotoff_Soundex
 */
import deburr from 'lodash/deburr';

/**
 * Rules.
 *
 * [Note]:
 * For the (RS|RZ) part, the original algo says (94, 4) but most
 * implementations drop it to only (94).
 */

// TODO: optimize to cut O(n * m)
const RULES = [
  [/^(AI|AJ|AY)/, 0, 1, null],
  [/^AU/, 0, 7, null],
  [/^Ą/, null, null, [6, null]],
  [/^A/, 0, null, null],
  [/^B/, 7, 7, 7],
  [/^CHS/, 5, 54, 54],
  [/^CH/, [5, 4], [5, 4], [5, 4]],
  [/^CK/, [5, 45], [5, 45], [5, 45]],
  [/^(CSZ|CZS|CZ|CS)/, 4, 4, 4],
  [/^C/, [5, 4], [5, 4], [5, 4]],
  [/^(DRZ|DRS|DSH|DSZ|DZH|DZS|DS|DZ)/, 4, 4, 4],
  [/^(DT|D)/, 3, 3, 3],
  [/^(EI|EJ|EY)/, 0, 1, null],
  [/^EU/, 1, 1, null],
  [/^Ę/, null, null, [6, null]],
  [/^E/, 0, null, null],
  [/^(FB|F)/, 7, 7, 7],
  [/^G/, 5, 5, 5],
  [/^H/, 5, 5, null],
  [/^(IA|IE|IO|IU)/, 1, null, null],
  [/^I/, 0, null, null],
  [/^J/, [1, 4], [null, 4], [null, 4]],
  [/^KS/, 5, 54, 54],
  [/^(KH|K)/, 5, 5, 5],
  [/^L/, 8, 8, 8],
  [/^(MN|NM)/, null, 66, 66],
  [/^(M|N)/, 6, 6, 6],
  [/^(OI|OJ|OY)/, 0, 1, null],
  [/^O/, 0, null, null],
  [/^(PF|PH|P)/, 7, 7, 7],
  [/^Q/, 5, 5, 5],
  [/^(RZ|RS)/, [94, 4], [94, 4], [94, 4]],
  [/^R/, 9, 9, 9],
  [/^(SCHTSCH|SCHTSH|SCHTCH|SHTCH|SHCH|SHTSH)/, 2, 4, 4],
  [/^SCH/, 4, 4, 4],
  [/^(SHT|SCHT|SCHD)/, 2, 43, 43],
  [/^SH/, 4, 4, 4],
  [/^(STCH|STSCH|SC|STRZ|STRS|STSH)/, 2, 4, 4],
  [/^ST/, 2, 43, 43],
  [/^(SZCZ|SZCS)/, 2, 4, 4],
  [/^(SZT|SHD|SZD|SD)/, 2, 43, 43],
  [/^(SZ|S|TCH|TTCH|TTSCH)/, 4, 4, 4],
  [/^TH/, 3, 3, 3],
  [/^(TRZ|TRS|TSCH|TSH|TS|TTS|TTSZ|TC|TZ|TTZ|TZS|TSZ)/, 4, 4, 4],
  [/^Ţ/, [3, 4], [3, 4], [3, 4]],
  [/^T/, 3, 3, 3],
  [/^(UI|UJ|UY)/, 0, 1, null],
  [/^(U|UE)/, 0, null, null],
  [/^(V|W)/, 7, 7, 7],
  [/^X/, 5, 54, 54],
  [/^Y/, 1, null, null],
  [/^(ZDZ|ZDZH|ZHDZH)/, 2, 4, 4],
  [/^(ZD|ZHD)/, 2, 43, 43],
  [/^(ZH|ZS|ZSCH|ZSH|Z)/, 4, 4, 4]
];

/**
 * Helpers.
 */
function pad(code) {
  return (code + '000000').slice(0, 6);
}

function permutations(code) {
  const codes = [''];

  for (let i = 0, l = code.length; i < l; i++) {
    const current = code[i];

    if (typeof current === 'object') {

      // Doubling the codes
      for (let j = 0, m = codes.length; j < m; j++)
        codes.push(codes[j]);

      // Filling the codes
      for (let j = 0, m = codes.length; j < m; j++) {
        const s = current[(j < m / 2) ? 0 : 1];
        codes[j] += (s !== null ? s : '');
      }
    }
    else {

      for (let j = 0, m = codes.length; j < m; j++)
        codes[j] += current;
    }
  }

  return codes;
}

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

/**
 * Function taking a single name and computing its Daitch-Mokotoff soundex code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The Daitch-Mokotoff code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function daitchMokotoff(name) {

  if (typeof name !== 'string')
    throw Error('talisman/phonetics/daitch-mokotoff: the given name is not a string.');

  const code = [];

  let current = deburr(name)
    .toUpperCase()
    .replace(/[^A-ZĄĘŢ]/g, '');

  let start = true,
      lastPattern;

  // Applying the rules
  while (current.length) {
    for (let i = 0, l = RULES.length; i < l; i++) {
      const [
        pattern,
        firstLetter,
        vowelNext,
        usual
      ] = RULES[i];

      const match = current.match(pattern);

      if (match) {

        let correctCode = usual;

        if (start)
          correctCode = firstLetter;

        else if (VOWELS.has(current.charAt(match[0].length)))
          correctCode = vowelNext;

        if (lastPattern !== pattern && correctCode !== null)
          code.push(correctCode);

        lastPattern = pattern;
        current = current.slice(match[0].length);
        break;
      }
    }

    start = false;
  }

  return permutations(code).map(pad);
}
