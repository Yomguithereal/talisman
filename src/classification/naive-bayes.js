/**
 * Talisman classification/naive-bayes
 * ====================================
 *
 * Implementation of the Naive-Bayes classifier.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Naive_Bayes_classifier
 */
import {mat} from '../helpers/matrices';
import {mean, variance} from '../stats/descriptive';

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

    // Properties
    this.classes = {};
    this.dimensions = null;
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
    const nbVectors = X.length;

    if (nbVectors !== y.length)
      throw Error('talisman/classification/naive-bayes: given arrays have different lengths.');

    // Resetting internal state
    this.reset();

    // Espilon
    const XVariances = X.map(variance),
          maxVariance = Math.max(...XVariances);

    const epsilon = 1e-9 * maxVariance;

    // Finding unique classes
    for (let i = 0, l = y.length; i < l; i++) {
      const label = y[i];

      this.classes[label] = this.classes[label] || {count: 0};
      this.classes[label].count++;
    }

    // Lengths
    this.dimensions = X[0].length;
    const nbClasses = Object.keys(this.classes).length;

    // Building summaries
    for (const k in this.classes) {
      const c = this.classes[k];
      c.matrix = mat(c.count, this.dimensions);
    }

    for (let i = 0; i < nbVectors; i++) {
      const label = y[i],
            c = this.classes[label];

      for (let j = 0; j < this.dimensions; j++) {
        c.matrix[j][i] = X[i][j];
      }
    }
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
