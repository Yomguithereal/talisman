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
  constructor(model = null) {
    if (model)
      this.import(model);
  }

  /**
   * Method used to reset the internal state of the classifier.
   *
   * @return {NaiveBayes} - Returns itself for chaining.
   */
  reset() {
    this.classes = null;
    this.priors = null;
    this.dimensions = 0;
    this.theta = null;
    this.sigma = null;
  }

  /**
   * Method used to train the classifier and taking the dataset's vectors &
   * labels.
   *
   * @param  {array}      features    - Training vectors.
   * @param  {array}      labels      - Target values.
   * @return {NaiveBayes}             - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if features and labels are not of same length.
   */
  fit(features, labels) {
    const nbVectors = features.length;

    if (nbVectors !== labels.length)
      throw Error('talisman/classification/naive-bayes: given arrays have different lengths.');

    // Resetting internal state
    this.reset();

    // Classes
    const classes = {},
          priors = {};

    // Finding unique classes
    for (let i = 0, l = labels.length; i < l; i++) {
      const label = labels[i];

      classes[label] = classes[label] || 0;
      classes[label]++;
    }

    for (const k in classes)
      priors[k] = classes[k] / nbVectors;

    // Lengths
    const dimensions = features[0].length;

    // Building matrices
    const matrices = {},
          offsets = {},
          featureSets = mat(dimensions, nbVectors);

    for (const k in classes) {
      matrices[k] = mat(dimensions, classes[k]);
      offsets[k] = vec(dimensions, 0);
    }

    for (let i = 0; i < nbVectors; i++) {
      const label = labels[i],
            matrix = matrices[label];

      for (let j = 0; j < dimensions; j++) {
        matrix[j][offsets[label][j]++] = features[i][j];
        featureSets[j][i] = features[i][j];
      }
    }

    // Epsilon
    const maxVariance = Math.max(...featureSets.map(f => variance(f))),
          espilon = 1e-9 * maxVariance;

    // Computing means & variances
    const theta = {},
          sigma = {};

    for (const k in matrices) {
      theta[k] = [];
      sigma[k] = [];

      for (let i = 0; i < dimensions; i++) {
        theta[k][i] = mean(matrices[k][i]);
        sigma[k][i] = variance(matrices[k][i], theta[k][i]) + espilon;
      }
    }

    this.classes = classes;
    this.priors = priors;
    this.dimensions = dimensions;
    this.theta = theta;
    this.sigma = sigma;

    return this;
  }

  /**
   * Method used to get the joint log likelihood for a new vector.
   *
   * @param  {array} vector - The vector to classify.
   * @return {object}       - The probabilities.
   *
   * @throw {Error} - The classifier cannot predict if not yet fitted.
   * @throw {Error} - The classifier expects a vector of correct dimension.
   */
  jointLogLikelihood(vector) {
    if (!this.theta)
      throw Error('talisman/classification/naive-bayes.probabilities: the classifier is not yet fitted');

    if (vector.length !== this.dimensions)
      throw Error(`talisman/classification/naive-bayes.probabilities: the given vector is not of correct dimension (${vector.length} instead of ${this.dimensions}).`);

    const probabilities = {};

    for (const k in this.classes) {
      const theta = this.theta[k],
            sigma = this.sigma[k],
            jointi = Math.log(this.priors[k]);

      let s1 = 0,
          s2 = 0;

      for (let i = 0; i < this.dimensions; i++) {
        const t = theta[i],
              s = sigma[i],
              x = vector[i];

        s1 += Math.log(2 * Math.PI * s);
        s2 += Math.pow(x - t, 2) / s;
      }

      const nij = (-0.5 * s1) - (0.5 * s2);
      probabilities[k] = jointi + nij;
    }

    return probabilities;
  }

  /**
   * Method used to classify a new vector.
   *
   * @param  {array} vector - The vector to classify.
   * @return {mixed}        - The predicted label.
   */
  predict(vector) {
    const probabilities = this.jointLogLikelihood(vector);

    // Finding the best class
    let bestClass = null,
        bestScore = -Infinity;

    for (const k in probabilities) {
      if (bestScore < probabilities[k]) {
        bestClass = k;
        bestScore = probabilities[k];
      }
    }

    return bestClass;
  }

  /**
   * Method used to export the classifier's model to a JSON representation.
   *
   * @return {object} - The JSON model.
   */
  export() {
    return {
      classes: this.classes,
      priors: this.priors,
      dimensions: this.dimensions,
      theta: this.theta,
      sigma: this.sigma
    };
  }

  /**
   * Method used to import a JSON model into the classifier.
   *
   * @param  {object}     model - The JSON model.
   * @return {NaiveBayes}       - Returns itself for chaining.
   */
  import(model) {
    this.reset();

    this.classes = model.classes;
    this.priors = model.priors;
    this.dimensions = model.dimensions;
    this.theta = model.theta;
    this.sigma = model.sigma;
  }

  /**
   * Method used to force JSON.stringify to format the classifier using the
   * #.export method.
   */
  toJSON() {
    return this.export();
  }
}

/**
 * Exporting alias.
 */
export {NaiveBayes as GaussianNaiveBayes};
