/**
 * Talisman clustering/record-linkage/sorted-neighborhood tests
 * ==================================================
 *
 */
import assert from 'assert';
import levenshtein from '../../src/metrics/distance/levenshtein';
import sortedNeighborhood from '../../src/clustering/sorted-neighborhood';

const DATA = [
  'aaa',
  'zzz',
  'bbb',
  'bbb',
  'aaa',
  'zzz',
  'aaz',
  'zza',
];

describe('sorted-neighborhood', function() {

  it('should throw if the window is invalid.', function() {
    assert.throws(function() {
      sortedNeighborhood({window: null, similarity: Function.prototype}, []);
    }, /window/);
  });

  it('should throw if the comparator functions are invalid.', function() {
    assert.throws(function() {
      sortedNeighborhood({window: 3, comparator: null, similarity: Function.prototype}, []);
    }, /comparator/);
  });

  it('should correctly cluster data.', function() {
    const clusters = sortedNeighborhood({
      comparator: (a, b) => {
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      },
      distance: levenshtein,
      radius: 1,
      window: 1
    }, DATA);

    assert.deepEqual(clusters, [
      ['aaa', 'aaa'],
      ['zzz', 'zza', 'zzz'],
      ['bbb', 'bbb'],
      ['aaz', 'aaa']
    ]);
  });

  it('should be possible to map items to multiple blocks.', function() {
    const clusters = sortedNeighborhood({
      comparators: [
        (a, b) => {
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        },
        (a, b) => {
          if (a < b)
            return 1;
          if (a > b)
            return -1;
          return 0;
        }
      ],
      distance: levenshtein,
      radius: 1,
      window: 1
    }, DATA);

    assert.deepEqual(clusters, [
      ['aaa', 'aaa', 'aaz'],
      ['zzz', 'zza', 'zzz'],
      ['bbb', 'bbb']
    ]);
  });
});
