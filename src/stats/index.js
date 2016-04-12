/**
 * Talisman stats
 * ===============
 *
 * The library's stats helpers.
 */

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

  let sum = 0;

  for (let i = 0; i < length; i++)
    sum += sequence[i];

  return sum / length;
}

/**
 * Function computing the variance of the given sequence.
 *
 * @param  {boolean} correction        - Whether to use Bessel's correction.
 * @param  {array}   sequence          - The sequence to process.
 * @param  {number}  [precomputedMean] - The pre-computed mean of the sequence.
 * @return {number}                    - The variance.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
function genericVariance(correction, sequence, precomputedMean = null) {
  const length = sequence.length;

  if (!length)
    throw Error('talisman/stats#variance: the given list is empty.');

  if (precomputedMean === null)
    precomputedMean = mean(sequence);

  let sum = 0;

  for (let i = 0; i < length; i++)
    sum += Math.pow(sequence[i] - precomputedMean, 2);

  return sum / (length - correction);
}

/**
 * Function computing the standard deviation of the givn sequence.
 *
 * @param  {boolean} correction        - Whether to use Bessel's correction.
 * @param  {array}   sequence          - The sequence to process.
 * @param  {number}  [precomputedMean] - The pre-computed mean of the sequence.
 * @return {number}                    - The standard deviation.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
function genericStdev(correction, sequence, precomputedMean = null) {
  const v = genericVariance(correction, sequence, precomputedMean);

  return Math.sqrt(v);
}

/**
 * Exporting variance & standard-deviation related functions.
 */
const variance = genericVariance.bind(null, false),
      stdev = genericStdev.bind(null, false),
      sampleVariance = genericVariance.bind(null, true),
      sampleStdev = genericStdev.bind(null, true);

export {
  variance,
  stdev,
  sampleVariance,
  sampleStdev
};
