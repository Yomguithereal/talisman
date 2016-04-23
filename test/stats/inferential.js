/**
 * Talisman stats/inferential tests
 * =================================
 *
 */
import assert from 'assert';
import {
  variance,
  stdev,
  sampleVariance,
  sampleStdev
} from '../../src/stats/inferential';

describe('inferential', function() {
  const data = [13, 14, 15, 8, 20];

  describe('#.sampleVariance', function() {

    it('should return the sample variance of the given sequence.', function() {
      assert.strictEqual(sampleVariance(data), 18.5);
    });

    it('should return 0 if the length of the sequence is 1.', function() {
      assert.strictEqual(sampleVariance([5]), 0);
    });

    it('should throw if the given list is empty.', function() {
      assert.throws(function() {
        sampleVariance([]);
      }, /empty/);
    });
  });

  describe('#.sampleStdev', function() {

    it('should return the sample variance of the given sequence.', function() {
      assert.strictEqual(sampleStdev(data), Math.sqrt(18.5));
    });

    it('should return 0 if the length of the sequence is 1.', function() {
      assert.strictEqual(sampleStdev([5]), 0);
    });

    it('should throw if the given list is empty.', function() {
      assert.throws(function() {
        sampleStdev([]);
      }, /empty/);
    });
  });

  describe('#.variance', function() {
    it('should be possible to pass a custom ddof.', function() {
      assert.strictEqual(variance(3, data), 37);
    });

    it('should return 0 if the length of the sequence is too small.', function() {
      assert.strictEqual(variance(3, [1, 2]), 0);
    });
  });

  describe('#.stdev', function() {
    it('should be possible to pass a custom ddof.', function() {
      assert.strictEqual(stdev(3, data), Math.sqrt(37));
    });

    it('should return 0 if the length of the sequence is too small.', function() {
      assert.strictEqual(stdev(3, [1, 2]), 0);
    });
  });
});
