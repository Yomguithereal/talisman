/**
 * Talisman phonetics/french/phonex tests
 * =========================================
 *
 */
import assert from 'assert';
import phonex from '../../../src/phonetics/french/phonex';

describe('phonex', function() {
  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      phonex([]);
    }, /string/);
  });

  // console.log(phonex('Traités'), phonex('Traité'), phonex('Traîtrise'), phonex('Pascal'), phonex('Piscine'))

  // it('should compute the Phonex code correctly.', function() {
  //   const tests = [

  //   ];

  //   tests.forEach(function([code, word]) {
  //     assert.strictEqual(cologne(word), code, `${word} => ${code}`);
  //   });
  // });
});
