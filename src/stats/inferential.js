/**
 * Talisman stats/inferential
 * ===========================
 *
 * The library's inferential stats helpers.
 */
import {mean} from './descriptive';

/**
 * Function computing the sample variance of the given sequence.
 *
 * @param  {number}  ddof     - Delta degrees of freedom.
 * @param  {array}   sequence - The sequence to process.
 * @return {number}           - The variance.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
function genericVariance(ddof, sequence) {
  const length = sequence.length;

  if (!length)
    throw Error('talisman/stats/inferential#variance: the given list is empty.');

  // Returning 0 if the denominator would be <= 0
  const denominator = length - ddof;

  if (denominator <= 0)
    return 0;

  const m = mean(sequence);

  let s = 0;

  for (let i = 0; i < length; i++)
    s += Math.pow(sequence[i] - m, 2);

  return s / denominator;
}

/**
 * Function computing the sample standard deviation of the given sequence.
 *
 * @param  {number}  ddof     - Delta degrees of freedom.
 * @param  {array}   sequence - The sequence to process.
 * @return {number}           - The variance.
 *
 * @throws {Error} - The function expects a non-empty list.
 */
function genericStdev(ddof, sequence) {
  const v = genericVariance(ddof, sequence);

  return Math.sqrt(v);
}

/**
 * Exporting convenient methods.
 */
const sampleVariance = genericVariance.bind(null, 1),
      sampleStdev = genericStdev.bind(null, 1);

/**
 * Function computing the sample covariance.
 *
 * @param  {array}  seq1 - First sequence.
 * @param  {array}  seq2 - Second sequence.
 * @return {number}      - The sample covariance.
 *
 * @throws {Error} - The function expects two equal-length lists.
 * @throws {Error} - The function expects lists containing more than one item.
 */
export function sampleCovariance(x, y) {
  if (x.length !== y.length)
    throw Error('talisman/stats/inferential#sampleCovariance: this function expects two sequences of same size.');

  if (x.length <= 1)
    throw Error('talisman/stats/inferential#sampleCovariance: the given lists should contain more than one item.');

  const xMean = mean(x),
        yMean = mean(y),
        n = x.length;

  let sum = 0;

  for (let i = 0; i < n; i++)
    sum += (x[i] - xMean) * (y[i] - yMean);

  return sum / (n - 1);
}

export {
  genericVariance as variance,
  genericStdev as stdev,
  sampleVariance,
  sampleStdev
};
