/**
 * Talisman keyers/skeleton tests
 * ===============================
 */
import assert from 'assert';
import skeleton from '../../src/keyers/skeleton';

describe('skeleton', function() {

  it('should return proper skeleton keys.', function() {
    const tests = [
      ['', ''],
      ['hello', 'HLEO'],
      ['The quick brown fox jumped over the lazy dog.', 'THQCKBRWNFXJMPDVLZYGEUIOA'],
      ['Christopher', 'CHRSTPIOE'],
      ['Niall', 'NLIA'],
      ['CHEMOGENIC', 'CHMGNEOI'],
      ['chemomagnetic', 'CHMGNTEOAI'],
      ['Chemcal', 'CHMLEA'],
      ['Chemcial', 'CHMLEIA'],
      ['Chemical', 'CHMLEIA'],
      ['Chemicial', 'CHMLEIA'],
      ['Chimical', 'CHMLIA'],
      ['Chemiluminescence', 'CHMLNSEIU'],
      ['Chemiluminescent', 'CHMLNSTEIU'],
      ['Chemically', 'CHMLYEIA']
    ];

    tests.forEach(function([string, key]) {
      assert.strictEqual(skeleton(string), key, `${string} => ${key}`);
    });
  });
});
