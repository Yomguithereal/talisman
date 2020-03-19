/**
 * Talisman clustering/record-linkage/nn-descent tests
 * ====================================================
 *
 */
import assert from 'assert';
import nnDescent from '../../src/clustering/nn-descent';

describe('nn-descent', function() {

  it('should throw if the arguments are invalid.', function() {
    assert.throws(function() {
      nnDescent({similarity: null}, []);
    }, /similarity/);

    assert.throws(function() {
      nnDescent({similarity: Function.prototype, rng: 'test'}, []);
    }, /rng/);

    assert.throws(function() {
      nnDescent({rho: -25}, []);
    }, /rho/);

    assert.throws(function() {
      nnDescent({delta: -45}, []);
    }, /delta/);

    assert.throws(function() {
      nnDescent({maxIterations: -65}, []);
    }, /maxIterations/);

    assert.throws(function() {
      nnDescent({k: 0}, []);
    }, /k/);
  });

  it('should correctly compute clusters.', function() {

  });
});
