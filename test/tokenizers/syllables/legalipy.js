/**
 * Talisman tokenizers/syllables/legalipy tests
 * =============================================
 *
 */
import {assert} from 'chai';
import words from 'lodash/words';
import LegalipyTokenizer from '../../../src/tokenizers/syllables/legalipy';

const frenchText = 'La présence du cheval dans la culture bretonne se manifeste par le fort attachement historique des Bretons à cet animal et par des traditions religieuses ou profanes, parfois vues de l\'extérieur comme un élément du folklore local. Probablement vénéré dès l\'Antiquité, le cheval est l\'objet de rites, de sorcellerie, de proverbes, de nombreuses superstitions faisant intervenir d\'autres animaux, et même de pardons, cérémonies spécifiquement bretonnes, issues d\'anciens rites de fécondité et dans lesquelles l\'eau revêt une symbolique importante. Celui de la Saint-Éloi attire des pèlerins depuis toute la France. Symboliquement lié à la mer via des légendes comme celle de Morvarc\'h, et à la mort avec l\'Ankou ou encore le cheval Mallet, le cheval est aussi présent dans les contes, les chansons, nombre de récits traditionnels, et dans l\'armorial de la Bretagne. Ces traditions ont été nettement folklorisées au cours du xxe siècle. Pierre-Jakez Hélias a popularisé les traditions équestres du pays bigouden dans son roman Le Cheval d\'orgueil, adapté au cinéma.',
      englishText = 'History is the discovery, collection, organization, analysis, and presentation of information about past events. History can also mean a continuous, typically chronological record of important or public events or of a particular trend or institution. Scholars who write about history are called historians. It is a field of knowledge which uses a narrative to examine and analyse the sequence of events, and it sometimes attempts to objectively investigate the patterns of cause and effect that determine events. Historians debate the nature of history and its usefulness. This includes discussing the study of the discipline as an end in itself and as a way of providing "perspective" on the problems of the present. The stories common to a particular culture but not supported by external sources (such as the legends surrounding King Arthur) are usually classified as cultural heritage rather than as the "disinterested investigation" needed by the discipline of history. Events of the past prior to written record are considered prehistory.';

const frenchWords = words(frenchText),
      englishWords = words(englishText);

describe('legalipy', function() {
  describe('training', function() {

    it('should properly be trained.', function() {
      const tokenizer = new LegalipyTokenizer();

      tokenizer.train(englishWords);
      tokenizer.finalize();

      assert.sameMembers(Array.from(tokenizer.onsets), [
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
        'm',
        'tr',
        'chr',
        'kn',
        'pr',
        'd',
        'wh',
        'c'
      ]);

      const frenchTokenizer = new LegalipyTokenizer();

      frenchTokenizer.train(frenchWords);
      frenchTokenizer.finalize();

      assert.sameMembers(Array.from(frenchTokenizer.onsets), [
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
      ]);
    });
  });
});
