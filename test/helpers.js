/**
 * Talisman helpers tests
 * =======================
 *
 */
import assert from 'assert';
import {
  seq
} from '../src/helpers';

describe('helpers', function() {

  describe('#.seq', function() {

    it('should produce an array sequence from different variables.', function() {

      assert.deepEqual(seq('hello'), ['h', 'e', 'l', 'l', 'o']);
      assert.deepEqual(seq([1, 2, 3]), [1, 2, 3]);
    });
  });
});
