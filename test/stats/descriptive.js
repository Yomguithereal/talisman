/**
 * Talisman stats tests
 * =====================
 *
 */
import assert from 'assert';
import {
  mean,
  addToMean,
  substractFromMean,
  combineMeans,
  variance,
  stdev,
  sampleVariance,
  sampleStdev,
  combineVariances
} from '../../src/stats/descriptive';

describe('descriptive', function() {
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

  describe('#.addToMean', function() {
    it('should correctly add the new value.', function() {
      const before = [13, 14, 15, 8, 20],
            after = [13, 14, 15, 8, 20, 54];

      const beforeMean = mean(before);

      assert.strictEqual(addToMean(beforeMean, before.length, 54), mean(after));
    });
  });

  describe('#.substractFromMean', function() {
    it('should correctly substract the value.', function() {
      const before = [13, 14, 15, 8, 20],
            after = [13, 14, 15, 8, 20, 54];

      const afterMean = mean(after);

      assert.strictEqual(substractFromMean(afterMean, after.length, 54), mean(before));
    });
  });

  describe('#.combineMeans', function() {
    it('should correctly combine two means.', function() {
      const before = [13, 14, 15, 8, 20],
            after = [13, 14, 15, 8, 20, 54];

      assert.strictEqual(
        combineMeans(mean(before), before.length, mean(after), after.length),
        mean(before.concat(after))
      );
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

  describe('#.combineVariances', function() {
    it('should correctly combine two means.', function() {
      const before = [13, 14, 15, 8, 20],
            after = [13, 14, 15, 8, 20, 54];

      assert.strictEqual(
        combineVariances(mean(before), variance(before), before.length, mean(after), variance(after), after.length),
        variance(before.concat(after))
      );
    });
  });
});
