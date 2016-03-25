/**
 * Talisman stats/frequencies tests
 * =================================
 *
 */
import assert from 'assert';
import frequencies from '../../src/stats/frequencies';

describe('stats/frequencies', function() {

  it('should compute correct frequencies of the given sequence.', function() {
    assert.deepEqual(
      frequencies([1, 2, 3, 3, 4, 4, 4, 5]),
      {
        1: 1,
        2: 1,
        3: 2,
        4: 3,
        5: 1
      }
    );
  });

  it('should also work on strings.', function() {
    assert.deepEqual(
      frequencies('Hello'),
      {
        H: 1,
        e: 1,
        l: 2,
        o: 1
      }
    );
  });
});
