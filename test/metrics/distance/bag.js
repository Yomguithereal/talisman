/**
 * Talisman metrics/distance/bag tests
 * ====================================
 *
 */
import assert from 'assert';
import bag from '../../../src/metrics/distance/bag';

describe.skip('bag', function() {

  it('should correctly compute the Bag distance.', function() {
    const tests = [
      ['cat', 'cat', 0],
      ['cat', '', 3],
      ['', 'cat', 3],
      ['cat', 'hat', 1],
      ['Niall', 'Neil', 2],
      ['aluminum', 'Catalan', 3],
      ['ATCG', 'TAGC', 0]
    ];

    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(bag(a, b), distance, `${a}, ${b}`);
    });
  });
});
