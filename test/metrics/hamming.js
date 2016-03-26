/**
 * Talisman metrics/hamming tests
 * ===============================
 *
 */
import assert from 'assert';
import hamming from '../../src/metrics/hamming';

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
});
