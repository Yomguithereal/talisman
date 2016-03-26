/**
 * Talisman stats/frequencies tests
 * =================================
 *
 */
import assert from 'assert';
import ngrams, {
  bigrams,
  trigrams,
  quadrigrams
} from '../../src/stats/ngrams';

describe('stats/ngrams', function() {

  it('should throw if n is < 1.', function() {
    assert.throws(function() {
      ngrams(-1, [1, 2, 3]);
    }, Error);
  });

  it('should properly compute ngrams.', function() {
    const solutions = {
      1: [['h'], ['e'], ['l'], ['l'], ['o']],
      2: [['h', 'e'], ['e', 'l'], ['l', 'l'], ['l', 'o']],
      3: [['h', 'e', 'l'], ['e', 'l', 'l'], ['l', 'l', 'o']],
      4: [['h', 'e', 'l', 'l'], ['e', 'l', 'l', 'o']]
    };

    Object.keys(solutions).forEach(n => {
      assert.deepEqual(ngrams(n, 'hello'), solutions[n], `n = ${n}`);
    });
  });

  it('popular aliases should also work.', function() {
    assert.deepEqual(bigrams('hello'), ngrams(2, 'hello'));
    assert.deepEqual(trigrams('hello'), ngrams(3, 'hello'));
    assert.deepEqual(quadrigrams('hello'), ngrams(4, 'hello'));
  });

  it('should be possible to hash the ngrams using custom logic.', function() {
    assert.deepEqual(
      trigrams('hello', s => s.join('')),
      ['hel', 'ell', 'llo']
    );
  });
});
