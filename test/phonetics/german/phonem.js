/**
 * Talisman phonetics/german/phonem tests
 * ========================================
 *
 */
import assert from 'assert';
import phonem from '../../../src/phonetics/german/phonem';

describe('phonem', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      phonem([]);
    }, /string/);
  });

  it('should compute the phonem code correctly.', function() {
    const tests = [
      ['', ''],
      ['müller', 'MYLR'],
      ['schmidt', 'CMYD'],
      ['schneider', 'CNAYDR'],
      ['fischer', 'VYCR'],
      ['weber', 'VBR'],
      ['meyer', 'MAYR'],
      ['wagner', 'VACNR'],
      ['schulz', 'CULC'],
      ['becker', 'BCR'],
      ['hoffmann', 'OVMAN'],
      ['schäfer', 'CVR'],
      ['mair', 'MAYR'],
      ['bäker', 'BCR'],
      ['schaeffer', 'CVR'],
      ['computer', 'COMBUDR'],
      ['pfeifer', 'VAYVR'],
      ['pfeiffer', 'VAYVR']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(phonem(word), code, `${word} => ${code}`);
    });
  });
});
