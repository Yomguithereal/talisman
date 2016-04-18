/**
 * Talisman classification/naive-bayes
 * ====================================
 *
 * Implementation of the Naive-Bayes classifier.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Naive_Bayes_classifier
 */
import {vec} from '../helpers/vectors';
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
    this.classes = new Set();
    this.classCounts = null;
    this.classPriors = null;
    this.theta = null;
    this.sigma = null;
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

    // Resetting internal state
    this.reset();

    // Espilon
    const XVariances = X.map(variance),
          maxVariance = Math.max(...XVariances);

    const epsilon = 1e-9 * maxVariance;

    // Finding unique classes
    for (let i = 0, l = y.length; i < l; i++)
      this.classes.add(y[0]);

    // Computing some indicators
    const nbFeatures = X[0].length,
          nbClasses = this.classes.size;

    this.theta = mat(nbClasses, nbFeatures);
    this.sigma = mat(nbClasses, nbFeatures);
    this.classCounts = vec(nbClasses);
    this.classPriors = vec(nbClasses);

    this.classes.forEach(cls => {

    });
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
