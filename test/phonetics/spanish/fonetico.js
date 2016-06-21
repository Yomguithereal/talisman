/**
 * Talisman phonetics/spanish/fonetico tests
 * ==========================================
 *
 */
import assert from 'assert';
import fonetico from '../../../src/phonetics/spanish/fonetico';

describe('fonetico', function() {
  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      fonetico([]);
    }, /string/);
  });

  it('should compute the fonetico code correctly.', function() {
    const tests = [
      ['gato', 'GATO'],
      ['la canción de tu vida', 'LA KANSION DE TU BIDA'],
      ['arroyo', 'AROYO'],
      ['carrrrramba', 'KARAMBA'],
      ['coatlicue', 'KWATLIKWE'],
      ['tenochtitlan', 'TENOKTITLAN'],
      ['chachapoyas', '§A§APOYAS'],
      ['shawarma', 'ʃAWARMA'],
      ['huaca pucllana', 'WAKA PUKYANA'],
      ['wari', 'WARI'],
      ['huari', 'WARI'],
      ['oaxaca', 'WAJAKA'],
      ['cero', 'SERO'],
      ['jorge', 'JORJE'],
      ['guadalajara', 'GWADALAJARA'],
      ['guillermo', 'GIYERMO'],
      ['vergüenza', 'BERGWENSA'],
      ['arrümbaya', 'ARUMBAYA'],
      ['quito', 'KITO'],
      ['hijo', 'IJO'],
      ['huitzilopochtli', 'WITSILOPOKTLI'],
      ['zanahoria', 'SANAORIA'],
      ['sobrevivencia', 'SOBREBIBENSIA'],
      ['deshacer', 'DESASER'],
      ['psicologico', 'SIKOLOJIKO'],
      ['rey', 'REI'],
      ['xilofono', 'SILOFONO'],
      ['xilophono', 'SILOFONO'],
      ['mexico', 'MEJIKO'],
      ['andahuaylillas', 'ANDAWAYLIYAS'],
      ['llamarte', 'YAMARTE'],
      ['qhapaqñan', 'KAPAKÑAN'],
      ['capacñan', 'KAPAKÑAN'],
      ['churros', '§UROS'],
      ['mueca', 'MWEKA']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(fonetico(word), code, `${word} => ${code}`);
    });
  });
});
