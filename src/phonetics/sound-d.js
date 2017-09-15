/**
 * Talisman phonetics/sound-d
 * ===========================
 *
 * The SoundD algorithm, a slight variant over the original Soundex algorithm.
 *
 * [Article]:
 * Hybrid Matching Algorithm for Personal Names.
 * Cihan Varol, Coskun Bayrak.
 */
import {translation, squeeze} from '../helpers';
import deburr from 'lodash/deburr';

/**
 * Translations.
 */
const TRANSLATIONS = translation(
  'AEIOUYWHBPFVCSKGJQXZDTLMNR',
  '00000000111122222222334556'
);

/**
 * Constants.
 */
const INITIALS = new Set(['KN', 'GN', 'PN', 'AC', 'WR']);

/**
 * Helpers.
 */
function pad(code) {
  return (code + '0000').slice(0, 4);
}

/**
 * Function taking a single name and computing its SoundD code.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The SoundD code.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function soundD(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/sound-d: the given name is not a string.');

  name = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  // Handling some initials
  if (INITIALS.has(name.slice(0, 2)))
    name = name.slice(1);
  else if (name[0] === 'X')
    name = 'S' + name.slice(1);
  else if (name.slice(0, 2) === 'WH')
    name = 'W' + name.slice(2);

  // Process the code for the name's tail
  let tail = '';

  for (let i = 0, l = name.length; i < l; i++) {
    const letter = name[i];

    // Handling 'DGE', 'DGI', 'GH'
    if (letter === 'D') {
      if (name[i + 1] === 'G' && (name[i + 2] === 'E' || name[i + 2] === 'I')) {
        tail += '2';
        i += 2;
      }

      continue;
    }
    else if (letter === 'G' && name[i + 1] === 'H') {
      tail += '0';
      i++;

      continue;
    }

    tail += TRANSLATIONS[letter];
  }

  // Composing the code from the tail
  const code = squeeze(tail).replace(/0/g, '');

  return pad(code);
}
