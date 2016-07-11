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

export {
  genericVariance as variance,
  genericStdev as stdev,
  sampleVariance,
  sampleStdev
};
