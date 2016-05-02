/**
 * Talisman phonetics/french/soundex2 tests
 * =========================================
 *
 */
import assert from 'assert';
import soundex2 from '../../../src/phonetics/french/soundex2';

describe('soundex2', function() {
  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      soundex2([]);
    }, /string/);
  });

  // it('should compute the Soundex2 code correctly.', function() {
  //   const tests = [

  //   ];

  //   tests.forEach(function([code, word]) {
  //     assert.strictEqual(cologne(word), code, `${word} => ${code}`);
  //   });
  // });
});
