/**
 * Talisman parsers/brown tests
 * =============================
 */
import {assert} from 'chai';
import conll from '../../src/parsers/conll';
import AveragedPercerptronTagger from '../../src/tag/averaged-perceptron';
import {loadResource} from '../helpers';

const excerpt = loadResource('conll2000/excerpt.txt'),
      sentences = conll(excerpt);

const CLASSES = [
  'NN',
  'IN',
  'DT',
  'VBZ',
  'RB',
  'VBN',
  'TO',
  'VB',
  'JJ',
  'NNS',
  'NNP',
  ',',
  'CC',
  'POS',
  '.',
  'VBP',
  'VBG',
  'PRP$',
  'CD',
  '``',
  '\'\'',
  'VBD',
  'EX',
  'MD',
  '#',
  '(',
  '$',
  ')',
  'NNPS',
  'PRP',
  'JJS',
  'WP',
  'RBR',
  'JJR',
  'WDT',
  'WRB',
  'RBS',
  'PDT',
  'RP',
  ':'
];

const TAGS = {
  'in': 'IN',
  'the': 'DT',
  'is': 'VBZ',
  'to': 'TO',
  'for': 'IN',
  ',': ',',
  'a': 'DT',
  'from': 'IN',
  'and': 'CC',
  '.': '.',
  'of': 'IN',
  'by': 'IN',
  'rates': 'NNS',
  '%': 'NN',
  'their': 'PRP$',
  '``': '``',
  'The': 'DT',
  'are': 'VBP',
  'on': 'IN',
  '\'\'': '\'\'',
  'said': 'VBD',
  'at': 'IN',
  'be': 'VB',
  '$': '$',
  'Mr.': 'NNP',
  'was': 'VBD',
  'it': 'PRP',
  'U.S.': 'NNP'
};

describe('averaged-perceptron', function() {

  describe('training', function() {

    it('should initialize tags & classes correctly.', function() {
      const tagger = new AveragedPercerptronTagger();

      tagger.train(sentences);
      assert.sameMembers(Array.from(tagger.classes), CLASSES);
      assert.deepEqual(tagger.tags, TAGS);
    });
  });
});
