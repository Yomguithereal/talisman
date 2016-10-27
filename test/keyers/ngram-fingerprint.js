/**
 * Talisman keyers/ngram-fingerprint tests
 * ========================================
 */
import assert from 'assert';
import ngramFingerprint from '../../src/keyers/ngram-fingerprint';

describe('ngram-fingerprint', function() {

  it('should return proper fingerprints.', function() {
    const tests = [
      [2, '', ''],
      [2, 'Paris', 'arispari'],
      [1, 'Paris', 'aiprs'],
      [2, 'bébé', 'beeb'],
      [3, 'PariS', 'ariparris']
    ];

    tests.forEach(function([n, string, key]) {
      assert.strictEqual(ngramFingerprint(n, string), key, `(${n}) ${string} => ${key}`);
    });
  });
});
