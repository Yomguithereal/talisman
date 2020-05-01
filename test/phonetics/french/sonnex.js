/**
 * Talisman phonetics/french/sonnex tests
 * =======================================
 *
 */
import assert from 'assert';
import sonnex from '../../../src/phonetics/french/sonnex';

describe('sonnex', function() {
  it('should throw if the given word is not a string.', function() {
    assert.throws(function() {
      sonnex([]);
    }, /string/);
  });

  it('should compute the sonnex code correctly.', function() {

    const tests = [
      ['eschatologie', 'Eskatoloji'],
      ['chiropracteur', 'kiroprakter'],
      ['chiroubles', 'CirUbl'],
      ['empire', '2pir'],
      ['temps', 't2'],
      ['contretemps', 'k3tret2'],
      ['temporisation', 't2porizasi3'],
      ['amphétamine', '2fEtamin'],
      ['emphase', '2faz'],
      ['méphitique', 'mEfitik'],
      ['florentin', 'flor2t1'],
      ['ballon', 'bal3'],
      ['guillaume', 'giom'],
      ['sept', 'sEt'],
      ['septième', 'sEtiEm'],
      ['huit', 'uit'],
      ['potion', 'posi3'],
      ['constitution', 'k3stitusi3'],
      ['chrétien', 'krEti1'],
      ['châtier', 'CatiE'],
      ['tienne', 'tiEn'],
      ['manger', 'm2jE'],
      ['siffler', 'siflE'],
      ['passionnant', 'pasion2'],
      ['passionnante', 'pasion2t'],
      ['petit', 'peti'],
      ['écusson', 'Ekus3'],
      ['robuste', 'robust'],
      ['usinage', 'uzinaj'],
      ['intrus', '1tru'],

      // Those are hard to define and are not completely satisfactory but hey...
      ['schizophrénie', 'sCizofrEni'],
      ['psychiatre', 'psiCiatr']
    ];

    tests.forEach(function([word, code]) {
      assert.strictEqual(sonnex(word), code, `${word} => ${code}`);
    });

    const homophones = [
      ['amande', 'amende'],
      ['ancre', 'encre'],
      ['autel', 'hôtel'],
      ['balade', 'ballade'],
      ['basilic', 'basilique'],
      ['boulot', 'bouleau'],
      ['cane', 'canne'],
      ['censé', 'sensé'],
      ['compte', 'comte', 'conte'],
      ['cygne', 'signe'],
      ['date', 'datte'],
      ['dessin', 'dessein'],
      ['différend', 'différent'],
      ['du', 'dû'],
      ['filtre', 'philtre'],
      ['flan', 'flanc'],
      ['foi', 'foie', 'fois'],
      ['gène', 'gêne'],
      ['golf', 'golfe'],
      ['héraut', 'héro', 'héros'],
      ['lacer', 'lasser'],
      ['lire', 'lyre'],
      ['maire', 'mer', 'mère'],
      ['mal', 'mâle', 'malle'],
      ['mite', 'mythe'],
      ['pain', 'pin'],
      ['palais', 'palet'],
      ['a', 'à'],
      ['au', 'aux', 'haut'],
      ['cerf', 'serf', 'serre'],
      ['choeur', 'chœur', 'cœur', 'coeur'],
      ['cahos', 'chaos'],
      ['ce', 'se'],
      ['ai', 'es', 'est', 'et'],
      ['cric', 'crique'],
      ['on', 'ont'],
      ['champ', 'chant'],
      ['ou', 'où'],
      ['col', 'colle'],
      ['colon', 'côlon'],
      ['son', 'sont', 'sons'],
      ['ta', 't\'a', 'tas'],
      ['dans', 'd\'en', 'dent'],
      ['ma', 'm\'a', 'm\'as', 'mas', 'mât'],
      ['mon', 'm\'ont', 'mont'],
      ['la', 'l\'a', 'l\'as', 'là'],
      ['au', 'aux', 'haut'],
      ['leur', 'leurs', 'l\'heure', 'leurre'],
      ['sa', 'ça', 'çà'],
      ['peu', 'peut', 'peux'],
      ['quand', 'quant', 'qu\'en'],
      ['ni', 'n\'y', 'nie', 'nies', 'nid', 'nids'],
      ['ton', 't\'ont', 'thon'],
      ['sans', 's\'en', 'sang', 'cent'],
      ['tant', 'temps', 'tend', 'tends', 't\'en'],
      ['sois', 'soit', 'soient', 'soie'],
      ['quelque', 'quelques'],
      ['mur', 'mûr', 'mûre', 'mure'],
      ['dis', 'dit', 'dix'],
      ['plus', 'plu'],
      ['tous', 'tout', 'toux'],
      ['si', 's\'y', 'scie']
    ];

    homophones.forEach(function([first, ...rest]) {
      const code = sonnex(first);

      assert(rest.every(word => sonnex(word) === code), [first, ...rest].join(', '));
    });
  });
});
