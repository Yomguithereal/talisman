/**
 * Talisman metrics/distance/sift4 tests
 * =======================================
 *
 */
import assert from 'assert';
import sift4, {custom} from '../../../src/metrics/distance/sift4';

describe('sift4', function() {

  it('should correctly compute the SIFT4 distance.', function() {
    const tests = [
      ['', '', 0],
      ['cat', 'cat', 0],
      ['cat', '', 3],
      ['', 'cat', 3],
      ['cat', 'hat', 1],
      ['levenshtein', 'frankenstein', 10]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(sift4(a, b), distance, `${a}, ${b}`);
      assert.strictEqual(custom({symmetric: true}, a, b), distance, `${a}, ${b}`);
    });
  });

  it('should be possible to change the maxOffset.', function() {
    assert.strictEqual(
      custom({transpositions: true, maxOffset: 5}, 'levenshtein', 'frankenstein'),
      6
    );

    assert.strictEqual(
      custom({transpositions: true, maxOffset: 2}, 'levenshtein', 'frankenstein'),
      7
    );

    assert.strictEqual(
      custom({transpositions: true, maxOffset: 1}, 'levenshtein', 'frankenstein'),
      12
    );
  });

  it('should be possible to compute transpositions.', function() {
    assert.strictEqual(
      sift4('levenshtein', 'frankenstein'),
      10
    );

    assert.strictEqual(
      custom({transpositions: true}, 'levenshtein', 'frankenstein'),
      6
    );
  });

  it('should be possible to set a maximum distance.', function() {
    assert.strictEqual(
      custom({
        maxDistance: 10
      }, 'levenshtein', 'frankenstein'),
      10
    );

    assert.strictEqual(
      custom({
        maxDistance: 5
      }, 'levenshtein', 'frankenstein'),
      Infinity
    );

    assert.strictEqual(
      custom({
        maxDistance: 10,
        transpositions: true
      }, 'levenshtein', 'frankenstein'),
      6
    );

    assert.strictEqual(
      custom({
        maxDistance: 3,
        transpositions: true
      }, 'levenshtein', 'frankenstein'),
      Infinity
    );
  });
});
