/**
 * Talisman metrics/distance/chebyshev
 * ====================================
 *
 * Function computing the Chebyshev distance.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Chebyshev_distance
 *
 * [Tags]: metric, vector space.
 */

/**
 * Function returning the Chebyshev distance between two vectors.
 *
 * @param  {mixed}  a     - The first vector.
 * @param  {mixed}  b     - The second vector.
 * @return {number}       - The Chebyshev distance between a & b.
 *
 * @throws {Error} The function expects vectors of same dimension.
 */
export default function chebyshev(a, b) {
  if (a.length !== b.length)
    throw Error('talisman/metrics/distance/chebyshev: the given vectors are not of the same dimension.');

  let distance = 0;

  for (let i = 0, l = a.length; i < l; i++)
    distance = Math.max(distance, Math.abs(a[i] - b[i]));

  return distance;
}
