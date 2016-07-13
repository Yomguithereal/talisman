/**
 * Talisman tokenizers/syllables/legalipy tests
 * =============================================
 *
 */
import {assert} from 'chai';
import words from 'lodash/words';
import defaultTokenizer, {
  LegalipyTokenizer
} from '../../../src/tokenizers/syllables/legalipy';

const frenchText = 'La présence du cheval dans la culture bretonne se manifeste par le fort attachement historique des Bretons à cet animal et par des traditions religieuses ou profanes, parfois vues de l\'extérieur comme un élément du folklore local. Probablement vénéré dès l\'Antiquité, le cheval est l\'objet de rites, de sorcellerie, de proverbes, de nombreuses superstitions faisant intervenir d\'autres animaux, et même de pardons, cérémonies spécifiquement bretonnes, issues d\'anciens rites de fécondité et dans lesquelles l\'eau revêt une symbolique importante. Celui de la Saint-Éloi attire des pèlerins depuis toute la France. Symboliquement lié à la mer via des légendes comme celle de Morvarc\'h, et à la mort avec l\'Ankou ou encore le cheval Mallet, le cheval est aussi présent dans les contes, les chansons, nombre de récits traditionnels, et dans l\'armorial de la Bretagne. Ces traditions ont été nettement folklorisées au cours du xxe siècle. Pierre-Jakez Hélias a popularisé les traditions équestres du pays bigouden dans son roman Le Cheval d\'orgueil, adapté au cinéma.',
      englishText = 'History is the discovery, collection, organization, analysis, and presentation of information about past events. History can also mean a continuous, typically chronological record of important or public events or of a particular trend or institution. Scholars who write about history are called historians. It is a field of knowledge which uses a narrative to examine and analyse the sequence of events, and it sometimes attempts to objectively investigate the patterns of cause and effect that determine events. Historians debate the nature of history and its usefulness. This includes discussing the study of the discipline as an end in itself and as a way of providing "perspective" on the problems of the present. The stories common to a particular culture but not supported by external sources (such as the legends surrounding King Arthur) are usually classified as cultural heritage rather than as the "disinterested investigation" needed by the discipline of history. Events of the past prior to written record are considered prehistory.';

const frenchWords = words(frenchText),
      englishWords = words(englishText);

const frenchOnsets = [
        'pr',
        'c',
        'p',
        'tr',
        'r',
        'sp',
        'm',
        'n',
        'd',
        'v',
        'b',
        'ch',
        'f',
        'xx',
        'fr',
        's',
        'l',
        'h',
        't',
        'br',
        'j'
      ],
      englishOnsets = [
        's',
        'st',
        'wr',
        'b',
        'p',
        'k',
        'cl',
        'n',
        'r',
        'w',
        'l',
        'th',
        't',
        'h',
        'f',
        'sch',
        'ch',
        'm',
        'tr',
        'chr',
        'hr',
        'kn',
        'pr',
        'd',
        'wh',
        'c'
      ];

describe('legalipy', function() {
  const englishTokenizer = new LegalipyTokenizer(),
        frenchTokenizer = new LegalipyTokenizer();

  englishTokenizer.train(englishWords);
  frenchTokenizer.train(frenchWords);

  englishTokenizer.finalize();
  frenchTokenizer.finalize();

  describe('training', function() {

    it('should properly be trained.', function() {

      assert.sameMembers(Array.from(englishTokenizer.onsets), englishOnsets);
      assert.sameMembers(Array.from(frenchTokenizer.onsets), frenchOnsets);
    });
  });

  describe('tokenization', function() {

    it('should properly tokenize.', function() {
      const englishTests = [
        ['reciprocity', ['re', 'ci', 'pro', 'ci', 'ty']],
        ['history', ['hi', 'sto', 'ry']],
        ['presentation', ['pre', 'sen', 'ta', 'tion']],
        ['chronological', ['chro', 'no', 'log', 'i', 'cal']],
        ['analysis', ['a', 'na', 'ly', 'sis']]
      ];

      const frenchTests = [
        ['cheval', ['che', 'val']],
        ['traditions', ['tra', 'di', 'tions']]
      ];

      englishTests.forEach(function([word, syllables]) {
        assert.deepEqual(englishTokenizer.tokenize(word), syllables, word);
      });

      frenchTests.forEach(function([word, syllables]) {
        assert.deepEqual(frenchTokenizer.tokenize(word), syllables, word);
      });
    });

    it('default tokenization should also work.', function() {
      const tokens = defaultTokenizer(englishWords);

      assert.deepEqual(tokens[0], ['Hi', 'sto', 'ry']);
    });
  });

  describe('import/export', function() {
    it('should be possible to export the onsets.', function() {
      const model = englishTokenizer.export();

      assert.deepEqual(Object.keys(model), ['onsets']);
      assert.sameMembers(model.onsets, englishOnsets);
    });

    it('should be possible to import an existing model.', function() {
      const tokenizer = new LegalipyTokenizer();
      tokenizer.import({onsets: englishOnsets});

      assert.deepEqual(tokenizer.tokenize('reciprocity'), ['re', 'ci', 'pro', 'ci', 'ty']);
    });
  });
});
