/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
import util from 'util';

// Infinite depth for logs
if (util.inspect.defaultOptions)
  util.inspect.defaultOptions.depth = null;

describe('helpers', function() {
  require('./helpers/index.js');
  require('./helpers/matrices.js');
  require('./helpers/random.js');
  require('./helpers/vectors.js');
});

describe('hash', function() {

  require('./hash/crc32.js');
  require('./hash/minhash.js');
});

describe('features', function() {

  describe('extraction', function() {
    require('./features/extraction/vectorizers.js');
  });
});

describe('inflectors', function() {

  describe('spanish', function() {
    require('./inflectors/spanish/noun.js');
  });
});

describe('keyers', function() {

  require('./keyers/omission.js');
  require('./keyers/skeleton.js');
});

describe('keyword-extraction', function() {
  require('./keyword-extraction/rake.js');
});

describe('classification', function() {
  require('./classification/naive-bayes.js');
  require('./classification/perceptron.js');
});

describe('clustering', function() {
  require('./clustering/k-means.js');

  describe('record-linkage', function() {
    require('./clustering/record-linkage/abstract.js');
    require('./clustering/record-linkage/helpers.js');

    require('./clustering/record-linkage/blocking.js');
    require('./clustering/record-linkage/canopy.js');
    require('./clustering/record-linkage/key-collision.js');
    require('./clustering/record-linkage/naive.js');
    require('./clustering/record-linkage/nn-descent.js');
    require('./clustering/record-linkage/sorted-neighborhood.js');
    require('./clustering/record-linkage/vp-tree.js');
  });
});

describe('metrics', function() {

  describe('distance', function() {
    require('./metrics/distance/bag.js');
    require('./metrics/distance/canberra.js');
    require('./metrics/distance/chebyshev.js');
    require('./metrics/distance/cosine.js');
    require('./metrics/distance/damerau-levenshtein.js');
    require('./metrics/distance/dice.js');
    require('./metrics/distance/euclidean.js');
    require('./metrics/distance/eudex.js');
    require('./metrics/distance/hamming.js');
    require('./metrics/distance/identity.js');
    require('./metrics/distance/jaccard.js');
    require('./metrics/distance/jaro-winkler.js');
    require('./metrics/distance/lcs.js');
    require('./metrics/distance/length.js');
    require('./metrics/distance/levenshtein.js');
    require('./metrics/distance/manhattan.js');
    require('./metrics/distance/minkowski.js');
    require('./metrics/distance/mlipns.js');
    require('./metrics/distance/monge-elkan.js');
    require('./metrics/distance/mra.js');
    require('./metrics/distance/overlap.js');
    require('./metrics/distance/prefix.js');
    require('./metrics/distance/ratcliff-obershelp.js');
    require('./metrics/distance/sift4.js');
    require('./metrics/distance/smith-waterman.js');
    require('./metrics/distance/suffix.js');
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
  require('./phonetics/onca.js');
  require('./phonetics/phonex.js');
  require('./phonetics/roger-root.js');
  require('./phonetics/soundex.js');
  require('./phonetics/statcan.js');

  describe('french', function() {
    require('./phonetics/french/fonem.js');
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
});

require('./regexp/index.js');

describe('stats', function() {
  require('./stats/descriptive');
  require('./stats/frequencies.js');
  require('./stats/inferential.js');
});

describe('stemmers', function() {
  require('./stemmers/lancaster.js');
  require('./stemmers/lovins.js');
  require('./stemmers/porter.js');
  require('./stemmers/s-stemmer.js');
  require('./stemmers/uea-lite.js');

  describe('french', function() {
    require('./stemmers/french/carry.js');
    require('./stemmers/french/eda.js');
    require('./stemmers/french/unine.js');
    require('./stemmers/french/porter.js');
  });

  describe('german', function() {
    require('./stemmers/german/caumanns.js');
  });

  describe('latin', function() {
    require('./stemmers/latin/schinke.js');
  });

  describe('spanish', function() {
    require('./stemmers/spanish/unine.js');
  });
});

describe('tag', function() {
  require('./tag/averaged-perceptron.js');
});

describe('tokenizers', function() {

  require('./tokenizers/fingerprint.js');

  describe('hyphenation', function() {
    require('./tokenizers/hyphenation/liang.js');
  });

  describe('lines', function() {
    require('./tokenizers/lines/naive.js');
  });

  require('./tokenizers/ngrams');

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
