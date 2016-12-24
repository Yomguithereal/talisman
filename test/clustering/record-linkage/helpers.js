/**
 * Talisman clustering/record-linkage/helpers tests
 * =================================================
 *
 */
import assert from 'assert';
import {clustersFromArrayGraph} from '../../../src/clustering/record-linkage/helpers';

describe('helpers', function() {

  describe('#.clustersFromArrayGraph', function() {

    it('should return correct clusters.', function() {
      const items = [
        'a',
        'b',
        'c',
        'a',
        'a',
        'b',
        'b',
        'c'
      ];

      const graph = {
        0: [3, 4],
        1: [5, 6],
        2: [7],
        3: [4],
        5: [6]
      };

      const clusters = clustersFromArrayGraph(items, graph, 2);

      assert.deepEqual(clusters, [
        ['a', 'a', 'a'],
        ['b', 'b', 'b'],
        ['c', 'c']
      ]);

      const limitedClusters = clustersFromArrayGraph(items, graph, 3);

      assert.deepEqual(limitedClusters, [
        ['a', 'a', 'a'],
        ['b', 'b', 'b']
      ]);
    });
  });
});
