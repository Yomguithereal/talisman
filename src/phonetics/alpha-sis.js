/**
 * Talisman phonetics/alpha-sis
 * =============================
 *
 * IBM Alpha Search Inquiry System.
 *
 * [Reference]:
 * https://archive.org/stream/accessingindivid00moor#page/15/mode/1up
 *
 * [Article]:
 * Accessing individual records from personal data files using non-unique
 * identifiers" / Gwendolyn B. Moore, et al.; prepared for the Institute for
 * Computer Sciences and Technology, National Bureau of Standards,
 * Washington, D.C (1977)
 */
import deburr from 'lodash/deburr';
import {squeeze} from '../helpers';

/**
 * Constants.
 */
const INITIALS = [
  ['GF', '08'],
  ['GM', '03'],
  ['GN', '02'],
  ['KN', '02'],
  ['PF', '08'],
  ['PN', '02'],
  ['PS', '00'],
  ['WR', '04'],
  ['A', '1'],
  ['E', '1'],
  ['H', '2'],
  ['I', '1'],
  ['J', '3'],
  ['O', '1'],
  ['U', '1'],
  ['W', '4'],
  ['Y', '5'],
];

const BASICS = [
  ['SCH', '6'],
  ['CZ', ['70', '6', '0']],
  ['CH', ['6', '70', '0']],
  ['CK', ['7', '6']],
  ['DS', ['0', '10']],
  ['DZ', ['0', '10']],
  ['TS', ['0', '10']],
  ['TZ', ['0', '10']],
  ['CI', '0'],
  ['CY', '0'],
  ['CE', '0'],
  ['SH', '6'],
  ['DG', '7'],
  ['PH', '8'],
  ['C', ['7', '6']],
  ['K', ['7', '6']],
  ['Z', '0'],
  ['S', '0'],
  ['D', '1'],
  ['T', '1'],
  ['N', '2'],
  ['M', '3'],
  ['R', '4'],
  ['L', '5'],
  ['J', '6'],
  ['G', '7'],
  ['Q', '7'],
  ['X', '7'],
  ['F', '8'],
  ['V', '8'],
  ['B', '9'],
  ['P', '9']
];

/**
 * Helpers.
 */
function pad(code) {
  return (code + '00000000000000').slice(0, 14);
}

function permutations(code) {
  const codes = [''];

  for (let i = 0, l = code.length; i < l; i++) {
    const current = code[i];

    if (typeof current === 'object') {

      // Doubling the codes
      for (let j = 0, m = codes.length * (current.length - 1); j < m; j++)
        codes.push(codes[j]);

      // Filling the codes
      const offset = codes.length / current.length;

      for (let j = 0, k = 0, m = current.length; j < m; j++) {
        const encoding = current[j];

        while (k < offset) {
          codes[k + j * offset] += encoding;
          k++;
        }

        k = 0;
      }
    }
    else {

      for (let j = 0, m = codes.length; j < m; j++)
        codes[j] += current;
    }
  }

  return codes;
}

/**
 * Function taking a single name and computing its Alpha SIS value.
 *
 * @param  {string}  name - The name to process.
 * @return {array}        - List of the possible Alpha SIS values.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function alphaSis(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/alpha-sis: the given name is not a string.');

  name = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  const code = [];

  let position = 0;

  // Handling inital substring
  for (let i = 0, l = INITIALS.length; i < l; i++) {
    const [substring, encoding] = INITIALS[i];

    if (name.startsWith(substring)) {
      code.push(encoding);
      position += substring.length;
      break;
    }
  }

  // If the beginning of the string is not present in initial, we put '0'
  if (!code[0])
    code.push('0');

  // Encoding the remaining
  const length = name.length;

  main:
  while (position < length) {

    for (let i = 0, l = BASICS.length; i < l; i++) {
      const [substring, encoding] = BASICS[i];

      if (name.slice(position).startsWith(substring)) {
        code.push(encoding);
        position += substring.length;
        continue main;
      }
    }

    code.push('_');
    position++;
  }

  return permutations(code).map(c => {
    return pad(squeeze(c).replace(/_/g, ''));
  });
}
