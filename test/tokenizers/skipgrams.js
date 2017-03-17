/**
 * Talisman tokenizers/skipgrams tests
 * ====================================
 *
 */
import assert from 'assert';
import skipgrams from '../../src/tokenizers/skipgrams';

const WORDS = 'Insurgents killed in ongoing fighting'.split(' ');

describe('skipgrams', function() {

  it('should throw if n is < k.', function() {
    assert.throws(function() {
      skipgrams(2, 1, [1, 2, 3]);
    }, Error);
  });

  it('should throw if k is < 1.', function() {
    assert.throws(function() {
      skipgrams(-1, -1, [1, 2, 3]);
    }, Error);
  });

  it('should throw if n is < 1.', function() {
    assert.throws(function() {
      skipgrams(1, -1, [1, 2, 3]);
    }, Error);
  });

  it('should properly compute skipgrams.', function() {
    const twoSkipBigrams = skipgrams(2, 2, WORDS);

    assert.deepEqual(twoSkipBigrams, [
      ['Insurgents', 'killed'],
      ['Insurgents', 'in'],
      ['Insurgents', 'ongoing'],
      ['killed', 'in'],
      ['killed', 'ongoing'],
      ['killed', 'fighting'],
      ['in', 'ongoing'],
      ['in', 'fighting'],
      ['ongoing', 'fighting']
    ]);

    const twoSkipTrigrams = skipgrams(2, 3, WORDS);

    assert.deepEqual(twoSkipTrigrams, [
      ['Insurgents', 'killed', 'in'],
      ['Insurgents', 'killed', 'ongoing'],
      ['Insurgents', 'killed', 'fighting'],
      ['Insurgents', 'in', 'ongoing'],
      ['Insurgents', 'in', 'fighting'],
      ['Insurgents', 'ongoing', 'fighting'],
      ['killed', 'in', 'ongoing'],
      ['killed', 'in', 'fighting'],
      ['killed', 'ongoing', 'fighting'],
      ['in', 'ongoing', 'fighting']
    ]);
  });

  it('should also work with strings.', function() {
    const grams = skipgrams(1, 2, 'abcd');

    assert.deepEqual(grams, ['ab', 'ac', 'bc', 'bd', 'cd']);
  });
});
