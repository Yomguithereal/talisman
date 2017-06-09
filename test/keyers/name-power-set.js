/**
 * Talisman keyers/name-power-set tests
 * =====================================
 */
import {assert} from 'chai';
import namePowerSet from '../../src/keyers/name-power-set';

describe('name-power-set', function() {

  const hasher = list => list.join('§');

  const hashedNamePowerSet = name => namePowerSet(name).map(hasher);

  it('should return a correct name power set.', function() {
    assert.sameMembers(hashedNamePowerSet('Henry'), [
      ['Henry']
    ].map(hasher));

    assert.sameMembers(hashedNamePowerSet('John Henry'), [
      ['Henry', 'John'],
      ['H', 'John'],
      ['Henry', 'J']
    ].map(hasher));

    assert.sameMembers(hashedNamePowerSet('John Philip Henry'), [
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
    ].map(hasher));

    assert.sameMembers(hashedNamePowerSet('J.R.R. Tolkien'), [
      ['J', 'R', 'Tolkien'],
      ['J', 'Tolkien'],
      ['R', 'Tolkien']
    ].map(hasher));
  });

  it('should also work on already tokenized names.', function() {
    assert.sameMembers(hashedNamePowerSet(['john', 'henry']), [
      ['henry', 'john'],
      ['h', 'john'],
      ['henry', 'j']
    ].map(hasher));
  });
});
