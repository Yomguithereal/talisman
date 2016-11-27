/**
 * Talisman clustering/vp-tree tests
 * ==================================
 *
 */
import assert from 'assert';
import vpTree from '../../src/clustering/vp-tree';
import {distance as identity} from '../../src/metrics/distance/identity';
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
];

const COMPLEX_DATA = [
  'book',
  'bolk',
  'yook',
  'red',
  'ted',
  'marin'
];

describe('vp-tree', function() {

  it('should cluster as expected.', function() {
    const clusters = vpTree({distance: identity, radius: 0}, BASIC_DATA);

    assert.deepEqual(
      clusters,
      [['a', 'a', 'a'], ['b', 'b', 'b'], ['c', 'c']]
    );
  });

  it('should cluster complex data also.', function() {
    const data = COMPLEX_DATA.map(word => ({word}));

    const distance = (a, b) => {
      return levenshtein(a.word, b.word);
    };

    const clusters = vpTree({distance, radius: 1}, data);

    assert.deepEqual(
      clusters,
      [
        [{word: 'yook'}, {word: 'bolk'}, {word: 'book'}],
        [{word: 'ted'}, {word: 'red'}]
      ]
    );
  });

  it('should be possible to set a minimum cluster size.', function() {
    const data = COMPLEX_DATA.map(word => ({word}));

    const distance = (a, b) => {
      return levenshtein(a.word, b.word);
    };

    const clusters = vpTree({distance, radius: 1, minClusterSize: 3}, data);

    assert.deepEqual(
      clusters,
      [
        [{word: 'yook'}, {word: 'bolk'}, {word: 'book'}]
      ]
    );
  });
});
