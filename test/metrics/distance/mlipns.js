/**
 * Talisman metrics/distance/mlipns tests
 * =======================================
 *
 */
import assert from 'assert';
import mlipns from '../../../src/metrics/distance/mlipns';

describe('mlipns', function() {

  it('should correctly compute the MLIPNS distance.', function() {
    const tests = [
      ['cat', 'cat', 1],
      ['cat', '', 0],
      ['', 'cat', 0],
      ['cat', 'hat', 1],
      ['Niall', 'Neil', 0],
      ['aluminum', 'Catalan', 0],
      ['ATCG', 'TAGC', 0]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(mlipns(a, b), distance, `${a}, ${b}`);
    });
  });
});
