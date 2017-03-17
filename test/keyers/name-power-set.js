/**
 * Talisman keyers/name-power-set tests
 * =====================================
 */
import assert from 'assert';
import namePowerSet from '../../src/keyers/name-power-set';

describe('name-power-set', function() {

  it('should return a correct name power set.', function() {
    assert.deepEqual(namePowerSet('Henry'), [
      ['Henry']
    ]);

    assert.deepEqual(namePowerSet('John Henry'), [
      ['Henry', 'John'],
      ['H', 'John'],
      ['Henry', 'J']
    ]);

    assert.deepEqual(namePowerSet('John Philip Henry'), [
      ['Henry', 'John'],
      ['H', 'John'],
      ['Henry', 'J'],
      ['Henry', 'John', 'Philip'],
      ['H', 'John', 'Philip'],
      ['Henry', 'J', 'Philip'],
      ['H', 'J', 'Philip'],
      ['Henry', 'John', 'P'],
      ['H', 'John', 'P'],
      ['Henry', 'J', 'P'],
      ['Henry', 'Philip'],
      ['H', 'Philip'],
      ['Henry', 'P'],
      ['John', 'Philip'],
      ['J', 'Philip'],
      ['John', 'P']
    ]);

    assert.deepEqual(namePowerSet('J.R.R. Tolkien'), [
      ['J', 'R', 'Tolkien'],
      ['J', 'Tolkien'],
      ['R', 'Tolkien']
    ]);
  });

  it('should also work on already tokenized names.', function() {
    assert.deepEqual(namePowerSet(['john', 'henry']), [
      ['henry', 'john'],
      ['h', 'john'],
      ['henry', 'j']
    ]);
  });
});
