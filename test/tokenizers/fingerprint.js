/**
 * Talisman tokenizers/fingerprint tests
 * ======================================
 *
 */
import assert from 'assert';
import fingerprint, {createTokenizer} from '../../src/tokenizers/fingerprint';

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
      assert.strictEqual(fingerprint(string).join(' '), key, `${string} => ${key}`);
    });
  });

  it('should be possible to make ngrams fingerprint.', function() {
    const tests = [
      [2, '', ''],
      [2, 'Paris', 'arispari'],
      [1, 'Paris', 'aiprs'],
      [2, 'bébé', 'beeb'],
      [3, 'PariS', 'ariparris']
    ];

    const keyers = {};

    [1, 2, 3].forEach(n => {
      keyers[n] = createTokenizer({ngrams: n});
    });

    tests.forEach(function([n, string, key]) {
      assert.strictEqual(keyers[n](string).join(''), key, `(${n}) ${string} => ${key}`);
    });
  });
});
