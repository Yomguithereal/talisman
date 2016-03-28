/**
 * Talisman phonetics/caverphone tests
 * ====================================
 *
 */
import assert from 'assert';
import caverphone, {revisited} from '../../src/phonetics/caverphone';

describe('caverphone', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      caverphone([]);
    }, /string/);
  });

  it('should compute the caverphone code correctly.', function() {
    const tests = [
      ['ANRKSN1111', 'Henrichsen'],
      ['ANRKSN1111', 'Henricsson'],
      ['ANRKSN1111', 'Henriksson'],
      ['ANRKSN1111', 'Hinrichsen'],
      ['ASKKA11111', 'Izchaki'],
      ['MKLFTA1111', 'Maclaverty'],
      ['MKLFTA1111', 'Macleverty'],
      ['MKLFTA1111', 'Mcclifferty'],
      ['MKLFTA1111', 'Mclafferty'],
      ['MKLFTA1111', 'Mclaverty'],
      ['SLKMP11111', 'Slocomb'],
      ['SLKMP11111', 'Slocombe'],
      ['SLKMP11111', 'Slocumb'],
      ['WTLM111111', 'Whitlam']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(caverphone(word), code, `${word} => ${code}`);
    });
  });

  it('should compute the revisited version of the code correctly.', function() {
    const tests = [
      ['PTA1111111', 'Peter'],
      ['ANRKSN1111', 'Henrichsen'],
      ['STFNSN1111', 'Stevenson']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(revisited(word), code, `${word} => ${code}`);
    });
  });
});
