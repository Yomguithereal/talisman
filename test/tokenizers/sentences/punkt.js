/**
 * Talisman tokenizers/sentences/punkt tests
 * ==========================================
 *
 */
import assert from 'assert';
import {
  LanguageVariables,
  Token
} from '../../../src/tokenizers/sentences/punkt';

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

  describe('token', function() {
    it('should correctly process the type of the token.', function() {
      const normalToken = new Token('Hello'),
            numericToken = new Token('45');

      assert.strictEqual(normalToken.type, 'hello');
      assert.strictEqual(numericToken.type, '##number##');
    });
  });
});
