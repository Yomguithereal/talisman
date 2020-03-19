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
        tokens: ['"', 'Hello', '"', ',', 'Good', 'sir', '(', 'this', 'is', 'appaling', ')', '.', '.', '.']
      },
      {
        lang: 'fr',
        text: "L'amour de l’amour naît pendant l'été!",
        tokens: ['L\'', 'amour', 'de', 'l’', 'amour', 'naît', 'pendant', 'l\'', 'été', '!']
      },
      {
        lang: 'en',
        text: 'It all started during the 90\'s!',
        tokens: ['It', 'all', 'started', 'during', 'the', '90', '\'s', '!']
      },
      {
        lang: 'en',
        text: 'This is some it\'s sentence. This is incredible "ok" (very) $2,4 2.4 Aujourd\'hui This, is very cruel',
        tokens: ['This', 'is', 'some', 'it', '\'s', 'sentence', '.', 'This', 'is', 'incredible', '"', 'ok', '"', '(', 'very', ')', '$', '2,4', '2.4', 'Aujourd', '\'hui', 'This', ',', 'is', 'very', 'cruel']
      },
      {
        lang: 'fr',
        text: 'Il fait beau aujourd’hui sur la presqu\'île.',
        tokens: ['Il', 'fait', 'beau', 'aujourd’hui', 'sur', 'la', 'presqu\'île', '.']
      }
    ];

    tests.forEach(function({lang, text, tokens}) {
      // console.log(words(lang, text))
      assert.deepEqual(words(lang, text), tokens);
    });
  });
});
