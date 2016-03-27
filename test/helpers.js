/**
 * Talisman helpers tests
 * =======================
 *
 */
import assert from 'assert';
import {
  seq,
  squeeze
} from '../src/helpers';

describe('helpers', function() {

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
});
