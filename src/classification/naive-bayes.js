/**
 * Talisman classification/naive-bayes
 * ====================================
 *
 * Implementation of the Naive-Bayes classifier.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Naive_Bayes_classifier
 */
import {mean, sampleStdev} from '../stats';

/**
 * The classifier's class.
 *
 * @constructor
 */
export default class NaiveBayes {

  /**
   * Method used to reset the internal state of the classifier.
   *
   * @return {NaiveBayes} - Returns itself for chaining.
   */
  reset() {

  }

  /**
   * Method used to train the classifier and taking the dataset's vectors &
   * labels.
   *
   * @param  {array} X    - Training vectors.
   * @param  {array} y    - Target values.
   * @return {NaiveBayes} - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if X and y are not of same length.
   */
  fit(X, y) {
    if (X.length !== y.length)
      throw Error('talisman/classification/naive-bayes: given arrays have different lengths.');

  }

  /**
   * Method used to classify a new vector.
   *
   * @param  {array} vector - The vector to classify.
   * @return {mixed}        - The predicted label.
   */
  predict(vector) {

  }
}

/**
 * Exporting alias.
 */
export {NaiveBayes as GaussianNaiveBayes};
