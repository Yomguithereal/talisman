/**
 * Talisman metrics/distance/euclidean
 * ====================================
 *
 * Function computing the euclidean distance.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Euclidean_distance
 *
 * [Tags]: metric, string metric.
 */

/**
 * Function returning the squared euclidean distance between two vectors.
 *
 * @param  {mixed}  a - The first vector.
 * @param  {mixed}  b - The second vector.
 * @return {number}   - The squared euclidean distance between a & b.
 *
 * @throws {Error} The function expects vectors of same dimension.
 */
export function squared(a, b) {
  if (a.length !== b.length)
    throw Error('talisman/metrics/distance/euclidean: the given vectors are not of the same dimension.');

  let distance = 0;

  for (let i = 0, l = a.length; i < l; i++)
    distance += Math.pow(a[i] - b[i], 2);

  return distance;
}

/**
 * Function returning the euclidean distance between two vectors.
 *
 * @param  {mixed}  a - The first vector.
 * @param  {mixed}  b - The second vector.
 * @return {number}   - The euclidean distance between a & b.
 *
 * @throws {Error} The function expects vector of same dimensions.
 */
export default function euclidean(a, b) {
  return Math.sqrt(squared(a, b));
}
