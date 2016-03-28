/**
 * Talisman phonetics/mra tests
 * =============================
 *
 */
import assert from 'assert';
import mra from '../../src/phonetics/mra';

describe('mra', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      mra([]);
    }, /string/);
  });

  it('should compute the MRA codex correctly.', function() {
    const tests = [
      ['BYRN', 'Byrne'],
      ['BRN', 'Boern'],
      ['SMTH', 'Smith'],
      ['SMYTH', 'Smyth'],
      ['CTHRN', 'Catherine'],
      ['KTHRYN', 'Kathryn']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(mra(word), code, `${word} => ${code}`);
    });
  });
});
