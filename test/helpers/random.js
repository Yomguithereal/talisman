/**
 * Talisman helpers/random tests
 * ==============================
 *
 */
import assert from 'assert';
import {
  weightedRandomIndex
} from '../../src/helpers/random';

describe('random', function() {
  describe('#.weightedRandomIndex', function() {
    it('should return a number superior to zero and within the range of the list.', function() {
      const randomIndex = weightedRandomIndex([2 / 3, 1 / 6, 1 / 6]);
      assert(randomIndex >= 0 && randomIndex < 3);
    });
  });
});
