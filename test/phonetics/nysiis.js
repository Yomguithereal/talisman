/**
 * Talisman phonetics/nysiis tests
 * ================================
 *
 */
import assert from 'assert';
import nysiis, {refined} from '../../src/phonetics/nysiis';

describe('nysiis', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      nysiis([]);
    }, /string/);
  });

  it('should compute the nysiis code correctly.', function() {
    const tests = [
      ['ANDR', 'Andrew'],
      ['RABARTSAN', 'Robertson'],
      ['NALAN', 'Nolan'],
      ['LASXV', 'Louis XVI'],
      ['CAS', 'Case'],
      ['MCLAGLAN', 'Mclaughlin'],
      ['AWAL', 'Awale'],
      ['AAGAR', 'Aegir'],
      ['LANDGRAN', 'Lundgren'],
      ['FFALBAD', 'Philbert'],
      ['HARY', 'Harry'],
      ['MCANSY', 'Mackenzie'],
      ['ANAD', 'ANANND']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(nysiis(word), code, `${word} => ${code}`);
    });
  });

  it('should compute the refined version of the code correctly.', function() {
    const tests = [
      ['ANDR', 'Andrew'],
      ['RABARTSAN', 'Robertson'],
      ['NALAN', 'Nolan'],
      ['LASXV', 'Louis XVI'],
      ['CAS', 'Case'],
      ['MCLAGHLAN', 'Mclaughlin'],
      ['AL', 'Awale'],
      ['AGAR', 'Aegir'],
      ['LANGRAN', 'Lundgren'],
      ['FALBAD', 'Philbert'],
      ['HARY', 'Harry'],
      ['MCANSY', 'Mackenzie'],
      ['ANAD', 'ANANND']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(refined(word), code, `${word} => ${code}`);
    });
  });
});
