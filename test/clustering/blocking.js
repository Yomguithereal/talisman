/* eslint-disable */

/**
 * Talisman clustering/inverted-index tests
 * =========================================
 *
 */
import assert from 'assert';
import blockingClusterer from '../../src/clustering/blocking';
import levenshtein from '../../src/metrics/distance/levenshtein';

const DATA = [
  'abc',
  'bde',
  'bd',
  'bde',
  'bcde',
  'abcde'
];

describe('blocking', function() {

  it('should cluster as expected.', function() {
    const clusters = blockingClusterer({distance: levenshtein, radius: 1, blocks: doc => doc.split('')}, DATA);

    assert.deepEqual(clusters, [['bde', 'bd', 'bcde'], ['bcde', 'abcde']]);
  });

  it('should be possible to set the minimum cluster size.', function() {
    const clusters = blockingClusterer({
      distance: levenshtein,
      radius: 1,
      blocks: doc => doc.split(''),
      minClusterSize: 3
    }, DATA);

    assert.deepEqual(clusters, [['bde', 'bd', 'bcde']]);
  });
});
