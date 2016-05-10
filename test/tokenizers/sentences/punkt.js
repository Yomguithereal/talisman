/**
 * Talisman tokenizers/sentences/punkt tests
 * ==========================================
 *
 */
import assert from 'assert';
import {
  PunktLanguageVariables,
  PunktToken,
  PunktBaseClass,
  PunktTrainer
} from '../../../src/tokenizers/sentences/punkt';

describe.skip('punkt', function() {
  const text = 'Hello John. What is that you\'re doing?';

  describe('language variables', function() {

    it('should properly tokenize word.', function() {
      const vars = new PunktLanguageVariables();

      assert.deepEqual(
        vars.tokenizeWords(text),
        ['Hello', 'John.', 'What', 'is', 'that', 'you', '\'re', 'doing', '?']
      );
    });
  });

  describe('token', function() {
    it('should correctly process the type of the token.', function() {
      const normalToken = new PunktToken('Hello'),
            numericToken = new PunktToken('45'),
            periodToken = new PunktToken('John.'),
            ellipsisToken = new PunktToken('...');

      assert.strictEqual(normalToken.type, 'hello');
      assert.strictEqual(numericToken.type, '##number##');
      assert(!normalToken.isEllipsis);
      assert(ellipsisToken.isEllipsis);
      assert(!normalToken.periodFinal);
      assert(periodToken.periodFinal);
    });

    it('the token method should work correctly.', function() {
      const periodToken = new PunktToken('John.'),
            lowercaseToken = new PunktToken('john'),
            strangeToken = new PunktToken('@');

      assert.strictEqual(periodToken.typeNoPeriod(), 'john');
      assert.strictEqual(periodToken.typeNoSentencePeriod(), 'john.');
      periodToken.sentenceBreak = true;
      assert.strictEqual(periodToken.typeNoSentencePeriod(), 'john');
      assert(!lowercaseToken.firstUpper());
      assert(lowercaseToken.firstLower());
      assert.strictEqual(lowercaseToken.firstCase(), 'lower');
      assert(!strangeToken.firstUpper());
      assert(!strangeToken.firstLower());
      assert.strictEqual(strangeToken.firstCase(), 'none');
    });
  });

  describe('base', function() {
    it('should tokenize text properly.', function() {
      const base = new PunktBaseClass();

      const tokens = base.tokenize(text);

      assert(tokens.length === 9);
      assert(tokens[0].lineStart);
      assert(!tokens[1].lineStart);
    });
  });

  describe('trainer', function() {

    it('should correctly train.', function() {
      const trainer = new PunktTrainer({verbose: true});
      trainer.train('Hello John. What is that you\'re doing? Mr. Lozano was not around today.');
      console.log(trainer);
    });
  });
});
