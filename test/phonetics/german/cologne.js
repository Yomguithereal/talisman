/**
 * Talisman phonetics/cologne tests
 * =================================
 *
 */
import assert from 'assert';
import cologne from '../../../src/phonetics/german/cologne';

describe('cologne', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      cologne([]);
    }, /string/);
  });

  it('should compute the cologne code correctly.', function() {
    const tests = [
      ['65752682', 'Müller-Lüdenscheidt'],
      ['17863', 'Breschnew'],
      ['3412', 'Wikipedia'],
      ['4837', 'Xavier'],
      ['478237', 'Christopher'],
      ['3556', 'Wilhelm'],
      ['351', 'Philip'],
      ['1274', 'Patrick'],
      ['051742', 'Albrecht']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(cologne(word), code, `${word} => ${code}`);
    });

    assert(cologne('Meyer') !== cologne('Müller'));
    assert(cologne('Meyer') === cologne('Mayr'));
  });
});
