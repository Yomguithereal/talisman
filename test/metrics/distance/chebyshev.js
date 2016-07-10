/**
 * Talisman metrics/distance/chebyshev tests
 * ==========================================
 *
 */
import assert from 'assert';
import chebyshev from '../../../src/metrics/distance/chebyshev';

describe('chebyshev', function() {

  const tests = [
    {
      a: [2],
      b: [4],
      distance: 2
    },
    {
      a: [1, 3],
      b: [4, 5],
      distance: 3
    },
    {
      a: [1, 3, 5],
      b: [2, 1, 4],
      distance: 2
    }
  ];

  it('should throw if the given vectors are not of the same dimension.', function() {
    assert.throws(function() {
      chebyshev([1, 2], [1, 2, 3]);
    }, /dimension/);
  });

  it('should correctly compute the chebyshev distance of n-dimensions vectors.', function() {
    tests.forEach(function({a, b, distance}) {
      assert.strictEqual(chebyshev(a, b), distance);
    });
  });
});
