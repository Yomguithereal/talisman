/**
 * Talisman phonetics/roger-root
 * ==============================
 *
 * The Roger Root name coding procedure.
 *
 * [Reference]:
 * http://naldc.nal.usda.gov/download/27833/PDF
 */
import deburr from 'lodash/deburr';
import {squeeze} from '../helpers';

/**
 * Constants.
 */
const FIRST_LETTER_ENCODING = {
  A: '1',
  B: '09',
  C: [
    ['CE', '00'],
    ['CH', '06'],
    ['CI', '00'],
    ['CY', '00'],
    ['C', '07']
  ],
  D: [
    ['DG', '07'],
    ['D', '01']
  ],
  E: '1',
  F: '08',
  G: [
    ['GF', '08'],
    ['GM', '03'],
    ['GN', '02'],
    ['G', '07']
  ],
  H: '2',
  I: '1',
  J: '3',
  K: [
    ['KN', '02'],
    ['K', '07']
  ],
  L: '05',
  M: '03',
  N: '02',
  O: '1',
  P: [
    ['PF', '08'],
    ['PH', '08'],
    ['PN', '02'],
    ['P', '09']
  ],
  Q: '07',
  R: '04',
  S: [
    ['SCH', '06'],
    ['SH', '06'],
    ['S', '00']
  ],
  T: [
    ['TSCH', '06'],
    ['TSH', '06'],
    ['TS', '00'],
    ['T', '01']
  ],
  U: '1',
  V: '08',
  W: [
    ['WR', '04'],
    ['W', '4']
  ],
  X: '07',
  Y: '5',
  Z: '00'
};

const ENCODING = {
  B: '9',
  C: [
    ['CE', '0'],
    ['CH', '6'],
    ['CI', '0'],
    ['CY', '0'],
    ['C', '7']
  ],
  D: [
    ['DG', '7'],
    ['D', '1']
  ],
  F: '8',
  G: '7',
  J: '6',
  K: '7',
  L: '5',
  M: '3',
  N: '2',
  P: [
    ['PH', '8'],
    ['P', '9']
  ],
  Q: '7',
  R: '4',
  S: [
    ['SCH', '6'],
    ['SH', '6'],
    ['S', '0']
  ],
  T: [
    ['TSCH', '6'],
    ['TSH', '6'],
    ['TS', '0'],
    ['T', '1']
  ],
  V: '8',
  X: '7',
  Z: '0'
};

/**
 * Helpers.
 */
function pad(code) {
  return (code + '00000').slice(0, 5);
}

/**
 * Function taking a single name and computing its roger root code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The roger root code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function rogerRoot(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/rogerRoot: the given name is not a string.');

  name = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  let code = '',
      encodedFirstLetter;

  for (let i = 0, l = name.length; i < l; i++) {
    const firstIteration = !i,
          encoding = firstIteration ? FIRST_LETTER_ENCODING : ENCODING,
          rules = encoding[name[i]];

    if (rules) {
      if (typeof rules === 'string') {
        code += rules;
      }
      else {

        for (let j = 0, m = rules.length; j < m; j++) {
          const [match, replacement] = rules[j];

          if (name.substr(i, match.length) === match) {
            code += replacement;
            i += (match.length - 1);
            break;
          }
        }
      }
    }
    else {
      code += '-';
    }

    if (firstIteration)
      encodedFirstLetter = code;
  }

  // Squeezing the code
  code = encodedFirstLetter + squeeze(code.slice(encodedFirstLetter.length));

  return pad(code.replace(/-/g, ''));
}
