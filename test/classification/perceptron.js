/**
 * Talisman classification/perceptron tests
 * =========================================
 *
 */
import {assert} from 'chai';
import Perceptron from '../../src/classification/perceptron';

describe('perceptron', function() {
  const OR = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];

  const labels = [0, 1, 1, 1];

  it('should throw if given learning rate is invalid.', function() {
    assert.throws(function() {
      const classifier = new Perceptron({learningRate: 59});
      classifier.fit(OR, labels);
    }, /between/);
  });

  it('should throw if given arrays don\'t have the same length.', function() {
    assert.throws(function() {
      const classifier = new Perceptron();

      classifier.fit([[1, 2], [2, 3]], [0]);
    }, /length/);
  });

  it('should throw when attempting to predict with an unfitted Perceptron.', function() {
    assert.throws(function() {
      const classifier = new Perceptron();

      classifier.predict([1, 2]);
    }, /fitted/);
  });

  it('should throw when attempting to predict a vector of invalid dimension.', function() {
    assert.throws(function() {
      const classifier = new Perceptron();
      classifier.fit(OR, labels);

      classifier.predict([1]);
    }, /dimension/);
  });

  it('should correctly predict.', function() {
    const classifier = new Perceptron({iterations: 100});

    classifier.fit(OR, labels);

    assert.strictEqual(classifier.predict([0, 0, 0]), 1);

    OR.forEach(function(vector, i) {
      assert.strictEqual(classifier.predict(vector), labels[i], `[${vector}] => ${labels[i]}`);
    });
  });
});
