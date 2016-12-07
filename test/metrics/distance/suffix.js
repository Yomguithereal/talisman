/**
 * Talisman metrics/distance/suffix tests
 * =======================================
 *
 */
import assert from 'assert';
import {distance, similarity} from '../../../src/metrics/distance/suffix';

describe('suffix', function() {

  it('should correctly compute suffix distance/similarity.', function() {
    const tests = [
      ['test', 'test', 1],
      ['test', '', 0],
      ['', '', 1],
      ['', 'test', 0],
      ['cat', 'hat', 2 / 3],
      ['Niall', 'Neil', 0.25],
      ['aluminum', 'Catalan', 0],
      ['ATCG', 'TAGC', 0],
      ['ATCG', 'ATCH', 0],
      ['Test', 'test', 3 / 4]
    ];

    tests.forEach(function([a, b, d]) {
      assert.strictEqual(similarity(a, b), d, `${a} / ${b} => ${d}`);
      assert.strictEqual(distance(a, b), 1 - d, `${a} / ${b} => ${1 - d}`);
    });
  });
});
