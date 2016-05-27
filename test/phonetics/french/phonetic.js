/**
 * Talisman phonetics/french/phonetic tests
 * =========================================
 *
 */
import assert from 'assert';
import phonetic from '../../../src/phonetics/french/phonetic';

describe('phonetic', function() {
  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      phonetic([]);
    }, /string/);
  });

  it('should compute the phonetic code correctly.', function() {

    const tests = [
      ['Gendarme', 'JANDARM'],
      ['Athmosphérique', 'ATMOSFERIK'],
      ['Morceaux', 'MORSO'],
      ['Sciemment', 'SIAMAN'],
      ['Comportement', 'KONPORTEMAN'],
      ['Sceau', 'SO'],
      ['Seau', 'SO'],
      ['Sot', 'SO'],
      ['Saut', 'SO'],
      ['Soûl', 'SOUL'],
      ['Description', 'DESKRIPSION'],
      ['Verre', 'VER'],
      ['Vert', 'VER'],
      ['Vers', 'VER'],
      ['Saule', 'SOL'],
      ['Sol', 'SOL'],
      ['Gnognotte', 'NIONIOT'],
      ['Pendentif', 'PANDANTIF']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(phonetic(word), code, `${word} => ${code}`);
    });
  });
});
