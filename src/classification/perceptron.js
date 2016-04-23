/**
 * Talisman classification/perceptron
 * ===================================
 *
 * Implementation of the Perceptron linear classifier.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Perceptron
 */
import {add, dot, scale} from '../helpers/vectors';
import random from 'lodash/random';

/**
 * The Heaviside step function.
 */
const step = x => {
  return x < 0 ? 0 : 1;
};

/**
 * Getting a random index from the given list.
 */
function randomIndex(list) {
  return random(0, list.length - 1);
}

/**
 * The Perceptron classifier.
 *
 * @constructor
 */
export default class Perceptron {
  constructor(options) {
    const {
      learningRate = 1,
      iterations = 5
    } = options || {};

    if (learningRate <= 0 || learningRate > 1)
      throw Error('talisman/classification/perceptron: the learning rate should be comprised between 0 and 1 inclusive.');

    this.options = {
      learningRate,
      iterations
    };
  }

  /**
   * Method used to reset the internal state of the Perceptron.
   *
   * @return {Perceptron}           - Returns itself for chaining purposes.
   */
  reset() {
    this.dimensions = 0;
    this.weights = null;
  }

  /**
   * Method used to train the Perceptron.
   *
   * @param  {array}       features - Training vectors.
   * @param  {array}       labels   - Target value (0 or 1).
   * @return {Perceptron}           - Returns itself for chaining purposes.
   *
   * @throws {Error} - Will throw if features and labels are not of same length.
   */
  fit(features, labels) {
    if (features.length !== labels.length)
      throw Error('talisman/classification/perceptron.fit: given arrays have different lengths.');

    // Resetting internal state
    this.reset();

    const dimensions = features[0].length;

    let weights = new Array(dimensions);

    for (let i = 0; i < dimensions; i++)
      weights[i] = Math.random();

    // Performing iterations
    for (let i = 0, l = this.options.iterations; i < l; i++) {
      const index = randomIndex(features),
            vector = features[index],
            expected = +!!labels[index],
            result = dot(weights, vector),
            error = expected - step(result);

      // Adjusting weights
      const adjustment = scale(vector, this.options.learningRate * error);
      weights = add(weights, adjustment);
    }

    this.dimensions = dimensions;
    this.weights = weights;

    return this;
  }

  /**
   * Method used to classify a new vector.
   *
   * @param  {array} vector - The vector to classify.
   * @return {number}       - The predicted label (0 or 1).
   *
   * @throw {Error} - The classifier cannot predict if not yet fitted.
   * @throw {Error} - The classifier expects a vector of correct dimension.
   */
  predict(vector) {

    if (!this.weights)
      throw Error('talisman/classification/naive-bayes/gaussian.probabilities: the classifier is not yet fitted');

    if (vector.length !== this.dimensions)
      throw Error(`talisman/classification/naive-bayes/gaussian.probabilities: the given vector is not of correct dimension (${vector.length} instead of ${this.dimensions}).`);

    return step(dot(vector, this.weights));
  }
}
