/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
describe('helpers', function() {
  require('./helpers/index.js');
  require('./helpers/matrices.js');
  require('./helpers/vectors.js');
});

describe('classification', function() {
  require('./classification/naive-bayes.js');
  require('./classification/perceptron.js');
});

describe('clustering', function() {
  require('./clustering/k-means.js');
});

describe('metrics', function() {
  require('./metrics/canberra.js');
  require('./metrics/chebyshev.js');
  require('./metrics/cosine.js');
  require('./metrics/damerau-levenshtein.js');
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
  require('./phonetics/daitch-mokotoff.js');
  require('./phonetics/double-metaphone.js');
  require('./phonetics/metaphone.js');
  require('./phonetics/mra.js');
  require('./phonetics/nysiis.js');
  require('./phonetics/soundex.js');

  describe('french', function() {
    require('./phonetics/french/phonetic.js');
    require('./phonetics/french/phonex.js');
    require('./phonetics/french/sonnex.js');
    require('./phonetics/french/soundex.js');
    require('./phonetics/french/soundex2.js');
  });

  describe('german', function() {
    require('./phonetics/german/cologne.js');
    require('./phonetics/german/phonem.js')
  });
});

describe('stats', function() {
  require('./stats/descriptive');
  require('./stats/frequencies.js');
  require('./stats/inferential.js');
  require('./stats/ngrams.js');
  require('./stats/tfidf.js');
});

describe('stemmers', function() {
  require('./stemmers/lancaster.js');
  require('./stemmers/lovins.js');
  require('./stemmers/porter.js');

  describe('french', function() {
    require('./stemmers/french/porter.js');
  });

  describe('latin', function() {
    require('./stemmers/latin/schinke.js');
  });
});

describe('tokenizers', function() {
  describe('sentences', function() {
    require('./tokenizers/sentences/naive.js');
    require('./tokenizers/sentences/punkt.js');
  });

  describe('words', function() {
    require('./tokenizers/words/treebank.js');
  });
});
