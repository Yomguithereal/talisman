/**
 * Talisman clustering/k-means tests
 * ==================================
 *
 */
import {assert} from 'chai';
import kMeans, {KMeans} from '../../src/clustering/k-means';

describe('k-means', function() {

  it('should throw when given parameters are invalid.', function() {
    assert.throws(function() {
      kMeans({}, null);
    }, /vector/);

    assert.throws(function() {
      kMeans({k: -4}, [[1, 2]]);
    }, /`k`/);

    assert.throws(function() {
      kMeans({distance: 45, k: 1}, [[1, 2]]);
    }, /distance/);

    assert.throws(function() {
      kMeans({maxIterations: -45, k: 1}, [[1, 2]]);
    }, /max/);

    assert.throws(function() {
      kMeans({initialCentroids: 45, k: 1}, [[1, 2]]);
    }, /initialCentroids/);

    assert.throws(function() {
      kMeans({initialCentroids: [1], k: 1}, [[1, 2]]);
    }, /dimension/);

    assert.throws(function() {
      kMeans({initialCentroids: [[1, 2], [4]], k: 1}, [[1, 2]]);
    }, / k /);

    assert.throws(function() {
      kMeans({sampler: 'test', k: 1}, [[1, 2]]);
    }, /function/);

    assert.throws(function() {
      kMeans({k: 8}, [[1, 2], [2, 3]]);
    }, /greater/);
  });

  it('should be possible to apply clustering to simple vectors.', function() {
    const k1 = [[1, 2], [2, 1], [3, 1], [2, 4]],
          k2 = [[50, 45], [40, 55], [46, 52]],
          data = k1.concat(k2);

    const clusters = kMeans({k: 2}, data);

    assert.sameDeepMembers(clusters, [k1, k2]);
  });

  it('should be possible to pass initial centroids.', function() {
    const clustering = new KMeans([[1, 2], [3, 4]], {k: 2, initialCentroids: [[1, 2], [3, 4]]});

    assert.deepEqual(clustering.centroids, [[1, 2], [3, 4]]);
  });

  it('should be possible to compute initial centroids.', function() {
    const initialCentroids = (data, options) => {
      assert.deepEqual(data, [[1, 2], [3, 4]]);
      assert.strictEqual(options.k, 2);
      return [[1, 2], [3, 4]];
    };

    const clustering = new KMeans([[1, 2], [3, 4]], {k: 2, initialCentroids});

    assert.deepEqual(clustering.centroids, [[1, 2], [3, 4]]);
  });

  it('should work when k and dimension of the vectors is different (Issue #103).', function() {
    const k1 = [[1, 2, 3], [2, 1, 1], [3, 1, 4], [2, 4, 2]],
          k2 = [[50, 45, 45], [40, 55, 64], [46, 52, 62]],
          data = k1.concat(k2);

    const clusters = kMeans({k: 2}, data);

    assert.deepEqual(clusters, [k1, k2]);
  });
});
