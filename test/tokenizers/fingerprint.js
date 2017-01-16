/**
 * Talisman tokenizers/fingerprint tests
 * ======================================
 *
 */
import assert from 'assert';
import fingerprint, {createTokenizer, ngramsFingerprint} from '../../src/tokenizers/fingerprint';
import fingerprintKeyer, {createKeyer, ngramsFingerprint as ngramsFingerprintKeyer} from '../../src/keyers/fingerprint';

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
      assert.strictEqual(fingerprintKeyer(string), key, `${string} => ${key}`);
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

    tests.forEach(function([n, string, key]) {
      assert.strictEqual(ngramsFingerprint(n, string).join(''), key, `(${n}) ${string} => ${key}`);
      assert.strictEqual(ngramsFingerprintKeyer(n, string), key, `(${n}) ${string} => ${key}`);
    });
  });

  it('should be possible to filter stopwords.', function() {
    const tokenizer = createTokenizer({stopwords: ['de']}),
          keyer = createKeyer({stopwords: ['de']});

    assert.deepEqual(
      tokenizer('Université de Paris'),
      ['paris', 'universite']
    );

    assert.strictEqual(
      keyer('Université de Paris'),
      'paris universite'
    );
  });

  it('should be possible to filter digits.', function() {
    const tokenizer = createTokenizer({digits: false});

    assert.deepEqual(
      tokenizer('24 grammes de maïs'),
      ['de', 'grammes', 'mais']
    );
  });

  it('should be possible to filter small tokens.', function() {
    const tokenizer = createTokenizer({minTokenSize: 2});

    assert.deepEqual(
      tokenizer('a very good cat'),
      ['cat', 'good', 'very']
    );
  });

  it('should be possible to split the tokens on some characters.', function() {
    const tokenizer = createTokenizer({minTokenSize: 2, split: [',', '-']});

    assert.deepEqual(
      tokenizer('l\'université de Bade-Wurt'),
      tokenizer('Bade-Wurt, université')
    );
  });
});
