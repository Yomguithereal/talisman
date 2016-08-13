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
  createSample,
  createShuffle,
  weightedRandomIndex
} from '../../src/helpers/random';

const rng = seedrandom('shawarma');

describe('random', function() {
  describe('#.createRandom', function() {
    it('should be possible to create a random function using supplied rng.', function() {
      const random = createRandom(rng);

      const numbers = vec(10, 0).map(() => random(1, 3));

      assert.deepEqual(numbers, [2, 1, 1, 2, 2, 1, 2, 3, 2, 3]);
    });
  });

  describe('#.createSample', function() {
    const data = [13, 14, 15, 8, 20];

    it('should be possible to create a sample function using the supplied rng.', function() {
      const sample = createSample(rng);

      const tests = vec(5, 0).map(() => sample(2, data));
      assert.deepEqual(tests, [[8, 13], [20, 13], [8, 15], [20, 13], [13, 8]]);
    });
  });

  describe('#.createShuffle', function() {
    it('should be possible to create a shuffle function using the supplied rng.', function() {
      const shuffle = createShuffle(rng);

      const shuffled = shuffle([1, 2, 3, 4, 5]);
      assert.deepEqual(shuffled, [4, 5, 1, 2, 3]);
    });
  });

  describe('#.weightedRandomIndex', function() {
    it('should return a number superior to zero and within the range of the list.', function() {
      const randomIndex = weightedRandomIndex([2 / 3, 1 / 6, 1 / 6]);
      assert(randomIndex >= 0 && randomIndex < 3);
    });
  });
});
