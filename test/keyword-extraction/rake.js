/**
 * Talisman keyword-extraction/rake tests
 * =======================================
 *
 */
import assert from 'assert';
import sentences from '../../src/tokenizers/sentences';
import words from '../../src/tokenizers/words/treebank';
import createExtractor from '../../src/keyword-extraction/rake';
import {loadResource} from '../helpers';

const FOX = loadResource('stopwords/fox.txt'),
      STOPWORDS = FOX.split('\n').slice(0, -1);

const DOCUMENT = `
  Compatibility of systems of linear constraints over the set of natural numbers.

  Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given. These criteria and the corresponding algorithms for constructing a minimal supporting set of solutions can be used in solving all the considered types of systems and systems of mixed types.
`.replace(/\n+/g, ' ').replace(/\s+/, ' ');

const TOKENIZED_DOCUMENT = sentences(DOCUMENT.replace(/\n+/g, ' ')).map(sentence => words(sentence.toLowerCase()));

describe('rake', function() {

  it('should throw if given an invalid list of stopwords.', function() {

    assert.throws(function() {
      createExtractor(null);
    }, /stopwords/);

    assert.throws(function() {
      createExtractor({stopwords: 34});
    }, /stopwords/);
  });

  it('should properly extract keywords.', function() {
    const rake = createExtractor({stopwords: STOPWORDS});

    rake(TOKENIZED_DOCUMENT);
  });
});
