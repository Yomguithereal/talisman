/**
 * Talisman parsers/brown tests
 * =============================
 */
import assert from 'assert';
import brown from '../../src/parsers/brown';
import {loadResource} from '../helpers';

const ca02 = loadResource('brown/ca02.txt');

describe('brown', function() {

  it('should correctly parse Brown corpus text.', function() {

    const tokens = brown(ca02);

    assert.strictEqual(tokens.length, 2277);

    assert.deepEqual(
      tokens.slice(0, 10),
      [
        ['Austin', 'np-hl'],
        [',', ',-hl'],
        ['Texas', 'np-hl'],
        ['--', '--'],
        ['Committee', 'nn'],
        ['approval', 'nn'],
        ['of', 'in'],
        ['Gov.', 'nn-tl'],
        ['Price', 'np'],
        ['Daniel\'s', 'np$']
      ]
    );
  });
});
