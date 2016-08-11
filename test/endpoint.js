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

describe('features', function() {

  describe('extraction', function() {
    require('./features/extraction/vectorizers');
  });
});

describe('classification', function() {
  require('./classification/naive-bayes.js');
  require('./classification/perceptron.js');
});

describe('clustering', function() {
  require('./clustering/k-means.js');
});

describe('metrics', function() {

  describe('distance', function() {
    require('./metrics/distance/canberra.js');
    require('./metrics/distance/chebyshev.js');
    require('./metrics/distance/cosine.js');
    require('./metrics/distance/damerau-levenshtein.js');
    require('./metrics/distance/dice.js');
    require('./metrics/distance/euclidean.js');
    require('./metrics/distance/eudex.js');
    require('./metrics/distance/hamming.js');
    require('./metrics/distance/jaccard.js');
    require('./metrics/distance/jaro-winkler.js');
    require('./metrics/distance/levenshtein.js');
    require('./metrics/distance/manhattan.js');
    require('./metrics/distance/minkowski.js');
    require('./metrics/distance/mra.js');
    require('./metrics/distance/overlap.js');
  });
});

describe('parsers', function() {
  require('./parsers/brown.js');
  require('./parsers/conll.js');
});

describe('phonetics', function() {
  require('./phonetics/alpha-sis.js');
  require('./phonetics/caverphone.js');
  require('./phonetics/daitch-mokotoff.js');
  require('./phonetics/double-metaphone.js');
  require('./phonetics/eudex.js');
  require('./phonetics/fuzzy-soundex.js');
  require('./phonetics/lein.js');
  require('./phonetics/metaphone.js');
  require('./phonetics/mra.js');
  require('./phonetics/nysiis.js');
  require('./phonetics/phonex.js');
  require('./phonetics/roger-root.js');
  require('./phonetics/soundex.js');
  require('./phonetics/statcan.js');

  describe('french', function() {
    require('./phonetics/french/phonetic.js');
    require('./phonetics/french/phonex.js');
    require('./phonetics/french/sonnex.js');
    require('./phonetics/french/soundex.js');
    require('./phonetics/french/soundex2.js');
  });

  describe('german', function() {
    require('./phonetics/german/cologne.js');
    require('./phonetics/german/phonem.js');
  });

  describe('spanish', function() {
    require('./phonetics/spanish/fonetico.js');
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
  require('./stemmers/s-stemmer.js');
  require('./stemmers/uea-lite.js');

  describe('french', function() {
    require('./stemmers/french/unine.js');
    require('./stemmers/french/porter.js');
  });

  describe('german', function() {
    require('./stemmers/german/caumanns.js');
  });

  describe('latin', function() {
    require('./stemmers/latin/schinke.js');
  });
});

describe('tag', function() {
  require('./tag/averaged-perceptron.js');
});

describe('tokenizers', function() {
  describe('hyphenation', function() {
    require('./tokenizers/hyphenation/liang.js');
  });

  describe('lines', function() {
    require('./tokenizers/lines/naive.js');
  });

  describe('paragraphs', function() {
    require('./tokenizers/paragraphs/naive.js');
  });

  describe('sentences', function() {
    require('./tokenizers/sentences/naive.js');
    require('./tokenizers/sentences/punkt.js');
  });

  describe('syllables', function() {
    require('./tokenizers/syllables/legalipy.js');
    require('./tokenizers/syllables/sonoripy.js');
  });

  describe('tweets', function() {
    require('./tokenizers/tweets/casual.js');
  });

  describe('words', function() {
    require('./tokenizers/words/treebank.js');
  });
});
