/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
describe('helpers', function() {
  require('./helpers');
  require('./helpers/matrices.js');
  require('./helpers/vectors.js');
});

describe('classification', function() {
  require('./classification/naive-bayes.js');
});

describe('clustering', function() {
  require('./clustering/k-means.js');
});

describe('metrics', function() {
  require('./metrics/canberra.js');
  require('./metrics/chebyshev.js');
  require('./metrics/cosine.js');
  require('./metrics/dice.js');
  require('./metrics/euclidean.js');
  require('./metrics/hamming.js');
  require('./metrics/jaccard.js');
  require('./metrics/jaro-winkler.js');
  require('./metrics/levenshtein.js');
  require('./metrics/manhattan.js');
  require('./metrics/minkowski.js');
  require('./metrics/mra.js');
  require('./metrics/overlap.js');
});

describe('phonetics', function() {
  require('./phonetics/caverphone.js');
  require('./phonetics/cologne.js');
  require('./phonetics/daitch-mokotoff.js');
  require('./phonetics/double-metaphone.js');
  require('./phonetics/metaphone.js');
  require('./phonetics/mra.js');
  require('./phonetics/nysiis.js');
  require('./phonetics/soundex.js');
});

describe('stats', function() {
  require('./stats/descriptive');
  require('./stats/frequencies.js');
  require('./stats/ngrams.js');
  require('./stats/tfidf.js');
});

describe('stemmers', function() {
  require('./stemmers/lancaster.js');
  require('./stemmers/lovins.js');
  require('./stemmers/porter.js');
  require('./stemmers/latin/schinke.js');
});

describe('tokenizers', function() {
  describe('sentences', function() {
    require('./tokenizers/sentences/naive.js');
  });

  describe('words', function() {
    require('./tokenizers/words/treebank.js');
  });
});
