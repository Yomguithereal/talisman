/**
 * Talisman clustering/naive tests
 * ================================
 *
 */
import assert from 'assert';
import naive from '../../src/clustering/naive';
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

describe('naive', function() {

  it('should cluster as expected.', function() {
    const identity = (a, b) => a === b;

    const clusters = naive({similarity: identity}, BASIC_DATA);

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

    const clusters = naive({similarity}, data);

    assert.deepEqual(
      clusters,
      [
        [{word: 'book'}, {word: 'bolk'}, {word: 'yook'}],
        [{word: 'red'}, {word: 'ted'}],
        [{word: 'marin'}]
      ]
    );
  });
});
