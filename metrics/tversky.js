'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tversky;

var _setFunctions = require('set-functions');

var _helpers = require('../helpers');

/**
 * Helpers
 */
/**
 * Talisman metrics/tversky
 * =========================
 *
 * Functions computing the Tversky index.
 */
function I(X, Y) {
  return (0, _setFunctions.intersection)(X, Y).size;
}

function R(X, Y) {
  return (0, _setFunctions.difference)(X, Y).size;
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
  var XIY = I(x, y);

  return XIY / (XIY + alpha * R(x, y) + beta * R(y, x));
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
  var XIY = I(x, y),
      XminusY = R(x, y),
      YminusX = R(y, x),
      a = Math.min(XminusY, YminusX),
      b = Math.max(XminusY, YminusX);

  return XIY / (XIY + beta * (alpha * a + Math.pow(alpha - 1, b)));
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
function tversky(params, x, y) {
  params = params || {};

  var _params = params;
  var _params$alpha = _params.alpha;
  var alpha = _params$alpha === undefined ? 1 : _params$alpha;
  var _params$beta = _params.beta;
  var beta = _params$beta === undefined ? 1 : _params$beta;
  var _params$symmetric = _params.symmetric;
  var symmetric = _params$symmetric === undefined ? false : _params$symmetric;


  if (alpha < 0 || beta < 0) throw Error('talisman/metrics/tversky: alpha & beta parameters should be >= 0.');

  // Casting to sets
  x = new Set((0, _helpers.seq)(x));
  y = new Set((0, _helpers.seq)(y));

  return symmetric ? symmetricTversky(x, y, alpha, beta) : asymmetricTversky(x, y, alpha, beta);
}