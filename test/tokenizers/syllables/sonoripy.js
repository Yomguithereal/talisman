/**
 * Talisman tokenizers/syllables/sonoripy tests
 * =============================================
 *
 */
import assert from 'assert';
import defaultTokenizer, {
  // createTokenizer,
  merge
} from '../../../src/tokenizers/syllables/sonoripy';

const VOWELS_REGEX = /[aeiouy]/;

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
});
