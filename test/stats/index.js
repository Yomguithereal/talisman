/**
 * Talisman stats tests
 * =====================
 *
 */
import assert from 'assert';
import {
  mean,
  variance,
  stdev,
  sampleVariance,
  sampleStdev
  } from '../../src/stats';

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

    it('should be possible to use Bessel\'s correction.', function() {
      assert.strictEqual(sampleVariance(data), 18.5);
    });
  });

  describe('#.stdev', function() {

    it('should throw with an empty list.', function() {
      assert.throws(function() {
        stdev([]);
      }, /empty/);
    });

    it('should correctly compute the standard deviation.', function() {
      assert.strictEqual(stdev(data), Math.sqrt(14.8));
    });

    it('should be possible to pass the pre-computed mean.', function() {
      assert.strictEqual(stdev(data, mean(data)), Math.sqrt(14.8));
    });

    it('should be possible to use Bessel\'s correction.', function() {
      assert.strictEqual(sampleStdev(data), Math.sqrt(18.5));
    });
  });
});
