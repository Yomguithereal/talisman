/**
 * Talisman clustering/k-means tests
 * ==================================
 *
 */
import assert from 'assert';
import kMeans from '../../src/clustering/k-means';

describe('k-means', function() {

  it('should throw when given parameters are invalid.', function() {
    assert.throws(function() {
      kMeans(null);
    }, /vector/);

    assert.throws(function() {
      kMeans([[1, 2]], -4);
    }, / k /);

    assert.throws(function() {
      kMeans([[1, 2]], 8, {distance: 45});
    }, /distance/);

    assert.throws(function() {
      kMeans([[1, 2]], 8, {maxIterations: -45});
    }, /max/);
  });

  it('should be possible to apply clustering to simple vectors.', function() {
    const data = [
      [1, 2],
      [2, 1],
      [3, 1],
      [2, 4],
      [50, 45],
      [40, 55],
      [46, 52]
    ];

    const clusters = kMeans(data, 2);

    assert.deepEqual(clusters, [
      [
        [1, 2],
        [2, 1],
        [3, 1],
        [2, 4]
      ],
      [
        [50, 45],
        [40, 55],
        [46, 52]
      ]
    ]);
  });
});
