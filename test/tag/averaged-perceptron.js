/**
 * Talisman parsers/brown tests
 * =============================
 */
import assert from 'assert';
import AveragedPercerptronTagger from '../../src/tag/averaged-perceptron';

const sentences = [
  [['today', 'NN'], ['is', 'PRP'], ['a', 'PRP'], ['beautiful', 'JJ'], ['day', 'NN']]
];

describe('averaged-perceptron', function() {

  describe('training', function() {

    it('should initialize tags & classes correctly.', function() {
      const tagger = new AveragedPercerptronTagger();

      tagger.train(sentences);

      assert.deepEqual(tagger.classes, new Set(['JJ', 'PRP', 'NN']));
    });
  });
});
