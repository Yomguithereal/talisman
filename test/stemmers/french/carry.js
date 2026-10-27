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
      // A single VC pair does not satisfy the rules requiring m > 1.
      ['tentateur', 'tenta'],
      ['tentateurs', 'tenta'],
      ['tentatrice', 'tenta'],
      ['tenter', 'ten'],
      ['tenteras', 'ten'],
      ['formateur', 'forma'],
      ['formatrice', 'forma'],
      ['former', 'form'],
      ['formes', 'form']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(carry(word), stem, `${word} => ${stem}`);
    });
  });

  it('should count VC pairs at rule boundaries across repeated calls.', function() {
    const tests = [
      ['formation', 'forma'],
      ['formellement', 'formel'],
      ['réformation', 'réform'],
      ['naturellement', 'natur'],
      ['communication', 'commun'],
      ['', ''],
      ['xyz', 'xyz'],
      ['bbb', 'bbb'],
      ['aeiouy', 'aeiouy']
    ];

    for (let i = 0; i < 2; i++) {
      tests.forEach(function([word, stem]) {
        assert.strictEqual(carry(word), stem, `${word} => ${stem}`);
      });
    }
  });
});
