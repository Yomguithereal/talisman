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
  createDangerousButPerformantSample,
  createShuffle,
  createShuffleInPlace,
  weightedRandomIndex
} from '../../src/helpers/random';

const rng = () => {
  return seedrandom('shawarma');
};

describe('random', function() {
  describe('#.createRandom', function() {
    it('should be possible to create a random function using supplied rng.', function() {
      const random = createRandom(rng());

      const numbers = vec(10, 0).map(() => random(1, 3));

      assert.deepEqual(numbers, [2, 1, 1, 2, 2, 1, 2, 3, 2, 3]);
    });
  });

  describe('#.createSample', function() {
    const data = [13, 14, 15, 8, 20];

    it('should be possible to create a sample function using the supplied rng.', function() {
      const sample = createSample(rng());

      const tests = vec(5, 0).map(() => sample(2, data));
      assert.deepEqual(tests, [[14, 13], [14, 15], [15, 13], [15, 8], [14, 20]]);
    });
  });

  describe('#.createShuffle', function() {
    it('should be possible to create a shuffle function using the supplied rng.', function() {
      const shuffle = createShuffle(rng());

      const shuffled = shuffle([1, 2, 3, 4, 5]);
      assert.deepEqual(shuffled, [2, 1, 3, 4, 5]);
    });
  });

  describe('#.weightedRandomIndex', function() {
    it('should return a number superior to zero and within the range of the list.', function() {
      const randomIndex = weightedRandomIndex([2 / 3, 1 / 6, 1 / 6]);
      assert(randomIndex >= 0 && randomIndex < 3);
    });
  });

  describe('#.createDangerousButPerformantSample', function() {
    const data = [13, 14, 15, 8, 20],
          copy = data.slice();

    it('should be possible to create a sample function using the supplied rng.', function() {
      const sample = createDangerousButPerformantSample(rng());

      const tests = vec(7, 0).map(() => sample(2, data));

      assert.deepEqual(tests, [[14, 13], [14, 15], [15, 13], [15, 8], [14, 20], [8, 13], [20, 13]]);

      // Ensuring the state of the array did not change
      assert.deepEqual(copy, data);
    });
  });

  describe('#.createShuffleInPlace', function() {
    it('should be possible to create a shuffle in place function using the supplied rng.', function() {
      const shuffle = createShuffleInPlace(rng()),
            array = [1, 2, 3, 4, 5];

      shuffle(array);
      assert.deepEqual(array, [2, 1, 3, 4, 5]);
    });
  });
});
