/**
 * Talisman phonetics/eudex tests
 * ===============================
 *
 */
import assert from 'assert';
import eudex from '../../src/phonetics/eudex';

describe('eudex', function() {

  it('should skip unsupported characters without getting stuck.', function() {
    const characters = '[\\]^_{|}~\u00a0\u00a9\u00bf';

    characters.split('').forEach(function(character) {
      assert(eudex(`co${character}mputer`).equals(eudex('computer')));
      assert(eudex(`computer${character}`).equals(eudex('computer')));
      assert(eudex(character.repeat(16)).isZero());
      assert(eudex(`co${character.repeat(16)}mputer`).equals(eudex('computer')));
    });
  });

  it('should produce correct hashes.', function() {

    const identicalHashes = [
      ['JAva', 'jAva'],
      ['co!mputer', 'computer'],
      ['comp-uter', 'computer'],
      ['comp@u#te?r', 'computer'],
      ['java', 'jiva'],
      ['lal', 'lel'],
      ['rindom', 'ryndom'],
      ['riiiindom', 'ryyyyyndom'],
      ['riyiyiiindom', 'ryyyyyndom'],
      ['triggered', 'TRIGGERED'],
      ['repert', 'ropert']
    ];

    identicalHashes.forEach(function([one, two]) {
      assert(eudex(one).equals(eudex(two)), `${one} = ${two}`);
    });

    const differentHashes = [
      ['reddit', 'eddit'],
      ['lol', 'lulz'],
      ['ijava', 'java'],
      ['jesus', 'iesus'],
      ['aesus', 'iesus'],
      ['iesus', 'yesus'],
      ['rupirt', 'ropert'],
      ['ripert', 'ropyrt'],
      ['rrr', 'rraaaa'],
      ['randomal', 'randomai']
    ];

    differentHashes.forEach(function([one, two]) {
      assert(!eudex(one).equals(eudex(two)), `${one} != ${two}`);
    });
  });
});
