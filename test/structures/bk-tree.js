/* eslint no-unused-vars: 0 */
/**
 * Talisman structure/bk-tree tests
 * =================================
 */
import {assert} from 'chai';
import BKTree from '../../src/structures/bk-tree';
import levenshtein from '../../src/metrics/distance/levenshtein';

const WORDS = [
  'book',
  'back',
  'bock',
  'lock',
  'mack',
  'shock',
  'ephemeral'
];

describe('bk-tree', function() {
  it('should throw if distance is not a function.', function() {
    assert.throws(function() {
      const tree = new BKTree('test');
    }, /function/);
  });

  it('should throw if initial words are not an array.', function() {
    assert.throws(function() {
      const tree = new BKTree(levenshtein, 'test');
    }, /array/);
  });

  it('should properly build a tree.', function() {
    const tree = new BKTree(levenshtein, WORDS);

    assert.deepEqual(
      tree.tree,
      {
        word: 'book',
        children: {
          1: {
            word: 'bock',
            children: {}
          },
          2: {
            word: 'back',
            children: {
              2: {
                word: 'lock',
                children: {}
              }
            }
          },
          3: {
            word: 'mack',
            children: {
              3: {
                word: 'shock',
                children: {}
              }
            }
          },
          9: {
            word: 'ephemeral',
            children: {}
          }
        }
      }
    );
  });

  it('should properly search near words.', function() {
    const tree = new BKTree(levenshtein, WORDS);

    const two = [
      'book',
      'bock',
      'back',
      'lock',
      'shock'
    ];

    const one = [
      'bock',
      'shock'
    ];

    assert.sameMembers(tree.search('bhock', 2), two);
    assert.sameMembers(tree.search('bhock', 1), one);

    assert(tree.search('bhock', 2).every(w => levenshtein('bhock', w) <= 2));
    assert(tree.search('bhock', 1).every(w => levenshtein('bhock', w) <= 1));
  });
});
