/**
 * Talisman helpers/random tests
 * ==============================
 *
 */
import assert from 'assert';
import seedrandom from 'seedrandom';
import {vec} from '../../src/helpers/vectors';
import {
  createRandom,
  weightedRandomIndex
} from '../../src/helpers/random';

const rng = seedrandom('shawarma');

describe('random', function() {
  describe('#.weightedRandomIndex', function() {
    it('should return a number superior to zero and within the range of the list.', function() {
      const randomIndex = weightedRandomIndex([2 / 3, 1 / 6, 1 / 6]);
      assert(randomIndex >= 0 && randomIndex < 3);
    });
  });

  describe('#.createRandom', function() {
    it('should be possible to create a random function using supplied rng.', function() {
      const random = createRandom(rng);

      const numbers = vec(10, 0).map(() => random(1, 3));

      assert.deepEqual(numbers, [2, 1, 1, 2, 2, 1, 2, 3, 2, 3]);
    });
  });
});
