/**
 * Talisman phonetics/soundex tests
 * =================================
 *
 */
import assert from 'assert';
import soundex, {refined} from '../../src/phonetics/soundex';

describe('soundex', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      soundex([]);
    }, /string/);
  });

  it('should compute the soundex code correctly.', function() {
    const tests = [
      ['R163', 'Rupert'],
      ['R163', 'Robert'],
      ['R150', 'Rubin'],
      ['A261', 'Ashcroft'],
      ['A261', 'Ashcraft'],
      ['T522', 'Tymczak'],
      ['P236', 'Pfister'],
      ['A536', 'Andrew'],
      ['W252', 'Wozniak'],
      ['C423', 'Callister'],
      ['H400', 'Hello']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(soundex(word), code, `${word} => ${code}`);
    });
  });

  it('should compute the refined soundex code correctly.', function() {
    const tests = [
      ['T6036084', 'testing'],
      ['T6036084', 'TESTING'],
      ['T60', 'The'],
      ['Q503', 'quick'],
      ['B1908', 'brown'],
      ['F205', 'fox'],
      ['J408106', 'jumped'],
      ['O0209', 'over'],
      ['L7050', 'lazy'],
      ['D6043', 'dogs']
    ];

    tests.forEach(function([code, word]) {
      assert.strictEqual(refined(word), code, `${word} => ${code}`);
    });

    const homophones = [
      ['Braz', 'Broz'],
      ['Caren', 'Caron', 'Carren', 'Charon', 'Corain', 'Coram', 'Corran', 'Corrin', 'Corwin', 'Curran', 'Curreen', 'Currin', 'Currom', 'Currum', 'Curwen'],
      ['Hairs', 'Hark', 'Hars', 'Hayers', 'Heers', 'Hiers'],
      ['Lambard', 'Lambart', 'Lambert', 'Lambird', 'Lampaert', 'Lampard', 'Lampart', 'Lamperd', 'Lampert', 'Lamport', 'Limbert', 'Lombard'],
      ['Nolton', 'Noulton']
    ];

    homophones.forEach(function(batch) {
      const first = refined(batch[0]);

      batch.slice(1).forEach(name => assert.strictEqual(first, refined(name)));
    });
  });
});
