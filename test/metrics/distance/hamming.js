/**
 * Talisman metrics/distance/hamming tests
 * ========================================
 *
 */
import assert from 'assert';
import hamming, {
  normalizedDistance,
  normalizedSimilarity
} from '../../../src/metrics/distance/hamming';

describe('hamming', function() {

  it('should throw if the given sequences are not of equal length.', function() {
    assert.throws(function() {
      hamming('hello', 'goodbye');
    }, /equal/);
  });

  it('should correctly compute the Hamming distance.', function() {
    const tests = [
      ['1011101', '1001001', 2],
      ['2143896', '2233796', 3],
      ['ramer', 'cases', 3],
      ['abc', 'abc', 0],
      ['abc', 'abd', 1],
      ['night', 'nacht', 2],
      [[0, 1, 0, 1], [1, 2, 0, 1], 2]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(hamming(a, b), distance, `${a} / ${b}`);
    });
  });

  it('should correctly compute the normalized Hamming distance/similarity.', function() {
    const tests = [
      ['cat', 'hat', 1 / 3],
      ['Niall', 'Neil', 0.6],
      ['aluminum', 'Catalan', 1],
      ['ATCG', 'TAGC', 1],
      ['Estelle', 'Estrella', 0.5]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(normalizedDistance(a, b), distance, `${a} / ${b}`);
      assert.strictEqual(normalizedSimilarity(a, b), 1 - distance, `${a} / ${b}`);
    });
  });
});
