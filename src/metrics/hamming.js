/**
 * Talisman metrics/hamming
 * =========================
 *
 * Function computing the Hamming distance.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Hamming_distance
 *
 * [Article]:
 * Hamming, Richard W. (1950), "Error detecting and error correcting codes",
 * Bell System Technical Journal 29 (2): 147–160
 */
import {seq} from '../helpers';

/**
 * Function returning the Hamming distance between two sequences.
 *
 * @param  {mixed}  a     - The first sequence to process.
 * @param  {mixed}  b     - The second sequence to process.
 * @return {number}       - The Hamming distance between a & b.
 *
 * @throws {Error} The function expects sequences of equal length.
 */
export default function hamming(a, b) {

  if (a === b)
    return 0;

  a = seq(a);
  b = seq(b);

  if (a.length !== b.length)
    throw Error('talisman/metrics/hamming: given sequences are not of equal length.');

  let distance = 0;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i])
      distance++;
  }

  return distance;
}
