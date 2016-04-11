/**
 * Talisman phonetics/daitch-mokotoff tests
 * =========================================
 *
 */
import {assert} from 'chai';
import daitchMokotoff from '../../src/phonetics/daitch-mokotoff';

describe('daitch-mokotoff', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      daitchMokotoff([]);
    }, /string/);
  });

  it('should compute the Daitch-Mokotoff code correctly.', function() {
    const tests = [
      ['Alpert', ['087930']],
      ['Breuer', ['791900']],
      ['Golden', ['583600']],
      ['Haber', ['579000']],
      ['Manheim', ['665600']],
      ['Topf', ['370000']],
      ['Kleinman', ['586660']],
      ['Peters', ['739400', '734000']],
      ['Peterson', ['739460', '734600']],
      ['Moskowitz', ['645740']],
      ['Moskovitz', ['645740']],
      ['Auerbach', ['097500', '097400']],
      ['Ohrbach', ['097500', '097400']],
      ['Uhrbach', ['097500', '097400']],
      ['Lipshitz', ['874400']],
      ['Lippszyc', ['874500', '874400']],
      ['Lewinsky', ['876450']],
      ['Levinsky', ['876450']],
      ['Szlamawicz', ['486740']],
      ['Shlamovitz', ['486740']],
      ['Jackson', ['154600', '454600', '145460', '445460']],
      ['Jackson-Jackson', ['154654', '454654', '145465', '445465', '154645', '454645', '145464', '445464', '154644', '454644']],
      ['augsburg', ['054795']],
      ['halberstadt', ['587943', '587433']],
      ['mannheim', ['665600']],
      ['chernowitz', ['596740', '496740']],
      ['cherkassy', ['595400', '495400']],
      ['berlin', ['798600']],
      ['mintz', ['664000']],
      ['eisenstadt', ['046433']],
      ['izenstadt', ['046433']],
      ['lewin', ['876000']],
      ['levine', ['876000']],
      ['szlachter', ['485390', '484390']],
      ['chelm', ['586000', '486000']],
      ['chelmie', ['586000', '486000']],
      ['chelma', ['586000', '486000']],
      ['helm', ['586000']],
      ['daitch', ['340000']],
      ['levy', ['870000']],
      ['mokotoff', ['653700']],
      ['chajackachac', ['515550', '415550', '514555', '414555', '515450', '415450', '514545', '414545', '515540', '415540', '514554', '414554', '515440', '415440', '514544', '414544']]
    ];

    tests.forEach(function([name, codes]) {
      assert.sameMembers(daitchMokotoff(name), codes, name);
    });
  });
});
