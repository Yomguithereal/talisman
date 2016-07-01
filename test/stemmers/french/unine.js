/**
 * Talisman stemmers/french/unine tests
 * =====================================
 *
 */
import assert from 'assert';
import unine, {minimal, complex} from '../../../src/stemmers/french/unine';

describe('unine', function() {

  describe('minimal', function() {
    it('default export should be the minimal stemmer.', function() {
      assert(unine('hiboux'), minimal('hiboux'));
    });

    it('should correctly stem the given words.', function() {
      const tests = [
        ['mot', 'mot'],
        ['chevaux', 'cheval'],
        ['hiboux', 'hibou'],
        ['chantés', 'chant'],
        ['chanter', 'chant'],
        ['chante', 'chant'],
        ['baronnes', 'baron'],
        ['barons', 'baron'],
        ['baron', 'baron']
      ];

      tests.forEach(function([word, stem]) {
        assert.strictEqual(unine(word), stem);
      });
    });
  });

  describe('complex', function() {
    it('should correctly stem the given words.', function() {
      const tests = [
        ['chevaux', 'cheval'],
        ['cheval', 'cheval'],
        ['hiboux', 'hibou'],
        ['hibou', 'hibou'],
        ['chantés', 'chant'],
        ['chanter', 'chant'],
        ['chante', 'chant'],
        ['chant', 'chant'],
        ['baronnes', 'baron'],
        ['barons', 'baron'],
        ['baron', 'baron'],
        ['peaux', 'peau'],
        ['peau', 'peau'],
        ['anneaux', 'aneau'],
        ['anneau', 'aneau'],
        ['neveux', 'neveu'],
        ['neveu', 'neveu'],
        ['affreux', 'afreu'],
        ['affreuse', 'afreu'],
        ['investissement', 'investi'],
        ['investir', 'investi'],
        ['assourdissant', 'asourdi'],
        ['assourdir', 'asourdi'],
        ['pratiquement', 'pratiqu'],
        ['pratique', 'pratiqu'],
        ['administrativement', 'administratif'],
        ['administratif', 'administratif'],
        ['justificatrice', 'justifi'],
        ['justificateur', 'justifi'],
        ['justifier', 'justifi'],
        ['educatrice', 'eduqu'],
        ['eduquer', 'eduqu'],
        ['communicateur', 'comuniqu'],
        ['communiquer', 'comuniqu'],
        ['accompagnatrice', 'acompagn'],
        ['accompagnateur', 'acompagn'],
        ['administrateur', 'administr'],
        ['administrer', 'administr'],
        ['productrice', 'product'],
        ['producteur', 'product'],
        ['acheteuse', 'achet'],
        ['acheteur', 'achet'],
        ['planteur', 'plant'],
        ['plante', 'plant'],
        ['poreuse', 'poreu'],
        ['poreux', 'poreu'],
        ['plieuse', 'plieu'],
        ['bijoutière', 'bijouti'],
        ['bijoutier', 'bijouti'],
        ['caissière', 'caisi'],
        ['caissier', 'caisi'],
        ['abrasive', 'abrasif'],
        ['abrasif', 'abrasif'],
        ['folle', 'fou'],
        ['fou', 'fou'],
        ['personnelle', 'person'],
        ['personne', 'person'],
        ['complète', 'complet'],
        ['complet', 'complet'],
        ['aromatique', 'aromat'],
        ['faiblesse', 'faibl'],
        ['faible', 'faibl'],
        ['patinage', 'patin'],
        ['patin', 'patin'],
        ['sonorisation', 'sono'],
        ['ritualisation', 'rituel'],
        ['rituel', 'rituel'],
        ['nomination', 'nomin'],
        ['disposition', 'dispos'],
        ['dispose', 'dispos'],
        ['1234555', '1234555'],
        ['12333345', '12333345'],
        ['1234', '1234'],
        ['abcdeff', 'abcdef'],
        ['abcccddeef', 'abcdef'],
        ['créées', 'cre'],
        ['22hh00', '22h00'],
      ];

      tests.forEach(function([word, stem]) {
        assert.strictEqual(complex(word), stem);
      });
    });
  });
});
