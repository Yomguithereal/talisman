/**
 * Talisman stemmers/french/unine tests
 * =====================================
 *
 */
import assert from 'assert';
import unine, {minimal} from '../../../src/stemmers/french/unine';

describe('unine', function() {
  it('default export should be the minimal stemmer.', function() {
    assert(unine('hiboux'), minimal('hiboux'));
  });

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
