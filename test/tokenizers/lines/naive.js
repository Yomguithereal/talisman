/**
 * Talisman tokenizers/lines/naive tests
 * ======================================
 *
 */
import assert from 'assert';
import lines from '../../../src/tokenizers/lines/naive';

describe('naive', function() {
  it('should properly tokenize lines.', function() {
    const text = 'First.\n   \nSecond.\r\nThird.\rFourth.\n\rFifth.\n\nSixth.\n';

    const tokens = lines(text);

    assert.deepEqual(tokens, [
      'First.',
      '   ',
      'Second.',
      'Third.',
      'Fourth.',
      'Fifth.',
      '',
      'Sixth.',
      ''
    ]);
  });
});
