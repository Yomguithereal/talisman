/**
 * Talisman classification/naive-bayes tests
 * ==========================================
 *
 */
import {assert} from 'chai';
import GaussianNaiveBayes from '../../src/classification/naive-bayes/gaussian';
// import porter from '../../src/stemmers/porter';
// import {default as words} from '../../src/tokenizers/words/naive';

describe('naive-bayes', function() {

  describe('gaussian', function() {
    const features = [[-2, -1], [-1, -1], [-1, -2], [1, 1], [1, 2], [2, 1]],
          labels = [1, 1, 1, 2, 2, 2];

    it('should throw if features & labels don\'t have the same length.', function() {
      assert.throws(function() {
        const classifier = new GaussianNaiveBayes();
        classifier.fit([[1, 2], [2, 1]], [1]);
      }, /length/);
    });

    it('should correctly compute joint log likelihood.', function() {
      const classifier = new GaussianNaiveBayes();
      classifier.fit(features, labels);

      const probabilities = classifier.jointLogLikelihood([-2, -1]);

      assert.approximately(probabilities['1'], -2.277, 0.01);
      assert.approximately(probabilities['2'], -38.277, 0.01);
    });

    it('should correctly predict.', function() {
      const classifier = new GaussianNaiveBayes();
      classifier.fit(features, labels);

      assert.strictEqual(classifier.predict([-2, -1]), '1');
      assert.strictEqual(classifier.predict([1, 2]), '2');
      assert.strictEqual(classifier.predict([-45, -50]), '1');
      assert.strictEqual(classifier.predict([45, 76]), '2');
    });

    it('should also work when hitting extreme numerical cases.', function() {
      const classifier = new GaussianNaiveBayes();
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
        const classifier = new GaussianNaiveBayes();
        classifier.predict([1, 2]);
      }, /fitted/);
    });

    it('should throw if you try to predict a vector of different dimension.', function() {
      assert.throws(function() {
        const classifier = new GaussianNaiveBayes();
        classifier.fit(features, labels);
        classifier.predict([1, 2, 3]);
      }, /dimension/);
    });

    it('should be possible to export the model.', function() {
      const classifier = new GaussianNaiveBayes();
      classifier.fit(features, labels);

      const json = classifier.export();

      assert.sameMembers(Object.keys(json), ['classes', 'priors', 'dimensions', 'theta', 'sigma']);
      assert.deepEqual(JSON.parse(JSON.stringify(classifier)), classifier.export());
    });

    it('should be possible to import a model.', function() {
      const classifier = new GaussianNaiveBayes();
      classifier.fit(features, labels);

      const otherClassifier = new GaussianNaiveBayes();
      otherClassifier.import(classifier.export());

      assert.strictEqual(otherClassifier.predict([-2, -1]), '1');
      assert.strictEqual(otherClassifier.predict([1, 2]), '2');
      assert.strictEqual(otherClassifier.predict([-45, -50]), '1');
      assert.strictEqual(otherClassifier.predict([45, 76]), '2');
    });
  });

  // describe.only('multinomial', function() {
  //   let features = [
  //     'Love is in the air.',
  //     'The air is brimming with romance.',
  //     'Oh Romeo, do you love me?',
  //     'I am the best accountant.',
  //     'Accounting and consulting are what I do.',
  //     'Consulting you is so much fun.'
  //   ];

  //   // Transforming features
  //   features = features
  //     .map(words)
  //     .map(ws => ws.map(porter));

  //   const labels = [
  //     'lover',
  //     'lover',
  //     'lover',
  //     'accountant',
  //     'accountant',
  //     'accountant'
  //   ];

  //   const classifier = new MultinomialNaiveBayes();
  //   classifier.fit(features, labels);
  //   console.log(classifier);
  // });
});
