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
  constructor() {

    // Properties
    this.summaries = {};
  }

  /**
   * Method used to train the classifier and taking the dataset's vectors &
   * labels.
   *
   * @param  {array} vectors  - The dataset's vectors.
   * @param  {array} labels   - The dataset's labels.
   * @return {NaiveBayes}     - Returns itself for chaining.
   *
   * @throws {Error} - Will throw if both given arrays are not of same length.
   */
  fit(vectors, labels) {
    if (vectors.length !== labels.length)
      throw Error('talisman/classification/naive-bayes: given arrays have different lengths.');

    // First we need to group the vector by labels
    const byLabel = {};

    for (let i = 0, l = labels.length; i < l; i++) {
      const label = labels[i],
            vector = vectors[i];

      byLabel[label] = byLabel[label] || [];
      byLabel[label].push(vector);
    }

    // Then we can compute the summaries per label
    for (const label in byLabel) {
      const summary = {};

      summary.mean = mean(byLabel[label]);
      summary.stdev = sampleStdev(byLabel[label], summary.mean);

      this.summaries[label] = summary;
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
