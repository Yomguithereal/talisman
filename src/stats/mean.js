/**
 * Talisman stats/mean
 * ====================
 *
 * Functions related to means.
 */

/**
 * Function returning the mean of a list of vectors.
 *
 * @param  {array} vectors - The list of vectors to process.
 * @return {array}         - A mean vector.
 */
export default function mean(vectors) {
  let sum = (new Array(vectors[0].length)).fill(0);

  for (let i = 0, l = vectors.length; i < l; i++) {
    const vector = vectors[i];

    for (let j = 0, m = vector.length; j < m; j++)
      sum[j] += vector[j];
  }

  for (let i = 0, l = sum.length; i < l; i++)
    sum[i] /= vectors.length;

  return sum;
}
