/**
 * Talisman tokenizers/words/treebank tests
 * =========================================
 *
 */
import assert from 'assert';
import words from '../../../src/tokenizers/words/treebank';

describe('treebank', function() {
  it('should correctly tokenize words.', function() {
    const tests = [
      {
        text: 'Good muffins cost $3.88\nin New York.  Please buy me\ntwo of them.\nThanks.',
        tokens: ['Good', 'muffins', 'cost', '$', '3.88', 'in', 'New', 'York.', 'Please', 'buy', 'me', 'two', 'of', 'them.', 'Thanks', '.']
      },
      {
        text: 'They\'ll save and invest more.',
        tokens: ['They', '\'ll', 'save', 'and', 'invest', 'more', '.']
      },
      {
        text: 'hi, my name can\'t hello,',
        tokens: ['hi', ',', 'my', 'name', 'ca', "n't", 'hello', ',']
      },
      {
        text: 'O.N.U.',
        tokens: ['O.N.U', '.']
      },
      {
        text: '"Hello", Good sir (this is appaling)...',
        tokens: ['``', 'Hello', '\'\'', ',', 'Good', 'sir', '(', 'this', 'is', 'appaling', ')', '...']
      }
    ];

    tests.forEach(function({text, tokens}) {
      assert.deepEqual(words(text), tokens);
    });
  });
});
