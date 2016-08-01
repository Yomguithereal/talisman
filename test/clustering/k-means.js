/**
 * Talisman clustering/k-means tests
 * ==================================
 *
 */
import {assert} from 'chai';
import kMeans from '../../src/clustering/k-means';

describe('k-means', function() {

  it('should throw when given parameters are invalid.', function() {
    assert.throws(function() {
      kMeans({}, null);
    }, /vector/);

    assert.throws(function() {
      kMeans({k: -4}, [[1, 2]]);
    }, /`k`/);

    assert.throws(function() {
      kMeans({distance: 45}, [[1, 2]]);
    }, /distance/);

    assert.throws(function() {
      kMeans({maxIterations: -45}, [[1, 2]]);
    }, /max/);
  });

  it('should be possible to apply clustering to simple vectors.', function() {
    const k1 = [[1, 2], [2, 1], [3, 1], [2, 4]],
          k2 = [[50, 45], [40, 55], [46, 52]],
          data = k1.concat(k2);

    const clusters = kMeans({k: 2}, data);

    assert.sameDeepMembers(clusters, [k1, k2]);
  });
});
