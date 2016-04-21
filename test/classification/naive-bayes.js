/**
 * Talisman classification/naive-bayes tests
 * ==========================================
 *
 */
import {assert} from 'chai';
import NaiveBayes from '../../src/classification/naive-bayes';

describe('naive-bayes', function() {

  describe('gaussian', function() {
    const features = [[-2, -1], [-1, -1], [-1, -2], [1, 1], [1, 2], [2, 1]],
          labels = [1, 1, 1, 2, 2, 2];

    it('should throw if features & labels don\'t have the same length.', function() {
      assert.throws(function() {
        const classifier = new NaiveBayes();
        classifier.fit([[1, 2], [2, 1]], [1]);
      }, /length/);
    });

    it('should correctly compute joint log likelihood.', function() {
      const classifier = new NaiveBayes();
      classifier.fit(features, labels);

      const probabilities = classifier.jointLogLikelihood([-2, -1]);

      assert.approximately(probabilities['1'], -2.277, 0.01);
      assert.approximately(probabilities['2'], -38.277, 0.01);
    });

    it('should correctly predict.', function() {
      const classifier = new NaiveBayes();
      classifier.fit(features, labels);

      assert.strictEqual(classifier.predict([-2, -1]), '1');
      assert.strictEqual(classifier.predict([1, 2]), '2');
      assert.strictEqual(classifier.predict([-45, -50]), '1');
      assert.strictEqual(classifier.predict([45, 76]), '2');
    });

    it('should also work when hitting extreme numerical cases.', function() {
      const classifier = new NaiveBayes();
      classifier.fit(
        [[-1, -2, -5], [45, 6, 97]],
        [1, 2]
      );

      const probabilities = classifier.jointLogLikelihood([45, 65, 61]);

      assert.approximately(probabilities['1'], -2107074186.39, 0.01);
      assert.approximately(probabilities['2'], -918300637.75, 0.01);

      assert.strictEqual(classifier.predict([45, 65, 61]), '2');
    });

    it('should throw if you try to predict before fitting.', function() {
      assert.throws(function() {
        const classifier = new NaiveBayes();
        classifier.predict([1, 2]);
      }, /fitted/);
    });

    it('should throw if you try to predict a vector of different dimension.', function() {
      assert.throws(function() {
        const classifier = new NaiveBayes();
        classifier.fit(features, labels);
        classifier.predict([1, 2, 3]);
      }, /dimension/);
    });
  });
});
