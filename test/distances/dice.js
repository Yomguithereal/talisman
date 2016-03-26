/**
 * Talisman distances/dicd tests
 * ==============================
 *
 */
import assert from 'assert';
import dice, {
  index,
  similarity,
  distance
} from '../../src/distances/dice';

describe('dice', function() {

 it('should compute the dice index & aliases correctly.', function() {
  const tests = [
    ['healed', 'healed', 1],
    ['healed', 'sealed', 0.8],
    ['healed', 'healthy', 6 / 11],
    ['healed', 'heard', 4 / 9],
    ['healed', 'herded', 0.4],
    ['healed', 'help', 0.25],
    ['healed', 'sold', 0],
    ['tomato', 'tomato', 1],
    ['h', 'help', 0],
    ['h', 'h', 1],
    ['', '', 1],
    ['h', 'g', 0]
  ];

  tests.forEach(function([x, y, i]) {
    assert.strictEqual(dice(x, y), i, `${x} / ${y}`);
    assert.strictEqual(dice(x, y), index(x, y));
    assert.strictEqual(dice(x, y), similarity(x, y));
    assert.strictEqual(1 - dice(x, y), distance(x, y));
  });
 });
});
