/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
require('./helpers.js');

describe('clustering', function() {
  require('./clustering/k-means.js');
});

describe('metrics', function() {
  require('./metrics/cosine.js');
  require('./metrics/dice.js');
  require('./metrics/euclidean.js');
  require('./metrics/hamming.js');
  require('./metrics/jaccard.js');
  require('./metrics/jaro-winkler.js');
  require('./metrics/levenshtein.js');
  require('./metrics/manhattan.js');
  require('./metrics/mra.js');
  require('./metrics/overlap.js');
});

describe('phonetics', function() {
  require('./phonetics/caverphone.js');
  require('./phonetics/cologne.js');
  require('./phonetics/doubleMetaphone.js');
  require('./phonetics/metaphone.js');
  require('./phonetics/mra.js');
  require('./phonetics/nysiis.js');
  require('./phonetics/soundex.js');
});

describe('stats', function() {
  require('./stats/frequencies.js');
  require('./stats/mean.js');
  require('./stats/ngrams.js');
  require('./stats/tfidf.js');
});

describe('stemmers', function() {
  require('./stemmers/lancaster.js');
  require('./stemmers/porter.js');
});

describe('tokenizers', function() {
  describe('sentences', function() {
    require('./tokenizers/sentences/naive.js');
  });

  describe('words', function() {
    require('./tokenizers/words/treebank.js');
  });
});
