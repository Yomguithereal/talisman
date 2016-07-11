/**
 * Talisman stemmers/uea-lite tests
 * =================================
 *
 */
import assert from 'assert';
import ueaLite, {withRule} from '../../src/stemmers/uea-lite';

describe('uea-lite', function() {
  it('should be possible to retrieve the number of the matched rule.', function() {
    assert.deepEqual(withRule('ordained'), {
      rule: '13.6',
      stem: 'ordain'
    });

    assert.deepEqual(withRule('during'), {
      rule: '90',
      stem: 'during'
    });
  });

  it('should correctly stem the given words.', function() {
    const tests = [
      ['is', 'is'],
      ['man', 'man'],
      ['happiness', 'happiness'],
      ['theses', 'thesis'],
      ['bases', 'base'],
      ['ordained', 'ordain'],
      ['killed', 'kill'],
      ['liked', 'like'],
      ['helped', 'help'],
      ['scarred', 'scar'],
      ['invited', 'invite'],
      ['exited', 'exit'],
      ['exited', 'exit'],
      ['debited', 'debit'],
      ['smited', 'smite'],
      ['running', 'run'],
      ['settings', 'set'],
      ['timing', 'time'],
      ['dying', 'die'],
      ['undying', 'undie'],
      ['untying', 'untie'],
      ['flying', 'fly'],
      ['lying', 'lie'],
      ['harping', 'harp'],
      ['charring', 'char'],
      ['changes', 'change'],
      ['deaths', 'death'],
      ['shadows', 'shadow'],
      ['flies', 'fly'],
      ['things', 'thing'],
      ['nothings', 'nothing'],
      ['witches', 'witch'],
      ['makes', 'make'],
      ['smokes', 'smoke'],
      ['does', 'do'],
      ['abodes', 'abode'],
      ['escapades', 'escapade'],
      ['crusades', 'crusade'],
      ['grades', 'grade'],
      ['wires', 'wire'],
      ['acres', 'acre'],
      ['fires', 'fire'],
      ['cares', 'care'],
      ['USA', 'USA'],
      ['FLOSS', 'FLOSS'],
      ['MREs', 'MRE'],
      ['USAED', 'USAED']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(ueaLite(word), stem, `${word} => ${stem}`);
    });
  });
});
