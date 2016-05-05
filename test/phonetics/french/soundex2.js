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

  it('should compute the Soundex2 code correctly.', function() {
    const tests = [
      ['Asamian', 'AZMN'],
      ['Knight', 'NG'],
      ['MacKenzie', 'MKNZ'],
      ['Pfeifer', 'FR'],
      ['Philippe', 'FLP'],
      ['Schindler', 'SNDL'],
      ['Chateau', 'CHT'],
      ['Habitat', 'HBT'],
      ['Téhéran', 'TRN'],
      ['Essayer', 'ESYR'],
      ['Crayon', 'CRYN'],
      ['Plyne', 'PLN'],
      ['Barad', 'BR']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(soundex2(word), code, `${word} => ${code}`);
    });
  });
});
