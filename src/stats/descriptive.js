/**
 * Talisman stats/descriptive
 * ===========================
 *
 * The library's descriptive stats helpers.
 */

/**
 * Function computing the sum of the given sequence.
 *
 * @param  {array}  sequence - The sequence to process.
 * @return {number}          - The sum.
 */
export function sum(sequence) {
  let s = 0;

  for (let i = 0, l = sequence.length; i < l; i++)
    s += sequence[i];

  return s;
}

/**
 * Function computing the mean of the given sequence.
 *
 * @param  {array}  sequence - The sequence to process.
 * @return {number}          - The mean.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
export function mean(sequence) {
  const length = sequence.length;

  if (!length)
    throw Error('talisman/stats#mean: the given list is empty.');

  return sum(sequence) / length;
}

/**
 * Function adding a value to the given mean in constant time.
 *
 * @param  {number}  previousMean - The mean to adjust.
 * @param  {number}  nbValues     - The number of values in the given mean.
 * @param  {number}  value        - The value to add.
 * @return {number}               - The mean.
 */
export function addToMean(previousMean, nbValues, value) {
  return previousMean + ((value - previousMean) / (nbValues + 1));
}

/**
 * Function substracting a value from the given mean in constant time.
 *
 * @param  {number}  previousMean - The mean to adjust.
 * @param  {number}  nbValues     - The number of values in the given mean.
 * @param  {number}  value        - The value to substract.
 * @return {number}               - The mean.
 */
export function substractFromMean(previousMean, nbValues, value) {
  return ((previousMean * nbValues) - value) / (nbValues - 1);
}

/**
 * Function combining two means into one in constant time.
 *
 * @param  {number} ma - The first mean.
 * @param  {number} na - Number of values for a.
 * @param  {number} mb - The second mean.
 * @param  {number} nb - Number of values for b.
 * @return {number}    - The new mean.
 */
export function combineMeans(ma, na, mb, nb) {
  return (ma * na + mb * nb) / (na + nb);
}

/**
 * Function computing the variance of the given sequence.
 *
 * @param  {array}   sequence          - The sequence to process.
 * @param  {number}  [precomputedMean] - The pre-computed mean of the sequence.
 * @return {number}                    - The variance.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
export function variance(sequence, precomputedMean = null) {
  const length = sequence.length;

  if (!length)
    throw Error('talisman/stats#variance: the given list is empty.');

  if (precomputedMean === null)
    precomputedMean = mean(sequence);

  let s = 0;

  for (let i = 0; i < length; i++)
    s += Math.pow(sequence[i] - precomputedMean, 2);

  return s / length;
}

/**
 * Function computing the standard deviation of the given sequence.
 *
 * @param  {array}   sequence          - The sequence to process.
 * @param  {number}  [precomputedMean] - The pre-computed mean of the sequence.
 * @return {number}                    - The standard deviation.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
export function stdev(sequence, precomputedMean = null) {
  const v = variance(sequence, precomputedMean);

  return Math.sqrt(v);
}

/**
 * Function combining two variances into one in constant time.
 *
 * @param  {number} ma             - The first mean.
 * @param  {number} va             - The first variance.
 * @param  {number} na             - Number of values for a.
 * @param  {number} mb             - The second mean.
 * @param  {number} vb             - The second variance.
 * @param  {number} nb             - Number of values for b.
 * @param  {number} [combinedMean] - Precomputed combined mean.
 * @return {number}                - The new mean.
 */
export function combineVariances(ma, va, na, mb, vb, nb, combinedMean = null) {
  combinedMean = combinedMean || combineMeans(ma, na, mb, nb);

  return (
    na * (va + Math.pow(ma - combinedMean, 2)) +
    nb * (vb + Math.pow(mb - combinedMean, 2))
  ) / (na + nb);
}
