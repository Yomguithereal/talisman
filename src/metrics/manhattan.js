/**
 * Talisman metrics/manhattan
 * ===========================
 *
 * Function computing the Manhattan distance.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Taxicab_geometry
 */

/**
 * Function returning the Manhattan distance between two vectors.
 *
 * @param  {mixed}  a     - The first vector.
 * @param  {mixed}  b     - The second vector.
 * @return {number}       - The Manhattan distance between a & b.
 *
 * @throws {Error} The function expects vector of same dimensions.
 */
export default function manhattan(a, b) {
  if (a.length !== b.length)
    throw Error('talisman/metrics/manhattan: the given vectors are not of the same dimension.');

  let distance = 0;

  for (let i = 0, l = a.length; i < l; i++)
    distance += Math.abs(a[i] - b[i]);

  return distance;
}
