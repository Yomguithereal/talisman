'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = exports.similarity = exports.index = undefined;

var _tversky = require('./tversky');

var _tversky2 = _interopRequireDefault(_tversky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Jaccard index is just Tversky index with alpha = beta = 1.
 */
var jaccard = function jaccard(x, y) {
  if (x === y) return 1;
  return (0, _tversky2.default)({ alpha: 1, beta: 1 }, x, y);
};

/**
 * Jaccard distance is 1 - the Jaccard index.
 */
/**
 * Talisman metrics/jaccard
 * =========================
 *
 * Functions computing the Jaccard distance/similarity.
 */
var distance = function distance(x, y) {
  return 1 - jaccard(x, y);
};

/**
 * Exporting.
 */
exports.default = jaccard;
exports.index = jaccard;
exports.similarity = jaccard;
exports.distance = distance;