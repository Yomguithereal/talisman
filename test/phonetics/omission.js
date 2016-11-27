/**
 * Talisman phonetics/omission tests
 * ==================================
 */
import assert from 'assert';
import omission from '../../src/phonetics/omission';

describe('omission', function() {

  it('should return proper omission keys.', function() {
    const tests = [
      ['', ''],
      ['hello', 'HLEO'],
      ['The quick brown fox jumped over the lazy dog.', 'JKQXZVWYBFMGPDHCLNTREUIOA'],
      ['Christopher', 'PHCTSRIOE'],
      ['Niall', 'LNIA']
    ];

    tests.forEach(function([string, key]) {
      assert.strictEqual(omission(string), key, `${string} => ${key}`);
    });
  });
});
