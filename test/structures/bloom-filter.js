/* eslint no-unused-vars: 0 */
/**
 * Talisman structure/bloom-filter tests
 * ======================================
 */
import {assert} from 'chai';
import BloomFilter from '../../src/structures/bloom-filter';

describe('bloom-filter', function() {
  it('should throw when given invalid options.', function() {

    assert.throws(function() {
      const filter = new BloomFilter(-34);
    }, /capacity/);

    assert.throws(function() {
      const filter = new BloomFilter(50, -4);
    }, /invalid k/);

    assert.throws(function() {
      const filter = new BloomFilter(1, 2);

      filter.add('hello');
      filter.add('world');
    }, /full/);
  });

  it('should properly add & test elements.', function() {
    const filter = new BloomFilter(1000, 4);

    filter.add('John');

    assert.strictEqual(filter.capacity, 1000);
    assert.strictEqual(filter.size, 1);
    assert.strictEqual(filter.test('John'), true);
    assert.strictEqual(filter.test('Mary'), false);
  });
});
