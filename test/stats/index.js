/**
 * Talisman stats tests
 * =====================
 *
 */
import assert from 'assert';
import {mean, variance, standardDeviation} from '../../src/stats';

describe('index', function() {
  const data = [13, 14, 15, 8, 20];

  describe('#.mean', function() {

    it('should throw with an empty list.', function() {
      assert.throws(function() {
        mean([]);
      }, /empty/);
    });

    it('should correctly compute the mean.', function() {
      assert.strictEqual(mean(data), 14);
    });
  });

  describe('#.variance', function() {

    it('should throw with an empty list.', function() {
      assert.throws(function() {
        variance([]);
      }, /empty/);
    });

    it('should correctly compute the variance.', function() {
      assert.strictEqual(variance(data), 14.8);
    });

    it('should be possible to pass the pre-computed mean.', function() {
      assert.strictEqual(variance(data, mean(data)), 14.8);
    });
  });

  describe('#.standardDeviation', function() {

    it('should throw with an empty list.', function() {
      assert.throws(function() {
        standardDeviation([]);
      }, /empty/);
    });

    it('should correctly compute the standard deviation.', function() {
      assert.strictEqual(standardDeviation(data), Math.sqrt(14.8));
    });

    it('should be possible to pass the pre-computed mean.', function() {
      assert.strictEqual(standardDeviation(data, mean(data)), Math.sqrt(14.8));
    });
  });
});
