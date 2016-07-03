/**
 * Talisman phonetics/lein tests
 * ==============================
 *
 */
import assert from 'assert';
import lein from '../../src/phonetics/lein';

describe('lein', function() {

  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      lein([]);
    }, /string/);
  });

  it('should compute the lein code correctly.', function() {
    const tests = [
      ['Guillaume', 'G320'],
      ['Dabbs', 'D450'],
      ['Daves', 'D450'],
      ['Davies', 'D450'],
      ['Davis', 'D450'],
      ['Debaca', 'D450'],
      ['Debose', 'D450'],
      ['Debus', 'D450'],
      ['Defazio', 'D450'],
      ['Defigh', 'D450'],
      ['Deveaux', 'D450'],
      ['Devese', 'D450'],
      ['Devies', 'D450'],
      ['Devos', 'D450'],
      ['Dipiazza', 'D450'],
      ['Divish', 'D450'],
      ['Dobak', 'D450'],
      ['Dobbs', 'D450'],
      ['Dobis', 'D450'],
      ['Dobish', 'D450'],
      ['Dobosh', 'D450'],
      ['Doepke', 'D450'],
      ['Dopps', 'D450'],
      ['Doubek', 'D450'],
      ['Doviak', 'D450'],
      ['Dubbs', 'D450'],
      ['Dubke', 'D450'],
      ['Dubois', 'D450'],
      ['Duboise', 'D450'],
      ['Dubose', 'D450'],
      ['Dubs', 'D450'],
      ['Dubukey', 'D450'],
      ['Dubus', 'D450'],
      ['Dufek', 'D450'],
      ['Duffek', 'D450'],
      ['Dupas', 'D450'],
      ['Dupois', 'D450'],
      ['Dupuis', 'D450'],
      ['Arlène', 'A332'],
      ['Lüdenscheidt', 'L125']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(lein(word), code, `${word} => ${code}`);
    });
  });
});
