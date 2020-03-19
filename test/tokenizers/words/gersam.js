/**
 * Talisman tokenizers/words/gersam tests
 * =======================================
 *
 */
import assert from 'assert';
import words from '../../../src/tokenizers/words/gersam';

describe('gersam', function() {
  it('should correctly tokenize words.', function() {
    const tests = [
      {
        lang: 'en',
        text: 'Good muffins cost $3.88\nin New York.  Please buy me\ntwo of them.\nThanks.',
        tokens: ['Good', 'muffins', 'cost', '$', '3.88', 'in', 'New', 'York', '.', 'Please', 'buy', 'me', 'two', 'of', 'them', '.', 'Thanks', '.']
      },
      {
        lang: 'en',
        text: 'They\'ll save and invest more.',
        tokens: ['They', '\'ll', 'save', 'and', 'invest', 'more', '.']
      },
      {
        lang: 'en',
        text: 'hi, my name can\'t hello,',
        tokens: ['hi', ',', 'my', 'name', 'can', '\'t', 'hello', ',']
      },
      {
        lang: 'en',
        text: '"Hello", Good sir (this is appaling)...',
        tokens: ['"', 'Hello', '"', ',', 'Good', 'sir', '(', 'this', 'is', 'appaling', ')', '…']
      }
    ];

    tests.forEach(function({lang, text, tokens}) {
      assert.deepEqual(words(lang, text), tokens);
    });
  });
});
