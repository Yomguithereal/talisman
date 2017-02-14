/**
 * Talisman metrics/distance/levenshtein tests
 * ============================================
 *
 */
import assert from 'assert';
import levenshtein, {limited} from '../../../src/metrics/distance/levenshtein';

describe('levenshtein', function() {
  const tests = [
    [['b', 'o', 'o', 'k'], ['b', 'a', 'c', 'k'], 2],
    [['the', 'cat', 'eats', 'mouse'], ['the', 'mouse', 'likes', 'mouse'], 2],
    ['book', 'back', 2],
    ['hello', 'helo', 1],
    ['good sir', 'baal', 8],
    ['say', 'shiver', 5],
    ['feature', 'get-project-features', 13],
    ['example', 'samples', 3],
    ['sturgeon', 'urgently', 6],
    ['levenshtein', 'frankenstein', 6],
    ['distance', 'difference', 5],
    ['a', 'b', 1],
    ['ab', 'ac', 1],
    ['ac', 'bc', 1],
    ['abc', 'axc', 1],
    ['xabxcdxxefxgx', '1ab2cd34ef5g6', 6],
    ['a', '', 1],
    ['ab', 'a', 1],
    ['ab', 'b', 1],
    ['abc', 'ac', 1],
    ['xabxcdxxefxgx', 'abcdefg', 6],
    ['', 'a', 1],
    ['a', 'ab', 1],
    ['b', 'ab', 1],
    ['ac', 'abc', 1],
    ['abcdefg', 'xabxcdxxefxgx', 6],
    ['', '', 0],
    ['a', 'a', 0],
    ['abc', 'abc', 0],
    ['', '', 0],
    ['a', '', 1],
    ['', 'a', 1],
    ['abc', '', 3],
    ['', 'abc', 3],
    ['因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文', 2],
    ['因為我是中國人所以我會說中文'.split(''), '因為我是英國人所以我會說英文'.split(''), 2]
  ];

  it('should correctly compute the Levenshtein distance.', function() {
    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(levenshtein(a, b), distance, `${a} <=> ${b}`);
    });
  });

  it('should be possible to use the limited version.', function() {
    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(limited(2, a, b), distance > 2 ? Infinity : distance, `${a} <=> ${b}`);
    });
  });
});
