/**
 * Talisman metrics/eudex
 * =======================
 *
 * JavaScript implementation of the distance & similarity functions using
 * Eudex hashes.
 *
 * [Reference]:
 * https://github.com/ticki/eudex
 *
 * [Author]:
 * @ticki (https://github.com/ticki)
 *
 * [Tags]: metric, string metric.
 */
import eudex from '../phonetics/eudex';
import Long from 'long';

/**
 * Helpers.
 */

// NOTE: this is somewhat hacky and some methods can retrieve this information
// in constant time rather than our linear time here. However, the massive
// use of functions from the 'long' library might not be as optimized
// by JavaScript engines.
function bits(number) {
  return new Long((number.toString(2).match(/1/g) || []).length);
}

/**
 * Function returning the distance between two strings hashed by Eudex.
 *
 * @param  {mixed}  a - The first string.
 * @param  {mixed}  b - The second string.
 * @return {number}   - The distance.
 */
export function distance(a, b) {
  const d = eudex(a).xor(eudex(b));

  let sum = bits(d.and(0xFF));

  const toAdd = [
    bits(d.shiftRight(8).and(0xFF)).mul(2),
    bits(d.shiftRight(16).and(0xFF)).mul(4),
    bits(d.shiftRight(24).and(0xFF)).mul(8),
    bits(d.shiftRight(32).and(0xFF)).mul(16),
    bits(d.shiftRight(40).and(0xFF)).mul(32),
    bits(d.shiftRight(48).and(0xFF)).mul(64),
    bits(d.shiftRight(56).and(0xFF)).mul(128)
  ];

  for (let i = 0, l = toAdd.length; i < l; i++)
    sum = sum.add(toAdd[i]);

  return sum.low;
}

/**
 * Function returning whether the two given strings are similar by appraising
 * the distance between their Eudex hash.
 *
 * @param  {mixed}   a - The first string.
 * @param  {mixed}   b - The second string.
 * @return {boolean}
 */
export function isSimilar(a, b) {
  return distance(a, b) < 10;
}
