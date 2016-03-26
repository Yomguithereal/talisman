/**
 * Talisman metrics/levenshtein tests
 * ===================================
 *
 */
import assert from 'assert';
import levenshtein from '../../src/metrics/levenshtein';

describe('levenshtein', function() {
  it('should correctly compute the Levenshtein distance.', function() {
    const tests = [
      ['book', 'back', 2],
      ['hello', 'helo', 1],
      ['good sir', 'baal', 8],
      ['say', 'shiver', 5],
      ['feature', 'get-project-features', 13]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(levenshtein(a, b), distance);
    });
  });
});
