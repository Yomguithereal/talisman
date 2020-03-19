/**
 * Talisman helpers/frequencies tests
 * ===================================
 *
 */
import assert from 'assert';
import {
  absolute,
  relative,
  updateFrequencies
} from '../../src/helpers/frequencies';

describe('frequencies', function() {

  describe('#.absolute', function() {
    it('should compute correct frequencies of the given sequence.', function() {
      assert.deepEqual(
        absolute([1, 2, 3, 3, 4, 4, 4, 5]),
        {
          1: 1,
          2: 1,
          3: 2,
          4: 3,
          5: 1
        }
      );
    });

    it('should also work on strings.', function() {
      assert.deepEqual(
        absolute('Hello'),
        {
          H: 1,
          e: 1,
          l: 2,
          o: 1
        }
      );
    });
  });

  describe('#.relative', function() {
    it('should compute correct frequencies of the given sequence.', function() {
      assert.deepEqual(
        relative([1, 2, 3, 3, 4, 4, 4, 5]),
        {
          1: 1 / 8,
          2: 1 / 8,
          3: 2 / 8,
          4: 3 / 8,
          5: 1 / 8
        }
      );
    });

    it('should also work on strings.', function() {
      assert.deepEqual(
        relative('test'),
        {
          t: 0.5,
          e: 0.25,
          s: 0.25
        }
      );
    });

    it('should be possible to pass absolute frequencies.', function() {
      assert.deepEqual(
        relative(absolute([1, 2, 3, 3, 4, 4, 4, 5])),
        {
          1: 1 / 8,
          2: 1 / 8,
          3: 2 / 8,
          4: 3 / 8,
          5: 1 / 8
        }
      );
    });
  });

  describe('#.updateFrequencies', function() {

    it('should correctly update frequencies with the given sequence.', function() {
      const previousFrequencies = {
        1: 1,
        2: 1,
        3: 2,
        4: 3,
        5: 1
      };

      assert.deepEqual(updateFrequencies(previousFrequencies, [7, 1, 1, 1, 2]), {
        1: 4,
        2: 2,
        3: 2,
        4: 3,
        5: 1,
        7: 1
      });
    });
  });
});
