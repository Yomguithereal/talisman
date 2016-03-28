/**
 * Talisman metrics/mra tests
 * ===========================
 *
 */
import assert from 'assert';
import mra from '../../src/metrics/mra';

describe('mra', function() {

  const tests = [
    {
      a: 'Byrne',
      b: 'Boern',
      result: {
        minimum: 4,
        similarity: 5,
        codex: ['BYRN', 'BRN'],
        matching: true
      }
    },
    {
      a: 'Smith',
      b: 'Smyth',
      result: {
        minimum: 3,
        similarity: 5,
        codex: ['SMTH', 'SMYTH'],
        matching: true
      }
    },
    {
      a: 'Catherine',
      b: 'Kathryn',
      result: {
        minimum: 3,
        similarity: 4,
        codex: ['CTHRN', 'KTHRYN'],
        matching: true
      }
    },
    {
      a: 'Wilfred',
      b: 'Manning',
      result: {
        minimum: 3,
        similarity: 1,
        codex: ['WLFRD', 'MNG'],
        matching: false
      }
    }
  ];

  it('should throw if the given names are not strings.', function() {
    assert.throws(function() {
      mra(null, [1, 2, 3]);
    }, /string/);
  });

  it('should correctly compute the euclidean distance of n-dimensions vectors.', function() {
    tests.forEach(function({a, b, result}) {
      assert.deepEqual(mra(a, b), result);
    });
  });
});
