/**
 * Talisman stemmers/lancaster tests
 * ==================================
 *
 */
import assert from 'assert';
import lancaster from '../../src/stemmers/lancaster';

describe('lancaster', function() {
  it('should correctly stem the given words.', function() {
    const tests = [
      ['worker', 'work'],
      ['marks', 'mark'],
      ['MARKS', 'mark'],
      ['living', 'liv'],
      ['thing', 'thing'],
      ['ear', 'ear'],
      ['string', 'string'],
      ['triplicate', 'triply'],
      ['classified', 'class'],
      ['maximum', 'maxim'],
      ['presumably', 'presum'],
      ['exceed', 'excess'],
      ['anguish', 'anct'],
      ['affluxion', 'affluct'],
      ['discept', 'disceiv']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(lancaster(word), stem);
    });
  });
});
