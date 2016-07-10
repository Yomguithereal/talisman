/**
 * Talisman metrics/distance/jaro
 * ===============================
 *
 * Function computing the Jaro score.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
 *
 * [Articles]:
 * Jaro, M. A. (1989). "Advances in record linkage methodology as applied to
 * the 1985 census of Tampa Florida".
 * Journal of the American Statistical Association 84 (406): 414–20
 *
 * Jaro, M. A. (1995). "Probabilistic linkage of large public health data file".
 * Statistics in Medicine 14 (5–7): 491–8.
 */
import {seq} from '../../helpers';
import {vec} from '../../helpers/vectors';

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
        indexes = vec(min.length, -1),
        flags = vec(max.length, false);

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
