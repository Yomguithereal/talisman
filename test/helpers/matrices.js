/**
 * Talisman helpers/vectors tests
 * ===============================
 *
 */
import assert from 'assert';
import {transpose} from '../../src/helpers/matrices';

describe('matrices', function() {

  describe('#.transpose', function() {
    it('should be possible to transpose matrices.', function() {
      const matrices = [
        {
          normal: [
            [1, 2, 3],
            [1, 2, 3]
          ],
          transposed: [
            [1, 1],
            [2, 2],
            [3, 3]
          ]
        }
      ];

      matrices.forEach(function({normal, transposed}) {
        assert.deepEqual(transpose(normal), transposed);
      });
    });
  });
});
