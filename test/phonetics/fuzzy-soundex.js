/**
 * Talisman phonetics/fuzzy-soundex tests
 * =======================================
 *
 */
import assert from 'assert';
import fuzzySoundex from '../../src/phonetics/fuzzy-soundex';

describe('fuzzy-soundex', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      fuzzySoundex([]);
    }, /string/);
  });

  it('should compute the fuzzy Soundex code correctly.', function() {
    const tests = [
      ['', ''],
      ['Kristen', 'K6935'],
      ['Krissy', 'K69'],
      ['Christen', 'K6935'],
      ['peter', 'P36'],
      ['pete', 'P3'],
      ['pedro', 'P36'],
      ['stephen', 'S315'],
      ['steve', 'S31'],
      ['smith', 'S53'],
      ['smythe', 'S53'],
      ['gail', 'G4'],
      ['gayle', 'G4'],
      ['guillaume', 'G45'],
      ['christine', 'K6935'],
      ['christina', 'K6935'],
      ['kristina', 'K6935'],
      ['Wight', 'W3'],
      ['Hardt', 'H6'],
      ['Knight', 'N3'],
      ['Czech', 'S7'],
      ['Tsech', 'S7'],
      ['gnomic', 'N59'],
      ['Wright', 'R3'],
      ['Hrothgar', 'R376'],
      ['Hwaet', 'W3'],
      ['Grant', 'G63'],
      ['Hart', 'H6'],
      ['Hardt', 'H6']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(fuzzySoundex(word), code, `${word} => ${code}`);
    });
  });
});
