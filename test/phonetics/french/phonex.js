/**
 * Talisman phonetics/french/phonex tests
 * =======================================
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
      ['PHYLAURHEIMSMET', 'FILOR4SNY'],
      ['Martin', 'NORTIN'],
      ['Bernard', 'FYRNOR'],
      ['Faure', 'FORE'],
      ['Perez', 'TYRYZ'],
      ['Gros', 'GROS'],
      ['Chapuis', '5OTUIS'],
      ['Boyer', 'F2YR'],
      ['Gauthier', 'KOTIYR'],
      ['Rey', 'RY'],
      ['Barthélémy', 'FORTILINI'],
      ['Henry', 'H1RI'],
      ['Moulin', 'N3LIN'],
      ['Rousseau', 'R3SO']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(phonex(word), code, `${word} => ${code}`);
    });
  });
});
