/**
 * Talisman metrics/overlap tests
 * ===============================
 *
 */
import assert from 'assert';
import overlap from '../../src/metrics/overlap';

describe('overlap', function() {

  it('should correctly compute the overlap coefficient.', function() {
    const tests = [
      ['abc', 'abc', 1],
      ['abc', 'def', 0],
      ['abc', 'abd', 2 / 3],
      ['abc', 'abcde', 1],
      [[1, 2, 3], [1, 2], 1]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(overlap(a, b), distance, `${a} / ${b}`);
    });
  });
});
