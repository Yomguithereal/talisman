/**
 * Talisman phonetics/roger-root tests
 * ====================================
 *
 */
import assert from 'assert';
import rogerRoot from '../../src/phonetics/roger-root';

describe('roger-root', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      rogerRoot([]);
    }, /string/);
  });

  it('should compute the roger-root code correctly.', function() {
    const tests = [
      ['Guillaume', '07530'],
      ['Arlène', '14520'],
      ['Lüdenscheidt', '05126'],
      ['Chalman', '06532'],
      ['Ching', '06270'],
      ['Anderson', '12140'],
      ['Overstreet', '18401'],
      ['Heckel', '27500'],
      ['Wyszynski', '40207'],
      ['Whitted', '41100'],
      ['Ongoog', '12770'],
      ['Johnson', '32020'],
      ['Williams', '45300'],
      ['Smith', '00310'],
      ['Jones', '32000'],
      ['Brown', '09420'],
      ['Davis', '01800'],
      ['Jackson', '37020'],
      ['Wilson', '45020'],
      ['Lee', '05000'],
      ['Thomas', '01300']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(rogerRoot(word), code, `${word} => ${code}`);
    });
  });
});
