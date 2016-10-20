/**
 * Talisman phonetics/onca tests
 * ==============================
 *
 */
import assert from 'assert';
import onca from '../../src/phonetics/onca';

describe('onca', function() {

  it('should compute the ONCA code correctly.', function() {
    const tests = [
      ['andersen', 'A536'],
      ['Anderson', 'A536'],
      ['Brian', 'B650'],
      ['Brown', 'B650'],
      ['brun', 'B650'],
      ['cap', 'C100'],
      ['cope', 'C100'],
      ['copp', 'C100'],
      ['kipp', 'C100'],
      ['dane', 'D500'],
      ['dean', 'D500'],
      ['dionne', 'D500'],
      ['smith', 'S530'],
      ['schmit', 'S530'],
      ['schmidt', 'S530'],
      ['truman', 'T655'],
      ['trueman', 'T655']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(onca(word), code, `${word} => ${code}`);
    });
  });
});
