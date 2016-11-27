/**
 * Talisman metrics/distance/tversky
 * ==================================
 *
 * Functions computing the Tversky index.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Tversky_index
 *
 * [Article]:
 * Tversky, Amos (1977). "Features of Similarity".
 * Psychological Reviews 84 (4): 327–352.
 *
 * [Tags]: metric, asymmetric.
 */
import {seq} from '../../helpers';

/**
 * Helpers
 */
function I(X, Y) {
  const intersection = new Set();

  X.forEach(item => {
    if (Y.has(item))
      intersection.add(item);
  });

  return intersection.size;
}

function R(X, Y) {
  const difference = new Set();

  X.forEach(item => {
    if (!Y.has(item))
      difference.add(item);
  });

  return difference.size;
}


/**
 * Function returning the asymmetric Tversky index between both sequences.
 *
 * @param  {mixed}  x     - The first sequence to process.
 * @param  {mixed}  y     - The second sequence to process.
 * @param  {number} alpha - The alpha parameter.
 * @param  {number} beta  - The beta parameter.
 * @return {number}       - The asymmetric Tversky index.
 */
function asymmetricTversky(x, y, alpha, beta) {
  const XIY = I(x, y);

  return XIY / (XIY + (alpha * R(x, y)) + (beta * R(y, x)));
}

/**
 * Function returning the symmetric Tversky index between both sequences.
 *
 * @param  {mixed}  x     - The first sequence to process.
 * @param  {mixed}  y     - The second sequence to process.
 * @param  {number} alpha - The alpha parameter.
 * @param  {number} beta  - The beta parameter.
 * @return {number}       - The symmetric Tversky index.
 */
function symmetricTversky(x, y, alpha, beta) {
  const XIY = I(x, y),
        XminusY = R(x, y),
        YminusX = R(y, x),
        a = Math.min(XminusY, YminusX),
        b = Math.max(XminusY, YminusX);

  return XIY / (XIY + (beta * (alpha * a + Math.pow(alpha - 1, b))));
}

/**
 * Function returning the Tversky index according to given parameters between
 * both sequences.
 *
 * @param  {object} params - The index's parameters.
 * @param  {mixed}  x      - The first sequence to process.
 * @param  {mixed}  y      - The second sequence to process.
 * @return {number}        - The resulting Tversky index.
 *
 * @throws {Error} The function expects both alpha & beta to be >= 0.
 */
export default function tversky(params, x, y) {
  params = params || {};

  const {
    alpha = 1,
    beta = 1,
    symmetric = false
  } = params;

  if (alpha < 0 || beta < 0)
    throw Error('talisman/metrics/distance/tversky: alpha & beta parameters should be >= 0.');

  // Casting to sets
  x = new Set(seq(x));
  y = new Set(seq(y));

  return symmetric ?
    symmetricTversky(x, y, alpha, beta) :
    asymmetricTversky(x, y, alpha, beta);
}
