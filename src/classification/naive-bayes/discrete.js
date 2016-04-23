/**
 * Talisman classification/naive-bayes/discrete
 * =============================================
 *
 * Abstract discrete Naive-Bayes classifier.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Naive_Bayes_classifier
 */

/**
 * Abstract discrete Naive-Bayes classifier.
 *
 * @constructor
 */
export default class AbstractDiscreteNaiveBayes {
  constructor(options) {
    const {
      alpha = 1.0
    } = options || {};

    this.alpha = alpha;
  }

  /**
   * Method used to reset the internal state of the classifier.
   *
   * @return {NaiveBayes} - Returns itself for chaining.
   */
  reset() {
    this.classes = null;
    this.counts = null;

    return this;
  }

  /**
   * Method used to train the classifier and taking the dataset's vectors &
   * labels.
   *
   * @param  {array}      features - Training vectors.
   * @param  {array}      labels   - Target values.
   * @return {NaiveBayes}          - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if features and labels are not of same length.
   */
  fit(features, labels) {
    const nbVectors = features.length;

    if (nbVectors !== labels.length)
      throw Error('talisman/classification/naive-bayes/discrete.fit: given arrays have different lengths.');

    // Resetting internal state
    this.reset();

    // Finding classes
    const classes = {};

    for (let i = 0, l = labels.length; i < l; i++) {
      const label = labels[i];

      classes[label] = classes[label] || 0;
      classes[label]++;
    }

    // Counting features per classes
    const counts = {};

    for (const k in classes)
      counts[k] = {};

    for (let i = 0; i < nbVectors; i++) {
      const cls = counts[labels[i]],
            vector = features[i];

      for (let j = 0, l = vector.length; j < l; j++) {
        const value = vector[j];

        cls[value] = cls[value] || 0;
        cls[value]++;
      }
    }

    this.classes = classes;
    this.counts = counts;

    return this;
  }
}
