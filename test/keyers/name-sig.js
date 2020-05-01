/**
 * Talisman keyers/name-sig tests
 * ===============================
 */
import assert from 'assert';
import nameSig from '../../src/keyers/name-sig';

describe('name-sig', function() {

  it('should return proper namesig keys.', function() {
    const tests = [
      ['Mr. Abdul Haque', 'abdlhk'],
      ['Mr. Md. Abdul Hoque', 'abdlhk'],
      ['Abdul Hoque', 'abdlhk'],
      ['Mr. Sobuj Saha', 'sbgsh'],
      ['Sree sabuj saha', 'sbgsh'],
      ['Sree Sobuz saha', 'sbgsh'],
      ['Marjorie', 'mrgr'],
      ['Amrishnav', 'amrshnv']
    ];

    tests.forEach(function([string, key]) {
      assert.strictEqual(nameSig(string), key, `${string} => ${key}`);
    });
  });
});
