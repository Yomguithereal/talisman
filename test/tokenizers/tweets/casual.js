/**
 * Talisman tokenizers/tweets/casual tests
 * ========================================
 *
 */
import assert from 'assert';
import tokenizer from '../../../src/tokenizers/tweets/casual';

describe('casual', function() {
  it('should properly tokenize tweets.', function() {
    const tests = [
      {
        tweet: 'This is a cooool #dummysmiley: :-) :-P <3 and some arrows < > -> <--',
        tokens: ['This', 'is', 'a', 'cooool', '#dummysmiley', ':', ':-)', ':-P', '<3', 'and', 'some', 'arrows', '<', '>', '->', '<--']
      },
      {
        tweet: '@remy: This is waaaaayyyy too much for you!!!!!!',
        tokens: ['@remy', ':', 'This', 'is', 'waaaaayyyy', 'too', 'much', 'for', 'you', '!', '!', '!']
      },
      // {
      //   tweet: '@myke: Let\'s test these words: resumé España München français',
      //   tokens: ['@myke', ':', 'Let\'s', 'test', 'these', 'words', ':', 'résumé', 'España', 'München', 'français']
      // },
      {
        tweet: 'What is this ugly &copy; entity?',
        tokens: ['What', 'is', 'this', 'ugly', '©', 'entity', '?']
      },
      {
        tweet: 'Oh!, A url: https://google.com',
        tokens: ['Oh', '!', ',', 'A', 'url', ':', 'https://google.com']
      }
    ];

    tests.forEach(function({tweet, tokens}) {
      assert.deepEqual(tokenizer(tweet), tokens);
    });
  });
});
