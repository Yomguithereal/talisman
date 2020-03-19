/**
 * Talisman metrics/distance/lcs tests
 * ====================================
 *
 */
import assert from 'assert';
import {distance, similarity} from '../../src/metrics/lcs';

describe('lcs', function() {

  it('should correctly compute lcs distance/similarity.', function() {
    const tests = [
      ['test', 'test', 1],
      ['test', '', 0],
      ['', '', 1],
      ['', 'test', 0],
      ['cat', 'hat', 2 / 3],
      ['Niall', 'Neil', 1 / 5],
      ['aluminum', 'Catalan', 0.25],
      ['ATCG', 'TAGC', 0.25],
      ['chat', 'cat', 1 / 2],
      [['h', 'a', 't'], ['c', 'a', 't'], 2 / 3]
    ];

    tests.forEach(function([a, b, d]) {
      assert.strictEqual(similarity(a, b), d, `${a} / ${b} => ${d}`);
      assert.strictEqual(distance(a, b), 1 - d, `${a} / ${b} => ${1 - d}`);
    });
  });
});
