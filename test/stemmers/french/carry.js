/**
 * Talisman stemmers/french/carry tests
 * =====================================
 *
 */
import assert from 'assert';
import carry from '../../../src/stemmers/french/carry';

describe('carry', function() {

  it('should correctly stem the given words.', function() {
    const tests = [
      ['Chiennes', 'chien'],
      ['Tissaient', 'tis'],
      ['Tisser', 'tis'],
      ['Tisserand', 'tisserand'],
      ['enflammer', 'enflam'],
      ['groseilles', 'groseil'],
      ['tentateur', 'ten'],
      ['tentateurs', 'ten'],
      ['tentatrice', 'tenta'],
      ['tenter', 'ten'],
      ['tenteras', 'ten'],
      ['formateur', 'form'],
      ['formatrice', 'forma'],
      ['former', 'form'],
      ['formes', 'form']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(carry(word), stem);
    });
  });
});
