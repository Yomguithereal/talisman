/**
 * Talisman keyers/fingerprint
 * ============================
 *
 * Keyer taking a string and normalizing it into a "fingerprint".
 */
import deburr from 'lodash/deburr';
import uniq from 'lodash/uniq';

/**
 * Constants.
 */
const WHITESPACE = /\s/,
      PUNCTUATION_CONTROL = new RegExp('[,;\.!?\\x00-\\x08\\x0A-\\x1F\\x7F]', 'g'); // TODO: fix punctuation

/**
 * Fingerprint function.
 *
 * @param  {string} string - Target string.
 * @return {string}        - The fingerprint.
 */
export default function fingerprint(string) {

  //-- 1) Trimming
  string = string.trim();

  //-- 2) Case normalization
  string = string.toLowerCase();

  //-- 3) Dropping punctuation & control characters
  string = string.replace(PUNCTUATION_CONTROL, '');

  //-- 4) Splitting the string into space-separated tokens
  let tokens = string.split(WHITESPACE);

  //-- 5) Keeping only unique tokens
  tokens = uniq(tokens);

  //-- 6) Sorting tokens
  tokens.sort();

  //-- 7) Joining the tokens back together
  string = tokens.join(' ');

  //-- 8) Deburring
  return deburr(string);
}
