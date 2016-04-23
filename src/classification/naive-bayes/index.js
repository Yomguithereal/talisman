/**
 * Talisman classification/naive-bayes
 * ====================================
 *
 * Exporting the various Naive Bayes classifiers.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Naive_Bayes_classifier
 */
import GaussianNaiveBayes from './gaussian';
import MultinomialNaiveBayes from './multinomial';

export default GaussianNaiveBayes;
export {
  GaussianNaiveBayes,
  MultinomialNaiveBayes
};
