/* eslint no-unused-vars: 0 */
/**
 * Talisman structure/vp-tree tests
 * =================================
 */
import {assert} from 'chai';
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

  it('should be possible to retrieve the nearest neighbors.', function() {
    const tree = new VPTree(levenshtein, WORDS);

    let neighbors = tree.nearestNeighbors(2, 'look');

    assert.deepEqual(neighbors, [
      {distance: 1, item: 'lock'},
      {distance: 1, item: 'book'}
    ]);

    neighbors = tree.nearestNeighbors(4, 'look');

    assert.deepEqual(neighbors, [
      {distance: 1, item: 'lock'},
      {distance: 1, item: 'book'},
      {distance: 2, item: 'bock'},
      {distance: 3, item: 'mack'}
    ]);

    neighbors = tree.nearestNeighbors(10, 'look');

    assert.deepEqual(neighbors, [
      {distance: 1, item: 'lock'},
      {distance: 1, item: 'book'},
      {distance: 2, item: 'bock'},
      {distance: 3, item: 'mack'},
      {distance: 3, item: 'back'},
      {distance: 3, item: 'shock'},
      {distance: 9, item: 'ephemeral'}
    ]);
  });

  it('should be possible to retrieve every neighbors in range.', function() {
    const tree = new VPTree(levenshtein, WORDS);

    assert.sameDeepMembers(tree.neighborsInRange(2, 'look'), [
      {distance: 1, item: 'lock'},
      {distance: 1, item: 'book'},
      {distance: 2, item: 'bock'}
    ]);

    assert.sameDeepMembers(tree.neighborsInRange(3, 'look'), [
      {distance: 1, item: 'lock'},
      {distance: 1, item: 'book'},
      {distance: 2, item: 'bock'},
      {distance: 3, item: 'mack'},
      {distance: 3, item: 'back'},
      {distance: 3, item: 'shock'}
    ]);
  });
});
