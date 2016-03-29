/**
 * Talisman stemmers/lovins tests
 * ===============================
 *
 */
import assert from 'assert';
import lovins from '../../src/stemmers/lovins';

describe('lovins', function() {
  it('should correctly stem the given words.', function() {
    const tests = [
      ['nationally', 'nat'],
      ['sitting', 'sit'],
      ['matrix', 'matric'],
      ['matrices', 'matric'],
      ['rubbing', 'rub'],
      ['rubb', 'rub'],
      ['believe', 'belief'],
      ['consumption', 'consum'],
      ['induction', 'induc'],
      ['absorption', 'absorb'],
      ['recursive', 'recur'],
      ['administrate', 'administer'],
      ['parametric', 'parameter'],
      ['dissolved', 'dissolut'],
      ['angular', 'angl'],
      ['vibex', 'vibic'],
      ['index', 'indic'],
      ['apex', 'apic'],
      ['cortex', 'cortic'],
      ['anthrax', 'anthrac'],
      ['persuade', 'persuas'],
      ['evade', 'evas'],
      ['decide', 'dec'],
      ['elide', 'el'],
      ['deride', 'der'],
      ['expand', 'expans'],
      ['defend', 'defens'],
      ['respond', 'respons'],
      ['collusion', 'collus'],
      ['obstrusion', 'obstrus'],
      ['adhesion', 'adhes'],
      ['remit', 'remis'],
      ['extent', 'extens'],
      ['converted', 'convers'],
      ['parenthetic', 'parenthes'],
      ['analytic', 'analys'],
      ['analyzed', 'analys']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(lovins(word), stem, `${word} => ${stem}`);
    });
  });
});
