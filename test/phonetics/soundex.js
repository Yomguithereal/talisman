/**
 * Talisman phonetics/soundex tests
 * =================================
 *
 */
import assert from 'assert';
import soundex from '../../src/phonetics/soundex';

describe('soundex', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      soundex([]);
    }, /string/);
  });

  it('should compute the soundex code correctly.', function() {
    const tests = [
      ['R163', 'Rupert'],
      ['R163', 'Robert'],
      ['R150', 'Rubin'],
      ['A261', 'Ashcroft'],
      ['A261', 'Ashcraft'],
      ['T522', 'Tymczak'],
      ['P236', 'Pfister'],
      ['A536', 'Andrew'],
      ['W252', 'Wozniak'],
      ['C423', 'Callister'],
      ['H400', 'Hello']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(soundex(word), code, `${word} => ${code}`);
    });
  });
});
