'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = exports.similarity = exports.index = undefined;

var _tversky = require('./tversky');

var _tversky2 = _interopRequireDefault(_tversky);

var _ngrams = require('../stats/ngrams');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Hashing the bigrams to be able to compare them referentially.
 */
/**
 * Talisman metrics/dice
 * ======================
 *
 * Functions computing the Dice coefficient.
 */
var hasher = function hasher(subsequence) {
  return subsequence.join('');
};

/**
 * Dice coefficient is just Tversky index with alpha = beta = 1 over the
 * sequences' bigrams.
 */
var dice = function dice(x, y) {

  // Shortcuts
  if (x === y) return 1;

  if (x.length === 1 && y.length === 1 && x !== y) return 0;

  // Computing the sequences' bigrams
  x = (0, _ngrams.bigrams)(x, hasher);
  y = (0, _ngrams.bigrams)(y, hasher);

  return (0, _tversky2.default)({ alpha: 0.5, beta: 0.5 }, x, y);
};

/**
 * Dice distance is 1 - the Dice index.
 */
var distance = function distance(x, y) {
  return 1 - dice(x, y);
};

/**
 * Exporting.
 */
exports.default = dice;
exports.index = dice;
exports.similarity = dice;
exports.distance = distance;