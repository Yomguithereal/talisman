/**
 * Talisman metrics/distance/cosine
 * =================================
 *
 * Function computing the cosine similarity.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Cosine_similarity
 *
 * [Tags]: semimetric.
 */

/**
 * Function returning the cosine similarity between two vectors.
 *
 * @param  {mixed}  a - The first vector.
 * @param  {mixed}  b - The second vector.
 * @return {number}   - The cosine similarity between a & b.
 *
 * @throws {Error} The function expects vectors of same dimension.
 */
export default function cosine(a, b) {
  if (a.length !== b.length)
    throw Error('talisman/metrics/distance/cosine: the given vectors are not of the same dimension.');

  let xx = 0,
      xy = 0,
      yy = 0;

  for (let i = 0, l = a.length; i < l; i++) {
    const x = a[i],
          y = b[i];

    xx += x * x;
    yy += y * y;
    xy += x * y;
  }

  return xy / Math.sqrt(xx * yy);
}

/**
 * Cosine distance is 1 - the cosine similarity.
 */
export function distance(a, b) {
  return 1 - cosine(a, b);
}

export {cosine as similarity};
