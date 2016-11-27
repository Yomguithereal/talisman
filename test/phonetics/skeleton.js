/**
 * Talisman phonetics/skeleton tests
 * ==================================
 */
import assert from 'assert';
import skeleton from '../../src/phonetics/skeleton';

describe('skeleton', function() {

  it('should return proper skeleton keys.', function() {
    const tests = [
      ['', ''],
      ['hello', 'HLEO'],
      ['The quick brown fox jumped over the lazy dog.', 'THQCKBRWNFXJMPDVLZYGEUIOA'],
      ['Christopher', 'CHRSTPIOE'],
      ['Niall', 'NLIA']
    ];

    tests.forEach(function([string, key]) {
      assert.strictEqual(skeleton(string), key, `${string} => ${key}`);
    });
  });
});
