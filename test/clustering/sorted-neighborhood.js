/**
 * Talisman clustering/sorted-neighborhood tests
 * ==============================================
 *
 */
import assert from 'assert';
import sortedNeighborhood from '../../src/clustering/sorted-neighborhood';
import levenshtein from '../../src/metrics/distance/levenshtein';

const BASIC_DATA = [
  'a',
  'b',
  'c',
  'a',
  'c',
  'a',
  'b',
  'b'
].sort();

const COMPLEX_DATA = [
  'book',
  'bolk',
  'yook',
  'red',
  'ted',
  'marin'
].sort();

describe('sorted-neighborhood', function() {

  it('should cluster as expected.', function() {
    const identity = (a, b) => a === b;

    const clusters = sortedNeighborhood({similarity: identity, window: 2}, BASIC_DATA);

    assert.deepEqual(
      clusters,
      [['a', 'a', 'a'], ['b', 'b', 'b'], ['c', 'c']]
    );
  });

  it('should cluster complex data also.', function() {
    const data = COMPLEX_DATA.map(word => ({word}));

    const similarity = (a, b) => {
      return levenshtein(a.word, b.word) <= 1;
    };

    const clusters = sortedNeighborhood({similarity, window: 3}, data);

    assert.deepEqual(
      clusters,
      [
        [{word: 'bolk'}, {word: 'book'}],
        [{word: 'red'}, {word: 'ted'}]
      ]
    );
  });

  it('should be possible to set the minimum cluster size.', function() {
    const identity = (a, b) => a === b;

    const clusters = sortedNeighborhood({similarity: identity, window: 2, minClusterSize: 3}, BASIC_DATA);

    assert.deepEqual(
      clusters,
      [['a', 'a', 'a'], ['b', 'b', 'b']]
    );
  });
});
