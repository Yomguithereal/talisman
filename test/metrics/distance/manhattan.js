/**
 * Talisman metrics/distance/manhattan tests
 * ==========================================
 *
 */
import assert from 'assert';
import manhattan from '../../../src/metrics/distance/manhattan';

describe('manhattan', function() {

  const tests = [
    {
      a: [2],
      b: [4],
      distance: 2
    },
    {
      a: [1, 3],
      b: [4, 5],
      distance: 5
    },
    {
      a: [1, 3, 5],
      b: [2, 1, 4],
      distance: 4
    }
  ];

  it('should throw if the given vectors are not of the same dimension.', function() {
    assert.throws(function() {
      manhattan([1, 2], [1, 2, 3]);
    }, /dimension/);
  });

  it('should correctly compute the manhattan distance of n-dimensions vectors.', function() {
    tests.forEach(function({a, b, distance}) {
      assert.strictEqual(manhattan(a, b), distance);
    });
  });
});
