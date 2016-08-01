/**
 * Talisman tokenizers/syllables/sonoripy tests
 * =============================================
 *
 */
import assert from 'assert';
import defaultTokenizer, {
  createTokenizer,
  merge
} from '../../../src/tokenizers/syllables/sonoripy';

const VOWELS_REGEX = /[aeiouy]/;

const PHONOGRAM_HIERARCHY = [
  'aeéɛøoɔiuʌyãẽõ',
  'jwɥh',
  'rl',
  'mn',
  'zvðʒ',
  'sfθʃ',
  'bdg',
  'ptkx'
];

describe('sonoripy', function() {
  it('should merge tokens correctly.', function() {
    assert.deepEqual(merge(VOWELS_REGEX, ['his', 'to', 'ry']), ['his', 'to', 'ry']);
    assert.deepEqual(merge(VOWELS_REGEX, ['grr', 'ad', 'ual']), ['grrad', 'ual']);
    assert.deepEqual(merge(VOWELS_REGEX, ['pro', 'grr', 'am']), ['progrr', 'am']);
  });

  it('should tokenize words correctly.', function() {
    const tests = [
      ['history', ['his', 'to', 'ry']],
      ['History', ['His', 'to', 'ry']],
      ['justification', ['jus', 'ti', 'fi', 'ca', 'tion']],
      ['channel', ['chan', 'nel']],
      ['chapel', ['cha', 'pel']],
      ['unconstitutional', ['un', 'cons', 'ti', 'tu', 'tio', 'nal']]
    ];

    tests.forEach(function([word, syllables]) {
      assert.deepEqual(defaultTokenizer(word), syllables);
    });
  });

  it('should be possible to create a custom tokenizer.', function() {
    const phonogramTokenizer = createTokenizer({
      hierarchy: PHONOGRAM_HIERARCHY
    });

    // NOTE: see if breaking on diphtongue

    const tests = [
      ['ametist', ['a', 'me', 'tist']],
      // ['aɛd', ['a', 'ɛd']],
      ['arl', ['arl']],
      ['arlezjɛn', ['ar', 'le', 'zjɛn']],
      ['ãbjãs', ['ã', 'bjãs']],
      // ['diazot', ['di', 'a', 'zot']],
      ['djazot', ['dja', 'zot']],
      // ['ãtikõstitysjõ', ['ã', 'ti', 'kõs', 'ti', 'ty', 'sjõ']],
      ['pubel', ['pu', 'bel']],
      ['tjar', ['tjar']],
      // ['frao', ['fra', 'o']],
      ['fraw', ['fraw']],
      ['illegal', ['il', 'le', 'gal']],
      ['imminã', ['im', 'mi', 'nã']]
    ];

    tests.forEach(function([word, syllables]) {
      assert.deepEqual(phonogramTokenizer(word), syllables);
    });
  });
});
