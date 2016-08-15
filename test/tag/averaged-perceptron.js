/**
 * Talisman parsers/brown tests
 * =============================
 */
import {assert} from 'chai';
import seedrandom from 'seedrandom';
import conll from '../../src/parsers/conll';
import AveragedPercerptronTagger, {
  analyzeSentences,
  extractFeatures,
  normalize,
  predict
} from '../../src/tag/averaged-perceptron';
import {loadResource} from '../helpers';

const rng = seedrandom('shawarma');

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

const FEATURES = {
  'bias': 1,
  'i suffix ord': 1,
  'i pref1 m': 1,
  'i-1 tag CD': 1,
  'i-2 tag CD': 1,
  'i tag+i-2 tag CD CD': 1,
  'i word my-word': 1,
  'i-1 tag+i word CD my-word': 1,
  'i-1 word two': 1,
  'i-1 suffix two': 1,
  'i-2 word one': 1,
  'i+1 word three': 1,
  'i+1 suffix ree': 1,
  'i+2 word four': 1
};

describe('averaged-perceptron', function() {

  describe('functions', function() {

    it('word should be correctly normalized.', function() {
      const tests = [
        ['-Hello', '-hello'],
        ['what-else', '!HYPHEN'],
        ['1980', '!YEAR'],
        ['15', '!DIGITS'],
        ['Grand', 'grand']
      ];

      tests.forEach(function([word, normalized]) {
        assert.strictEqual(normalize(word), normalized);
      });
    });
  });

  describe('training', function() {

    it('should initialize tags & classes correctly.', function() {
      const {classes, tags} = analyzeSentences(sentences);

      assert.sameMembers(Array.from(classes), CLASSES);
      assert.deepEqual(tags, TAGS);
    });

    it('should properly extract features.', function() {
      const sentence = ['one', 'two', 'my-word', 'three', 'four'];

      const features = extractFeatures(
        0,
        'my-word',
        sentence,
        'CD',
        'CD'
      );

      assert.deepEqual(features, FEATURES);
    });
  });
});
