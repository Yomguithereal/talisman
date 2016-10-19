/**
 * Talisman keyers/ngram-fingerprint
 * ==================================
 *
 * Keyer taking a string and normalizing it into a "ngram fingerprint".
 */
import deburr from 'lodash/deburr';
import uniq from 'lodash/uniq';
import ngrams from '../stats/ngrams';

/**
 * Constants.
 */
const UNDESIRABLES = new RegExp('[\\s,;.!?\\x00-\\x08\\x0A-\\x1F\\x7F]', 'g'); // TODO: fix punctuation

/**
 * Fingerprint function.
 *
 * @param  {string} string - Target string.
 * @param  {number} n      - Size of the subsequences.
 * @return {string}        - The fingerprint.
 */
export default function ngramFingerprint(n, string) {

  //-- 1) Case normalization
  string = string.toLowerCase();

  //-- 2) Dropping punctuation, whitespace and control characters
  string = string.replace(UNDESIRABLES, '');

  //-- 3) Computing ngrams
  let grams = ngrams(n, string, s => s.join(''));

  //-- 4) Keeping unique grams
  grams = uniq(grams);

  //-- 5) Sorting the grams
  grams.sort();

  //-- 6) Joining the grams
  string = grams.join('');

  //-- 7) Deburring
  return deburr(string);
}
