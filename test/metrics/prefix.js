/**
 * Talisman metrics/distance/prefix tests
 * =======================================
 *
 */
import assert from 'assert';
import {distance, similarity} from '../../src/metrics/prefix';

describe('prefix', function() {

  it('should correctly compute prefix distance/similarity.', function() {
    const tests = [
      ['test', 'test', 1],
      ['test', '', 0],
      ['', '', 1],
      ['', 'test', 0],
      ['cat', 'hat', 0],
      ['Niall', 'Neil', 0.25],
      ['aluminum', 'Catalan', 0],
      ['ATCG', 'TAGC', 0],
      ['ATCG', 'ATCH', 0.75],
      ['ATCG', 'ATCGHI', 1]
    ];

    tests.forEach(function([a, b, d]) {
      assert.strictEqual(similarity(a, b), d, `${a} / ${b} => ${d}`);
      assert.strictEqual(distance(a, b), 1 - d, `${a} / ${b} => ${1 - d}`);
    });
  });
});
