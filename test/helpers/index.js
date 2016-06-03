/**
 * Talisman helpers tests
 * =======================
 *
 */
import assert from 'assert';
import {
  numericSort,
  seq,
  squeeze,
  translation,
  weightedRandomIndex
} from '../../src/helpers';

describe('index', function() {

  describe('#.numericSort', function() {

    it('should properly sort numbers.', function() {
      assert.deepEqual(
        numericSort([4, 1, 3, 2, 5]),
        [1, 2, 3, 4, 5]
      );
    });

    it('should not mutate the given array.', function() {
      const array = [2, 1, 3],
            sortedArray = numericSort(array);

      assert(array !== sortedArray);
      assert.deepEqual(array, [2, 1, 3]);
      assert.deepEqual(sortedArray, [1, 2, 3]);
    });
  });

  describe('#.seq', function() {

    it('should produce an array sequence from different variables.', function() {

      assert.deepEqual(seq('hello'), ['h', 'e', 'l', 'l', 'o']);
      assert.deepEqual(seq([1, 2, 3]), [1, 2, 3]);
    });
  });

  describe('#.squeeze', function() {

    it('should work with strings.', function() {
      assert.strictEqual(squeeze('test'), 'test');
      assert.strictEqual(squeeze('hello yellow'), 'helo yelow');
    });

    it('should work with arbitrary sequences.', function() {
      assert.deepEqual(squeeze([1, 2, 3]), [1, 2, 3]);
      assert.deepEqual(squeeze([1, 1, 2, 3, 3]), [1, 2, 3]);
    });
  });

  describe('#.translation', function() {
    it('should throw if given strings don\'t have the same length.', function() {
      assert.throws(function() {
        translation('123', '1234');
      }, /length/);
    });

    it('should produce indexes.', function() {
      assert.deepEqual(translation('abc', '123'), {a: 1, b: 2, c: 3});
    });
  });

  describe('#.weightedRandomIndex', function() {
    it('should return a number superior to zero and within the range of the list.', function() {
      const randomIndex = weightedRandomIndex([2 / 3, 1 / 6, 1 / 6]);
      assert(randomIndex >= 0 && randomIndex < 3);
    });
  });
});
