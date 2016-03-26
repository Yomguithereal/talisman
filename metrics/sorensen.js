'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = exports.similarity = exports.index = undefined;

var _dice = require('./dice');

var _dice2 = _interopRequireDefault(_dice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Sorensen index is the same as the Dice one.
 */
exports.default = _dice2.default; /**
                                   * Talisman metrics/sorensen
                                   * ==========================
                                   *
                                   * Functions computing the Sorensen coefficient.
                                   */

exports.index = _dice.index;
exports.similarity = _dice.similarity;
exports.distance = _dice.distance;