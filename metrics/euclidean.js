'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.squared = squared;
exports.default = euclidean;
/**
 * Talisman metrics/euclidean
 * ===========================
 *
 * Function computing the euclidean distance.
 */

/**
 * Function returning the squared euclidean distance between two vectors.
 *
 * @param  {mixed}  a     - The first vector.
 * @param  {mixed}  b     - The second vector.
 * @return {number}       - The squared euclidean distance between a & b.
 *
 * @throws {Error} The function expects vector of same dimensions.
 */
function squared(a, b) {
  if (a.length !== b.length) throw Error('talisman/metrics/euclidean: the given vectors are not of the same dimension.');

  var distance = 0;

  for (var i = 0, l = a.length; i < l; i++) {
    distance += Math.pow(a[i] - b[i], 2);
  }return distance;
}

/**
 * Function returning the euclidean distance between two vectors.
 *
 * @param  {mixed}  a     - The first vector.
 * @param  {mixed}  b     - The second vector.
 * @return {number}       - The euclidean distance between a & b.
 *
 * @throws {Error} The function expects vector of same dimensions.
 */
function euclidean(a, b) {
  return Math.sqrt(squared(a, b));
}