/**
 * Talisman metrics/distance/jaro-winkler
 * =======================================
 *
 * Function computing the Jaro-Winkler score.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
 *
 * [Article]:
 * Winkler, W. E. (1990). "String Comparator Metrics and Enhanced Decision Rules
 * in the Fellegi-Sunter Model of Record Linkage".
 * Proceedings of the Section on Survey Research Methods
 * (American Statistical Association): 354–359.
 *
 * [Tags]: semimetric, string metric.
 */
import jaro from './jaro';
import {seq} from '../../helpers';

/**
 * Function returning the Jaro-Winkler score between two sequences.
 *
 * @param  {object} options - Custom options.
 * @param  {mixed}  a       - The first sequence.
 * @param  {mixed}  b       - The second sequence.
 * @return {number}         - The Jaro-Winkler score between a & b.
 */
function customJaroWinkler(options, a, b) {
  options = options || {};

  const {
    boostThreshold = 0.7,
    scalingFactor = 0.1
  } = options;

  if (scalingFactor > 0.25)
    throw Error('talisman/metrics/distance/jaro-winkler: the scaling factor should not exceed 0.25.');

  if (boostThreshold < 0 || boostThreshold > 1)
    throw Error('talisman/metrics/distance/jaro-winkler: the boost threshold should be comprised between 0 and 1.');

  // Fast break
  if (a === b)
    return 1;

  // Normalizing sequences
  a = seq(a);
  b = seq(b);

  const maxLength = Math.max(a.length, b.length),
        minLength = Math.min(a.length, b.length);

  // Computing prefix
  let prefix = 0;
  for (let i = 0, l = minLength; i < l; i++) {
    if (a[i] === b[i])
      prefix++;
    else
      break;
  }

  // Computing Jaro-Winkler score
  const j = jaro(a, b);

  if (j < boostThreshold)
    return j;

  return j + Math.min(scalingFactor, maxLength) * prefix * (1 - j);
}

/**
 * Jaro-Winkler standard function.
 */
const jaroWinkler = customJaroWinkler.bind(null, null);

/**
 * Jaro-Winkler distance is 1 - the Jaro-Winkler score.
 */
const distance = (a, b) => 1 - jaroWinkler(a, b);

/**
 * Exporting.
 */
export default jaroWinkler;
export {
  customJaroWinkler as custom,
  jaroWinkler as similarity,
  distance
};
