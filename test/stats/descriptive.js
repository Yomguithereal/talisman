/**
 * Talisman stats/descriptive tests
 * =================================
 *
 */
import assert from 'assert';
import {
  sum,
  mean,
  addToMean,
  substractFromMean,
  combineMeans,
  mode,
  variance,
  stdev,
  combineVariances,
  quantile,
  median
} from '../../src/stats/descriptive';

describe('descriptive', function() {
  const data = [13, 14, 15, 8, 20];

  describe('#.sum', function() {
    it('should correctly compute the sum.', function() {
      assert.strictEqual(sum(data), 70);
    });
  });

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

  describe('#.mode', function() {
    it('should throw with an empty list.', function() {
      assert.throws(function() {
        mode([]);
      }, /empty/);
    });

    it('should return the correct mode.', function() {
      const numbers = [1, 2, 2, 2, 3, 3, 4, 5, 5];

      assert.strictEqual(mode(numbers), 2);
    });

    it('should return the first mode seen if more than one.', function() {
      const numbers = [1, 2, 2, 2, 3, 3, 4, 5, 5, 5];

      assert.strictEqual(mode(numbers), 2);
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

  describe('#.quantile', function() {
    const even = [6, 4, 3, 3, 5, 7, 4, 7, 8, 1];

    it('should throw when invalid arguments are provided.', function() {
      assert.throws(function() {
        quantile(2, [1, 2, 3]);
      }, /number/);

      assert.throws(function() {
        quantile(-10, [1, 2, 3]);
      }, /number/);

      assert.throws(function() {
        quantile('test', [1, 2, 3]);
      }, /number/);

      assert.throws(function() {
        quantile({}, [1, 2, 3]);
      }, /number/);

      assert.throws(function() {
        quantile({p: 0.5, interpolation: 'test'}, [1, 2, 3]);
      }, /interpolation/);
    });

    it('should correctly compute the desired quantile.', function() {
      assert.strictEqual(quantile(0.1, even), 2);
    });

    it('should interpolate if needed.', function() {
      const interpolation = function([a]) {
        return a;
      };

      assert.strictEqual(quantile(0.9, even), 7.5);
      assert.strictEqual(quantile({p: 0.9, interpolation}, even), 7);
    });
  });

  describe('#.median', function() {
    const odd = [6, 4, 3, 3, 5, 7, 7, 8, 1];

    it('should correctly compute the desired median.', function() {
      assert.strictEqual(median(odd), 5);
    });

    it('median should be the same as 0.5 quantile.', function() {
      assert.strictEqual(
        median(odd),
        quantile(0.5, odd)
      );
    });
  });
});
