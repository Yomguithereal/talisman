'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = undefined;
exports.default = levenshtein;

var _helpers = require('../helpers');

/**
 * Function returning the Levenshtein distance between two sequences.
 *
 * @param  {mixed}  a     - The first sequence to process.
 * @param  {mixed}  b     - The second sequence to process.
 * @return {number}       - The Levenshtein distance between a & b.
 */
function levenshtein(a, b) {
  a = (0, _helpers.seq)(a);
  b = (0, _helpers.seq)(b);

  if (!a.length) return b.length;
  if (!b.length) return a.length;

  var matrix = [];

  // Incrementing the cells horizontally
  for (var i = 0, l = b.length; i <= l; i++) {
    matrix[i] = [i];
  } // Incrementing the cells vertically
  for (var _i = 0, _l = a.length; _i <= _l; _i++) {
    matrix[0][_i] = _i;
  } // Filling the matrix
  for (var _i2 = 1, _l2 = b.length; _i2 <= _l2; _i2++) {
    for (var j = 1, m = a.length; j <= m; j++) {
      if (b[_i2 - 1] === a[j - 1]) {
        matrix[_i2][j] = matrix[_i2 - 1][j - 1];
      } else {
        matrix[_i2][j] = Math.min(matrix[_i2 - 1][j - 1] + 1, Math.min(matrix[_i2][j - 1] + 1, matrix[_i2 - 1][j] + 1));
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Alternative export.
 */
/**
 * Talisman metrics/levenshtein
 * =============================
 *
 * Functions computing the Levenshtein distance.
 */
exports.distance = levenshtein;