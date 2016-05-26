/**
 * Talisman phonetics/french/sonnex tests
 * =======================================
 *
 */
import assert from 'assert';
import sonnex from '../../../src/phonetics/french/sonnex';

describe('sonnex', function() {
  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      sonnex([]);
    }, /string/);
  });

  it('should compute the sonnex code correctly.', function() {
    const tests = [
      ['empire', '2ir'],
      ['florentin', 'flor2t1'],
      ['ballon', 'bal3'],
      ['guillaume', 'giom'],
      ['sept', 'sEt'],
      ['septième', 'sEtiEm'],
      ['huit', 'uit'],
      ['potion', 'posi3'],
      ['constitution', 'k3stitusi3'],
      ['chrétien', 'krEti1'],
      ['châtier', 'CatiE'],
      ['tienne', 'tiEn'],
      ['manger', 'm2jE'],
      ['siffler', 'siflE'],
      ['passionnant', 'pasion2'],
      ['passionnante', 'pasion2t'],
      ['petit', 'peti']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(sonnex(word), code, `${word} => ${code}`);
    });
  });
});
