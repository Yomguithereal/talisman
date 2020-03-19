/**
 * Talisman metrics/distance/lcs tests
 * ====================================
 *
 */
import assert from 'assert';
import {distance, similarity} from '../../src/metrics/ratcliff-obershelp';

describe('ratcliff-obershelp', function() {

  it('should correctly compute ratcliff-obershelp distance/similarity.', function() {
    const tests = [
      ['test', 'test', 1],
      ['test', '', 0],
      ['', '', 1],
      ['', 'test', 0],
      ['mathematics', 'matematica', 18 / 21],
      ['mathematics'.split(''), 'matematica'.split(''), 18 / 21],
      ['cat', 'hat', 2 / 3],
      ['Niall', 'Neil', 2 / 3],
      ['aluminum', 'Catalan', 0.4],
      ['ATCG', 'TAGC', 0.5]
    ];

    tests.forEach(function([a, b, d]) {
      assert.strictEqual(similarity(a, b), d, `${a} / ${b} => ${d}`);
      assert.strictEqual(distance(a, b), 1 - d, `${a} / ${b} => ${1 - d}`);
    });
  });
});
