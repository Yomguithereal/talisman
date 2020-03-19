/**
 * Talisman metrics/distance/canberra tests
 * =========================================
 *
 */
import assert from 'assert';
import canberra from '../../src/metrics/canberra';

describe('canberra', function() {

  const tests = [
    {
      a: [2],
      b: [4],
      distance: 2 / 6
    },
    {
      a: [1, 3],
      b: [4, 5],
      distance: 0.85
    },
    {
      a: [1, 3, 5],
      b: [2, 1, 4],
      distance: 1 / 3 + 1 / 2 + 1 / 9
    }
  ];

  it('should throw if the given vectors are not of the same dimension.', function() {
    assert.throws(function() {
      canberra([1, 2], [1, 2, 3]);
    }, /dimension/);
  });

  it('should correctly compute the canberra distance of n-dimensions vectors.', function() {
    tests.forEach(function({a, b, distance}) {
      assert.strictEqual(canberra(a, b), distance);
    });
  });
});
