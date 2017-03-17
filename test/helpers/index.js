/**
 * Talisman helpers tests
 * =======================
 *
 */
import assert from 'assert';
import {
  findall,
  seq,
  squeeze,
  translation
} from '../../src/helpers';

describe('index', function() {

  describe('#.findall', function() {
    it('will correctly return an array of matches.', function() {
      assert.deepEqual(
        findall(/t/g, 'test').map(m => ([m[0], m.index])),
        [['t', 0], ['t', 3]]
      );
    });

    it('won\'t trigger an infinite loop if the regex is not global.', function() {
      assert.deepEqual(
        findall(/t/, 'test').map(m => ([m[0], m.index])),
        [['t', 0]]
      );
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
});
