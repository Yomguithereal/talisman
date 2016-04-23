/**
 * Talisman stats/mean tests
 * ==========================
 *
 */
import assert from 'assert';
import {add, dot, mean, vec} from '../../src/helpers/vectors';

describe('vectors', function() {

  describe('#.vec', function() {
    it('should create vectors of n dimensions.', function() {
      assert.deepEqual(vec(2, 0), [0, 0]);
      assert.deepEqual(vec(5, null), [null, null, null, null, null]);
    });
  });

  describe('#.add', function() {
    it('should correctly add two vectors.', function() {
      const tests = [
        {
          vectors: [[1], [2]],
          result: [3]
        },
        {
          vectors: [[1, 2], [2, 3]],
          result: [3, 5]
        },
        {
          vectors: [[1, 3, 2], [4, 5, 7]],
          result: [5, 8, 9]
        }
      ];

      tests.forEach(function({vectors, result}) {
        assert.deepEqual(add(...vectors), result);
      });
    });
  });

  describe('#.mean', function() {
    it('should correctly compute the means of a list of vectors.', function() {
      const tests = [
        {
          vectors: [[1], [2], [3]],
          result: [2]
        },
        {
          vectors: [[1, 2], [2, 3], [1, 4]],
          result: [4 / 3, 9 / 3]
        },
        {
          vectors: [[1, 3, 2], [4, 5, 7], [0, 8, 7]],
          result: [5 / 3, 16 / 3, 16 / 3]
        }
      ];

      tests.forEach(function({vectors, result}) {
        assert.deepEqual(mean(vectors), result);
      });
    });
  });

  describe('#.dot', function() {
    it('should correctly compute the scalar product of two vectors.', function() {
      const tests = [
        {
          a: [4],
          b: [2],
          product: 8
        },
        {
          a: [4, 3],
          b: [6, 7],
          product: 45
        },
        {
          a: [1, 3, -5],
          b: [4, -2, -1],
          product: 3
        }
      ];

      tests.forEach(function({a, b, product}) {
        assert.strictEqual(dot(a, b), product);
      });
    });
  });
});
