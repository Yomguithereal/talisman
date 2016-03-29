/**
 * Talisman stats/tfidf tests
 * ===========================
 *
 */
import {assert} from 'chai';
import {TfIdf} from '../../src/stats/tfidf';

describe('tfidf', function() {

  const corpus = new TfIdf();

  corpus
    .addDocument('cat', 'It was a lovely evening, even if the cat spilled all its milk on the floor.')
    .addDocument('romeo', 'Alas, Romeo. You know perfectly well I cannot love you any more.')
    .addDocument('love', 'love is nothing but one may expect from the shallow grave of any cat.')
    .addDocument('unrelated', 'Am I really that unrelated?');

  it('should be possible to get the frequencies of a term.', function() {
    assert.strictEqual(corpus.tf('evening', 'cat'), 0.0625);
    assert.deepEqual(corpus.tf('cat'), {
      cat: 0.0625,
      romeo: 0,
      love: 1 / 14,
      unrelated: 0
    });
  });

  it('should be possible to get the inverse document frequencies of a term.', function() {
    assert.strictEqual(corpus.idf('cat'), Math.log(4 / 2));
    assert.strictEqual(corpus.idf('absent'), 0);
  });

  it('should be possible to compute the TF-IDF score for a given term.', function() {
    assert.approximately(corpus.tfidf('cat', 'cat'), 0.044, 0.001);
    assert.strictEqual(corpus.tfidf('absent', 'unrelated'), 0);

    assert.deepEqual(corpus.tfidf('love'), {
      cat: 0,
      romeo: corpus.tf('love', 'romeo') * corpus.idf('love'),
      love: corpus.tf('love', 'love') * corpus.idf('love'),
      unrelated: 0
    });
  });
});
