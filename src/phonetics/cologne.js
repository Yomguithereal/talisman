/**
 * Talisman phonetics/cologne
 * ===========================
 *
 * The cologne algorithm.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Cologne_phonetics
 *
 * [Article]:
 * Hans Joachim Postel: Die Kölner Phonetik. Ein Verfahren zur Identifizierung
 * von Personennamen auf der Grundlage der Gestaltanalyse.
 * in: IBM-Nachrichten, 19. Jahrgang, 1969, S. 925-931.
 */
import {squeeze} from '../helpers';
import deburr from 'lodash/deburr';

/**
 * Maps.
 */
const CODES = {
  H: null,

  A: 0,
  E: 0,
  I: 0,
  O: 0,
  U: 0,
  J: 0,
  Y: 0,

  B: 1,
  P: 1,

  F: 3,
  V: 3,
  W: 3,

  G: 4,
  K: 4,
  Q: 4,

  L: 5,

  M: 6,
  N: 6,

  R: 7,

  S: 8,
  Z: 8
};

const DT = new Set(['C', 'S', 'Z']),
      CFollowing1 = new Set(['A', 'H', 'K', 'L', 'O', 'Q', 'R', 'U', 'X']),
      CFollowing2 = new Set(['A', 'H', 'K', 'O', 'Q', 'U', 'X']),
      CPrevious = new Set(['S', 'Z']),
      X = new Set(['C', 'Q', 'K']);

/**
 * Helpers.
 */
function germanicSubstitutions(name) {
  return name
    .replace(/Ä/g, 'A')
    .replace(/Ö/g, 'O')
    .replace(/Ü/g, 'U')
    .replace(/ß/g, 'SS')
    .replace(/PH/g, 'F');
}

/**
 * Function taking a single name and computing its cologne code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The cologne code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function cologne(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/cologne: the given name is not a string.');

  // Preparing the name
  name = deburr(germanicSubstitutions(name.toUpperCase()))
    .replace(/[^A-Z]/g, '');

  // Processing the letters of the name
  let code = [];

  for (let i = 0, l = name.length; i < l; i++) {
    const letter = name[i],
          possibleCode = CODES[letter];

    if (possibleCode !== undefined)
      code.push(possibleCode);

    // Handling D/T
    else if (letter === 'D' || letter === 'T')
      code.push(DT.has(name[i + 1]) ? 8 : 2);

    // Handling C
    else if (letter === 'C') {
      const previous = name[i - 1],
            following = name[i + 1];

      if (
        (!previous && CFollowing1.has(following)) ||
        (CFollowing2.has(following) && !CPrevious.has(previous))
      ) {
        code.push(4);
      }
      else {
        code.push(8);
      }
    }

    // Handling X
    else if (letter === 'X')
      code.push(X.has(name[i - 1]) ? 8 : 48);
  }

  // Squeezing and dropping 0 if not first letter
  code = squeeze(code).filter((letter, i) => !i || letter);

  return code.join('');
}
