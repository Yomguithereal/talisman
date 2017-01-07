/**
 * Talisman metrics/distance/jaccard tests
 * ========================================
 *
 */
import assert from 'assert';
import jaccard, {
  index,
  similarity,
  distance
} from '../../../src/metrics/distance/jaccard';

describe('jaccard', function() {

 it('should compute the jaccard index & aliases correctly.', function() {
  const tests = [
    ['abc', '', 0],
    ['', 'abc', 0],
    ['', '', 1],
    ['abc', 'abc', 1],
    ['abc', 'xyz', 0],
    ['night', 'nacht', 3 / 7],
    ['context', 'contact', 4 / 7],
    ['ht', 'nacht', 2 / 5]
  ];

  tests.forEach(function([x, y, i]) {
    assert.strictEqual(jaccard(x, y), i, `${x} / ${y}`);
    assert.strictEqual(jaccard(x, y), index(x, y));
    assert.strictEqual(jaccard(x, y), similarity(x, y));
    assert.strictEqual(1 - jaccard(x, y), distance(x, y));
  });
 });
});
