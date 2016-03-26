'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hamming;

var _helpers = require('../helpers');

/**
 * Function returning the Hamming distance between two sequences.
 *
 * @param  {mixed}  a     - The first sequence to process.
 * @param  {mixed}  b     - The second sequence to process.
 * @return {number}       - The Hamming distance between a & b.
 *
 * @throws {Error} The function expects sequences of equal lengths.
 */
function hamming(a, b) {

  if (a === b) return 0;

  a = (0, _helpers.seq)(a);
  b = (0, _helpers.seq)(b);

  if (a.length !== b.length) throw Error('talisman/metrics/hamming: given sequences are not of equal length.');

  var distance = 0;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) distance++;
  }

  return distance;
} /**
   * Talisman metrics/hamming
   * =========================
   *
   * Function computing the Hamming distance.
   */