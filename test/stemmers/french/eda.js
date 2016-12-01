/**
 * Talisman stemmers/french/eda tests
 * ===================================
 *
 */
import assert from 'assert';
import eda from '../../../src/stemmers/french/eda';

describe('eda', function() {

  it('should correctly stem the given words.', function() {
    const tests = [
      ['intestin', 'intestin'],
      ['intestins', 'intestin'],
      ['intestine', 'intestin'],
      ['intestines', 'intestin'],
      ['intestinal', 'intestin'],
      ['intestinaux', 'intestin'],
      ['intestinales', 'intestin'],
      ['intestinale', 'intestin']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(eda(word), stem);
    });
  });
});
