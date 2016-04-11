/**
 * Talisman phonetics/daitch-mokotoff tests
 * =========================================
 *
 */
import assert from 'assert';
import daitchMokotoff from '../../src/phonetics/daitch-mokotoff';

describe('daitch-mokotoff', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      daitchMokotoff([]);
    }, /string/);
  });

  it('should compute the Daitch-Mokotoff code correctly.', function() {
    const tests = [

    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(daitchMokotoff(word), code, `${word} => ${code}`);
    });
  });
});
