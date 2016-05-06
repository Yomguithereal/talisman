/**
 * Talisman tokenizers/sentences/punkt tests
 * ==========================================
 *
 */
import assert from 'assert';
import {
  PunktLanguageVariables,
  PunktToken
} from '../../../src/tokenizers/sentences/punkt';

describe('punkt', function() {

  describe('language variables', function() {

    it('should properly tokenize word.', function() {
      const vars = new PunktLanguageVariables();

      const tokens = vars.tokenizeWords('Hello John. What is that you\'re doing?');
      assert.deepEqual(
        tokens,
        ['Hello', 'John.', 'What', 'is', 'that', 'you', '\'re', 'doing', '?']
      );
    });
  });

  describe('token', function() {
    it('should correctly process the type of the token.', function() {
      const normalToken = new PunktToken('Hello'),
            numericToken = new PunktToken('45');

      assert.strictEqual(normalToken.type, 'hello');
      assert.strictEqual(numericToken.type, '##number##');
    });
  });
});
