/**
 * Talisman tokenizers/sentences/punkt tests
 * ==========================================
 *
 */
import assert from 'assert';
import {LanguageVariables} from '../../../src/tokenizers/sentences/punkt';

describe('punkt', function() {

  describe('language variables', function() {

    it('should properly tokenize word.', function() {
      const vars = new LanguageVariables();

      const tokens = vars.tokenizeWords('Hello John. What is that you\'re doing?');
      assert.deepEqual(
        tokens,
        ['Hello', 'John.', 'What', 'is', 'that', 'you', '\'re', 'doing', '?']
      );
    });
  });
});
