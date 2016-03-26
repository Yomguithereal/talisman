/**
 * Talisman stemmers/porter tests
 * ===============================
 *
 */
import assert from 'assert';
import porter from '../../src/stemmers/porter';

describe('porter', function() {
  it('should correctly stem the given words.', function() {
    const tests = [
      ['catastrophe', 'catastroph'],
      ['anathema', 'anathema'],
      ['mathematics', 'mathemat'],
      ['adjective', 'adject'],
      ['mushroom', 'mushroom'],
      ['building', 'build'],
      ['spiteful', 'spite'],
      ['external', 'extern'],
      ['exterior', 'exterior'],
      ['coffee', 'coffe']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(porter(word), stem);
    });
  });
});
