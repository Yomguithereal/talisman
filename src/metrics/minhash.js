/**
 * Talisman metrics/minhash
 * =========================
 *
 * Function computing the similarity/distance between MinHash signatures.
 */

/**
 * Function returning the similarity between two MinHash signatures.
 *
 * @param  {mixed}  a - The first signature.
 * @param  {mixed}  b - The second signature.
 * @return {number}   - The similarity between a & b.
 *
 * @throws {Error} The function expects signatures of same length.
 */
export function similarity(a, b) {
  if (a.length !== b.length)
    throw Error('talisman/metrics/distance/minhash: the given signatures are not of same length.');

  const L = a.length;

  let s = 0;

  for (let i = 0; i < L; i++) {
    if (a[i] === b[i])
      s++;
  }

  return s / L;
}

/**
 * MinHash distance is simply 1 - similarity.
 */
export function distance(a, b) {
  return 1 - similarity(a, b);
}
