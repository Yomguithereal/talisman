/**
 * Talisman phonetics/sound-d tests
 * =================================
 *
 */
import assert from 'assert';
import soundD from '../../src/phonetics/sound-d';

describe('SoundD', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      soundD([]);
    }, /string/);
  });

  it('should compute the SoundD code correctly.', function() {
    const tests = [
      ['5630', 'Martha'],
      ['6262', 'Rogers'],
      ['6262', 'Rodgers'],
      ['2520', 'Hodgins'],
      ['2520', 'Hojins'],
      ['3500', 'Houghton'],
      ['5300', 'Knight'],
      ['5300', 'Night'],
      ['5550', 'Gnomon'],
      ['5550', 'Nomon'],
      ['5100', 'Pnaf'],
      ['5100', 'Naf'],
      ['2600', 'Ackroyd'],
      ['2600', 'Ckroyd'],
      ['6300', 'Wright'],
      ['6300', 'Right'],
      ['2160', 'Xavier'],
      ['2160', 'Savior'],
      ['3500', 'Whitney'],
      ['3500', 'Witney']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(soundD(word), code, `${word} => ${code}`);
    });
  });
});
