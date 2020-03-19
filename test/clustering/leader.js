/**
 * Talisman clustering/record-linkage/leader tests
 * ================================================
 *
 */
import assert from 'assert';
import leader from '../../src/clustering/leader';
import levenshtein from '../../src/metrics/distance/levenshtein';

const BASIC_DATA = [
  1,
  2,
  3,
  4,
  10,
  11,
  24
];

const SHIFTED_BASIC_DATA = [
  3,
  2,
  1,
  4,
  10,
  11,
  24
];

const STRING_DATA = [
  'abc',
  'abd',
  'dbc',
  'zyx',
  'zxx',
  'xxx'
];

describe('leader', function() {

  it('should throw if the arguments are invalid.', function() {
    assert.throws(function() {
      leader({distance: null}, []);
    }, /distance/);

    assert.throws(function() {
      leader({distance: Function.prototype}, []);
    }, /threshold/);
  });

  it('should correctly compute clusters.', function() {
    const distance = (a, b) => Math.abs(a - b);

    let clusters = leader({
      distance,
      threshold: 2
    }, BASIC_DATA);

    assert.deepEqual(clusters, [
      [1, 2, 3],
      [4],
      [10, 11],
      [24]
    ]);

    clusters = leader({
      distance,
      threshold: 2
    }, SHIFTED_BASIC_DATA);

    assert.deepEqual(clusters, [
      [3, 2, 1, 4],
      [10, 11],
      [24]
    ]);

    clusters = leader({
      distance: levenshtein,
      threshold: 1
    }, STRING_DATA);

    assert.deepEqual(clusters, [
      ['abc', 'abd', 'dbc'],
      ['zyx', 'zxx'],
      ['xxx']
    ]);
  });
});
