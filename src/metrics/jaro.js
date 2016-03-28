/**
 * Talisman metrics/jaro
 * ======================
 *
 * Function computing the Jaro score.
 */
import {seq} from '../helpers';

/**
 * Function returning the Jaro score between two sequences.
 *
 * @param  {mixed}  a     - The first sequence.
 * @param  {mixed}  b     - The second sequence.
 * @return {number}       - The Jaro score between a & b.
 */
export default function jaro(a, b) {

  // Fast break
  if (a === b)
    return 1;

  // Normalizing sequences
  a = seq(a);
  b = seq(b);

  let max, min;

  if (a.length > b.length) {
    max = a;
    min = b;
  }
  else {
    max = b;
    min = a;
  }

  // Finding matches
  const range = Math.max(((max.length / 2) | 0) - 1, 0),
        indexes = (new Array(min.length)).fill(-1),
        flags = (new Array(max.length)).fill(false);

  let matches = 0;

  for (let i = 0, l = min.length; i < l; i++) {
    const character = min[i],
          xi = Math.max(i - range, 0),
          xn = Math.min(i + range + 1, max.length);

    for (let j = xi, m = xn; j < m; j++) {
      if (!flags[j] && character === max[j]) {
        indexes[i] = j;
        flags[j] = true;
        matches++;
        break;
      }
    }
  }

  const ms1 = new Array(matches),
        ms2 = new Array(matches);

  let si;

  si = 0;
  for (let i = 0, l = min.length; i < l; i++) {
    if (indexes[i] !== -1) {
      ms1[si] = min[i];
      si++;
    }
  }

  si = 0;
  for (let i = 0, l = max.length; i < l; i++) {
    if (flags[i]) {
      ms2[si] = max[i];
      si++;
    }
  }

  let transpositions = 0;
  for (let i = 0, l = ms1.length; i < l; i++) {
    if (ms1[i] !== ms2[i])
      transpositions++;
  }

  // Computing the distance
  if (!matches)
    return 0;

  const t = (transpositions / 2) | 0,
        m = matches;

  return ((m / a.length) + (m / b.length) + ((m - t) / m)) / 3;
}

/**
 * Jaro distance is 1 - the Jaro score.
 */
const distance = (a, b) => 1 - jaro(a, b);

/**
 * Exporting.
 */
export {
  jaro as similarity,
  distance
};
