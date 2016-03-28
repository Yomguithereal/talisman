/**
 * Talisman phonetics/mra
 * =======================
 *
 * Functions related to the computation of the Match Rating Approach codex.
 */
import {squeeze} from '../helpers';
import deburr from 'lodash/deburr';

/**
 * Function taking a single name and computing its MRA codex.
 *
 * @param  {string}  name - The name to process.
 * @return {string}       - The MRA codex.
 *
 * @throws {Error} The function expects the name to be a string.
 */
export default function mra(name) {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/mra: the given name is not a string.');

  // Preparing the name
  let codex = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  // Dropping non-leading vowels
  codex = codex.charAt(0) + codex.slice(1).replace(/[AEIOU]/g, '');

  // Dropping consecutive consonants
  codex = squeeze(codex);

  // Returning the codex
  const offset = Math.min(3, codex.length - 3);

  return codex.slice(0, 3) + codex.substr(codex.length - offset, offset);
}
