/**
 * Talisman stemmers/french/unine tests
 * =====================================
 *
 */
import assert from 'assert';
import unine from '../../../src/stemmers/french/unine';

describe('lancaster', function() {
  it('should correctly stem the given words.', function() {
    const tests = [
      ['mot', 'mot'],
      ['chevaux', 'cheval'],
      ['hiboux', 'hibou'],
      ['chantés', 'chant'],
      ['chanter', 'chant'],
      ['chante', 'chant'],
      ['baronnes', 'baron'],
      ['barons', 'baron'],
      ['baron', 'baron']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(unine(word), stem);
    });
  });
});
