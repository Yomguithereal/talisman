/**
 * Talisman clustering/record-linkage/canopy tests
 * ================================================
 *
 */
import assert from 'assert';
import canopy from '../../../src/clustering/record-linkage/canopy';
import levenshtein from '../../../src/metrics/distance/levenshtein';

const DATA = [
  'abc',
  'ab',
  'bd',
  'bde',
  'bcde',
  'abcde',
  'abcdef',
  'abcdefg'
];

describe('canopy', function() {

  it('should throw if the arguments are invalid.', function() {
    assert.throws(function() {
      canopy({distance: null}, []);
    }, /distance/);

    assert.throws(function() {
      canopy({distance: Function.prototype}, []);
    }, /loose/);

    assert.throws(function() {
      canopy({distance: Function.prototype, loose: 8}, []);
    }, /tight/);

    assert.throws(function() {
      canopy({distance: Function.prototype, loose: 4, tight: 7}, []);
    }, /greater/);
  });

  it('should correctly compute clusters.', function() {
    const clusters = canopy({
      distance: levenshtein,
      loose: 2,
      tight: 1
    }, DATA);

    assert.deepEqual(clusters, [
      ['abc', 'ab', 'bd', 'abcde'],
      ['bd', 'bde', 'bcde'],
      ['bcde', 'abcde', 'abcdef'],
      ['abcdef', 'abcdefg']
    ]);
  });
});
