/**
 * Talisman metrics/distance/euclidean tests
 * ==========================================
 *
 */
import assert from 'assert';
import euclidean, {squared} from '../../src/metrics/euclidean';

describe('euclidean', function() {

  const tests = [
    {
      a: [2],
      b: [4],
      distance: 2,
      squaredDistance: 4
    },
    {
      a: [1, 3],
      b: [4, 5],
      distance: Math.sqrt(13),
      squaredDistance: 13
    },
    {
      a: [1, 3, 5],
      b: [2, 1, 4],
      distance: Math.sqrt(6),
      squaredDistance: 6
    }
  ];

  it('should throw if the given vectors are not of the same dimension.', function() {
    assert.throws(function() {
      euclidean([1, 2], [1, 2, 3]);
    }, /dimension/);
  });

  it('should correctly compute the euclidean distance of n-dimensions vectors.', function() {
    tests.forEach(function({a, b, distance}) {
      assert.strictEqual(euclidean(a, b), distance);
    });
  });

  it('should be possible to compute the squared distance instead.', function() {
    tests.forEach(function({a, b, squaredDistance}) {
      assert.strictEqual(squared(a, b), squaredDistance);
    });
  });
});
