/**
 * Talisman helpers/crc32 tests
 * =============================
 *
 */
import assert from 'assert';
import crc32 from '../../src/hash/crc32';

describe('crc32', function() {

  it('should correctly hash the given strings.', function() {
    const tests = [
      ['This is a string', 141976383],
      ['This is a string with éééà', 391581305],
      ['ßø⊂', -1838769021],
      ['\u2603', -1743909036]
    ];

    tests.forEach(function([string, hash]) {
      assert.strictEqual(crc32(string), hash, `${string} => ${hash}`);
    });
  });
});
