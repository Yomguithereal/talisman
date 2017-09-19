/* eslint no-unused-vars: 0 */
/**
 * Talisman metrics/distance/lig tests
 * ====================================
 *
 */
import {assert} from 'chai';
import {lig2, lig3} from '../../../src/metrics/distance/lig';

describe('lig', function() {

  it('should correctly compute the LIG1, LIG2 & LIG3 distance.', function() {
    const tests = [
      ['', '', 1, 1, 1],
      ['Hello', 'Hello', 1, 1, 1],
      ['abc', 'def', 0, 0, 0],
      ['Glavin', 'Glawyn', 0.5, 0.67, 0.80],
      ['Williams', 'Vylliems', 0.45, 0.63, 0.77],
      ['Lewis', 'Louis', 0.43, 0.6, 0.75],
      ['Alex', 'Alexander', 0.44, 0.44, 0.62],
      ['Wild', 'Wildsmith', 0.44, 0.44, 0.62],
      ['Bram', 'Bramberley', 0.4, 0.4, 0.58]
    ];

    tests.forEach(function([a, b, lig1Distance, lig2Distance, lig3Distance]) {
      assert.approximately(lig2(a, b), lig2Distance, 0.01, `LIG2: ${a}, ${b}`);
      assert.approximately(lig3(a, b), lig3Distance, 0.01, `LIG3: ${a}, ${b}`);
    });
  });
});
