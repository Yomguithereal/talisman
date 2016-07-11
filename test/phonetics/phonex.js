/**
 * Talisman phonetics/phonex tests
 * ================================
 *
 */
import assert from 'assert';
import phonex from '../../src/phonetics/phonex';

describe('phonex', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      phonex([]);
    }, /string/);
  });

  it('should compute the phonex code correctly.', function() {
    const tests = [
      ['', ''],
      ['Guillaume', 'G45'],
      ['Ewell', 'A4'],
      ['Filp', 'F1'],
      ['Heames', 'A5'],
      ['Kneves', 'N1'],
      ['River', 'R16'],
      ['Corley', 'C4'],
      ['Carton', 'C35'],
      ['Cachpole', 'C214'],
      ['Saxon', 'S25'],
      ['Wright', 'R23'],
      ['Ai', 'A'],
      ['Barth', 'B3'],
      ['Perry', 'B6'],
      ['Garth', 'G3'],
      ['Jerry', 'G6'],
      ['Gerry', 'G6'],
      ['Camden', 'C5'],
      ['Ganges', 'G5'],
      ['A-1', 'A']
    ];

    const identical = [
      ['Ewell', 'Ule'],
      ['Filp', 'Philp'],
      ['Yule', 'Ewell'],
      ['Heames', 'Eames'],
      ['Kneves', 'Neves'],
      ['River', 'Rivers'],
      ['Corley', 'Coley'],
      ['Carton', 'Carlton'],
      ['Cachpole', 'Catchpole'],
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(phonex(word), code, `${word} => ${code}`);
    });

    identical.forEach(function([one, two]) {
      assert.strictEqual(phonex(one), phonex(two));
    });
  });
});
