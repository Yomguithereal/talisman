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

describe('punkt', function() {

  describe('language variables', function() {
    const text = 'Hello John. What is that you\'re doing?';

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
    const text = 'Hello John. What is that you\'re doing?';

    it('should tokenize text properly.', function() {
      const base = new PunktBaseClass();

      const tokens = base.tokenize(text);

      assert(tokens.length === 9);
      assert(tokens[0].lineStart);
      assert(!tokens[1].lineStart);
    });
  });

  describe('trainer', function() {
    const text = 'Hello John. What is that you\'re doing? Mr. Lozano was not around today. Say hello to you mom for me!',
          shorterText = 'Hello John. What is that you\'re doing? Mr. Lozano was not around today.';

    it('should not break when training.', function() {
      const trainer = new PunktTrainer();
      trainer.train(shorterText);
      assert(trainer.finalized);
    });

    it('should properly compute parameters.', function() {
      const trainer = new PunktTrainer();
      trainer.train(text);

      const params = trainer.params;

      assert.deepEqual(trainer.typeFdist.counts, {
        'hello': 2,
        'john.': 1,
        'what': 1,
        'is': 1,
        'that': 1,
        'you': 2,
        '\'re': 1,
        'doing': 1,
        '?': 1,
        'mr.': 1,
        'lozano': 1,
        'was': 1,
        'not': 1,
        'around': 1,
        'today.': 1,
        'say': 1,
        'to': 1,
        'mom': 1,
        'for': 1,
        'me': 1,
        '!': 1
      });

      assert.deepEqual(params.orthographicContext, {
        'me': 32,
        'what': 2,
        'around': 32,
        'for': 32,
        'that': 32,
        'doing': 32,
        'is': 32,
        'say': 2,
        'to': 32,
        'mr.': 2,
        'lozano': 8,
        'mom': 32,
        'not': 32,
        'you': 32,
        'john': 4,
        'was': 32,
        'hello': 40,
        'today': 32
      });

      assert.deepEqual(trainer.collocationFdist.counts, {});
      assert.deepEqual(trainer.sentenceStarterFdist.counts, {
        what: 1,
        say: 1
      });

      assert.strictEqual(trainer.periodTokenCount, 3);
      assert.strictEqual(trainer.sentenceBreakCount, 4);
      assert.deepEqual(trainer.params.abbreviationTypes, new Set(['mr']));
    });
  });
});
