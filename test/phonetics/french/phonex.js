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

  it('should compute the Phonex code correctly.', function() {
    const tests = [
      ['PHYLAURHEIMSMET', 'FILOR4SNY']
    ];

// tests.forEach(function([word]) {console.log(phonex(word))});

    tests.forEach(function([word, code]) {
      assert.strictEqual(phonex(word), code, `${word} => ${code}`);
    });
  });
});
