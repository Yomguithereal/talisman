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
 * implementations drop it to only (94). This implementation follows the
 * original algo.
 */
const MNNM = /^(MN|NM)/,
      MN = /^(M|N)/;

const RULES = {
  A: [
    [/^(AI|AJ|AY)/, 0, 1, null],
    [/^AU/, 0, 7, null],
    [null, 0, null, null]
  ],
  Ą: [
    [null, null, null, [6, null]]
  ],
  B: [
    [null, 7, 7, 7]
  ],
  C: [
    [/^CHS/, 5, 54, 54],
    [/^CH/, [5, 4], [5, 4], [5, 4]],
    [/^CK/, [5, 45], [5, 45], [5, 45]],
    [/^(CSZ|CZS|CZ|CS)/, 4, 4, 4],
    [null, [5, 4], [5, 4], [5, 4]]
  ],
  D: [
    [/^(DRZ|DRS|DSH|DSZ|DZH|DZS|DS|DZ)/, 4, 4, 4],
    [/^(DT|D)/, 3, 3, 3]
  ],
  E: [
    [/^(EI|EJ|EY)/, 0, 1, null],
    [/^EU/, 1, 1, null],
    [null, 0, null, null],
  ],
  Ę: [
    [null, null, null, [6, null]]
  ],
  F: [
    [/^(FB|F)/, 7, 7, 7]
  ],
  G: [
    [null, 5, 5, 5]
  ],
  H: [
    [null, 5, 5, null]
  ],
  I: [
    [/^(IA|IE|IO|IU)/, 1, null, null],
    [null, 0, null, null]
  ],
  J: [
    [null, [1, 4], [null, 4], [null, 4]]
  ],
  K: [
    [/^KS/, 5, 54, 54],
    [/^(KH|K)/, 5, 5, 5]
  ],
  L: [
    [null, 8, 8, 8]
  ],
  M: [
    [MNNM, null, 66, 66],
    [MN, 6, 6, 6]
  ],
  N: [
    [MNNM, null, 66, 66],
    [MN, 6, 6, 6],
  ],
  O: [
    [/^(OI|OJ|OY)/, 0, 1, null],
    [null, 0, null, null]
  ],
  P: [
    [/^(PF|PH|P)/, 7, 7, 7]
  ],
  Q: [
    [null, 5, 5, 5]
  ],
  R: [
    [/^(RZ|RS)/, [94, 4], [94, 4], [94, 4]],
    [null, 9, 9, 9]
  ],
  S: [
    [/^(SCHTSCH|SCHTSH|SCHTCH|SHTCH|SHCH|SHTSH)/, 2, 4, 4],
    [/^SCH/, 4, 4, 4],
    [/^(SHT|SCHT|SCHD)/, 2, 43, 43],
    [/^SH/, 4, 4, 4],
    [/^(STCH|STSCH|SC|STRZ|STRS|STSH)/, 2, 4, 4],
    [/^ST/, 2, 43, 43],
    [/^(SZCZ|SZCS)/, 2, 4, 4],
    [/^(SZT|SHD|SZD|SD)/, 2, 43, 43],
    [/^(SZ|S)/, 4, 4, 4]
  ],
  T: [
    [/^(TCH|TTCH|TTSCH)/, 4, 4, 4],
    [/^TH/, 3, 3, 3],
    [/^(TRZ|TRS|TSCH|TSH|TS|TTS|TTSZ|TC|TZ|TTZ|TZS|TSZ)/, 4, 4, 4],
    [null, 3, 3, 3]
  ],
  Ţ: [
    [null, [3, 4], [3, 4], [3, 4]]
  ],
  U: [
    [/^(UI|UJ|UY)/, 0, 1, null],
    [/^(UE|U)/, 0, null, null]
  ],
  V: [
    [null, 7, 7, 7]
  ],
  W: [
    [null, 7, 7, 7]
  ],
  X: [
    [null, 5, 54, 54]
  ],
  Y: [
    [null, 1, null, null]
  ],
  Z: [
    [/^(ZHDZH|ZDZH|ZDZ)/, 2, 4, 4],
    [/^(ZHD|ZD)/, 2, 43, 43],
    [/^(ZSCH|ZSH|ZH|ZS|Z)/, 4, 4, 4]
  ],
};

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

    // Find the subset of rules applying to the current letter
    const firstLetter = current.charAt(0),
          rules = RULES[firstLetter];

    for (let i = 0, l = rules.length; i < l; i++) {
      const [
        pattern,
        ifFirstLetter,
        vowelNext,
        usual
      ] = rules[i];

      const match = pattern ? current.match(pattern) : [firstLetter];

      if (match) {
        const offset = match[0].length;

        let correctCode = usual;

        if (start)
          correctCode = ifFirstLetter;

        else if (VOWELS.has(current.charAt(offset)))
          correctCode = vowelNext;

        if (lastPattern !== pattern && correctCode !== null)
          code.push(correctCode);

        lastPattern = pattern || firstLetter;

        current = current.slice(offset);
        break;
      }
    }

    start = false;
  }

  return permutations(code).map(pad);
}
