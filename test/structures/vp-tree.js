/* eslint no-unused-vars: 0 */
/**
 * Talisman structure/vp-tree tests
 * =================================
 */
import assert from 'assert';
import VPTree from '../../src/structures/vp-tree';
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

describe('vp-tree', function() {
  it('should throw if distance is not a function.', function() {
    assert.throws(function() {
      const tree = new VPTree('test');
    }, /function/);
  });

  it('should throw if initial items are not an array.', function() {
    assert.throws(function() {
      const tree = new VPTree(levenshtein, 'test');
    }, /array/);
  });

  it('should properly build the tree.', function() {
    const tree = new VPTree(levenshtein, WORDS);

    assert.deepEqual(tree.root, {
      vantage: 'ephemeral',
      mu: 9,
      left: {
        vantage: 'shock',
        mu: 3,
        right: {
          vantage: 'mack'
        }
      },
      right:
        {
          vantage: 'lock',
          mu: 2,
          left: {
            vantage: 'bock'
          },
          right: {
            vantage: 'back',
            mu: 2,
            right: {
              vantage: 'book'
            }
          }
        }
      }
    );
  });
});
