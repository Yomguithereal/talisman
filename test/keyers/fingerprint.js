/**
 * Talisman keyers/fingerprint tests
 * ==================================
 */
import assert from 'assert';
import fingerprint from '../../src/keyers/fingerprint';

describe('fingerprint', function() {

  it('should return proper fingerprints.', function() {
    const tests = [
      ['', ''],
      ['hello', 'hello'],
      ['Tom Cruise', 'cruise tom'],
      ['The mouse is a mouse', 'a is mouse the'],
      ['électricité', 'electricite'],
      ['\x00Hello', 'hello'],
      ['Hello?', 'hello']
    ];

    tests.forEach(function([string, key]) {
      assert.strictEqual(fingerprint(string), key, `${string} => ${key}`);
    });
  });
});
