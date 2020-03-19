/**
 * Talisman metrics/distance/length tests
 * =========================================
 *
 */
import assert from 'assert';
import {distance, similarity} from '../../src/metrics/length';

describe('length', function() {
  const tests = [
    ['test', 'test', 1],
    ['hello', '', 0],
    ['', 'hello', 0],
    ['cat', 'hat', 1],
    [[0, 1, 1], [0, 0, 1], 1],
    ['Niall', 'Neil', 0.8],
    ['aluminum', 'Catalan', 0.875],
    ['ATCG', 'TAGC', 1]
  ];

  tests.forEach(function([a, b, d]) {
    assert.strictEqual(similarity(a, b), d);
    assert.strictEqual(distance(a, b), 1 - d);
  });
});
