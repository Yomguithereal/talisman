/**
 * Talisman tokenizers/paragraphs/naive tests
 * ==========================================
 *
 */
import assert from 'assert';
import paragraphs from '../../../src/tokenizers/paragraphs/naive';

describe('naive', function() {
  it('should properly tokenize paragraphs.', function() {
    const text = [
      'Hello first paragraph.\n\nWhat do you do?\r\n\r\nHello Mom!\n\r\n\r',
      'Another paragraph. Multiple sentences.\nYou see?\n\n\n',
      'Here.\n\t\nThere.\n    \nOver there!'
    ].join('');

    const tokens = paragraphs(text);

    assert.deepEqual(tokens, [
      'Hello first paragraph.',
      'What do you do?',
      'Hello Mom!',
      'Another paragraph. Multiple sentences.\nYou see?',
      'Here.',
      'There.',
      'Over there!'
    ]);
  });
});
