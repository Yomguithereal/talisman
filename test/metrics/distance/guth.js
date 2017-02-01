/**
 * Talisman metrics/distance/guth tests
 * =====================================
 *
 */
import assert from 'assert';
import guth from '../../../src/metrics/distance/guth';

describe('guth', function() {
  it('should correctly compute the Guth distance.', function() {
    const tests = [
      ['HELLO', 'HELLO', 0],
      ['NOEL', 'LEON', 2],
      ['NOEN', 'LEON', 1],
      ['NOEL', 'NEON', 1],
      ['GLAVIN', 'GLAWYN', 0],
      ['MERIT', 'MERITS', 1],
      ['MERIST', 'MERITS', 0],
      ['MERIS', 'MERITS', 0],
      ['SMITH', 'SMYTH', 0],
      ['SMITH', 'SMYSS', 3],
      ['HELLO'.split(''), 'HELLO'.split(''), 0],
      ['ABC', 'DEFGHIJKLMNOPQRST', 17],
      ['DEFGHIJKLMNOPQRST', 'ABC', 17]
    ];

    tests.forEach(function([a, b, d]) {
      assert.strictEqual(guth(a, b), d, `${a}/${b} => ${d}`);
    });
  });
});
