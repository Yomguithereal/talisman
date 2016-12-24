/**
 * Talisman clustering/record-linkage/naive tests
 * ===============================================
 *
 */
import assert from 'assert';
import naive from '../../../src/clustering/record-linkage/naive';
import levenshtein from '../../../src/metrics/distance/levenshtein';

const SIMPLE = [
  'a',
  'b',
  'c',
  'a',
  'a',
  'b',
  'b',
  'c'
];

const CHAIN = [
  'abc',
  'bcd',
  'cde',
  'def',
  'efg',
  'fgh',
  'ghi'
];

const COMPLEX = [
  'abc',
  'abc',
  'bde',
  'bd',
  'bde',
  'bcde',
  'abcde',
  'abcdef',
  'abcdefg'
];

describe('naive', function() {

  it('should correctly cluster basic data.', function() {
    const clusters = naive({
      similarity: (a, b) => a === b
    }, SIMPLE);

    assert.deepEqual(clusters, [
      ['a', 'a', 'a'],
      ['b', 'b', 'b'],
      ['c', 'c']
    ]);
  });

  it('should correctly cluster objects.', function() {
    const data = SIMPLE.map(value => ({value}));

    const clusters = naive({
      similarity: (a, b) => a.value === b.value
    }, data);

    assert.deepEqual(clusters.map(c => c.map(d => d.value)), [
      ['a', 'a', 'a'],
      ['b', 'b', 'b'],
      ['c', 'c']
    ]);
  });

  it('should correctly cluster chains.', function() {
    const clusters = naive({
      distance: levenshtein,
      radius: 2
    }, CHAIN);

    assert.deepEqual(clusters, [
      ['abc', 'bcd'],
      ['cde', 'bcd', 'def'],
      ['efg', 'def', 'fgh'],
      ['ghi', 'fgh']
    ]);
  });

  it('should correctly cluster complex data.', function() {
    const clusters = naive({
      similarity: (a, b) => levenshtein(a, b) <= 2
    }, COMPLEX);

    assert.deepEqual(clusters, [
      ['abc', 'abc', 'bd', 'abcde'],
      ['bde', 'bd', 'bde', 'bcde', 'abcde'],
      ['abcdef', 'bcde', 'abcde', 'abcdefg']
    ]);
  });
});
