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
  require('./helpers/vectors.js');
});

describe('hash', function() {

  require('./hash/crc32.js');
  require('./hash/minhash.js');
});

describe('inflectors', function() {

  describe('spanish', function() {
    require('./inflectors/spanish/noun.js');
  });
});

describe('keyers', function() {

  require('./keyers/html-text.js');
  require('./keyers/name-power-set.js');
  require('./keyers/name-sig.js');
  require('./keyers/normalize.js');
  require('./keyers/omission.js');
  require('./keyers/skeleton.js');
});

describe('keyword-extraction', function() {
  require('./keyword-extraction/rake.js');
});

describe('clustering', function() {
  require('./clustering/abstract.js');
  require('./clustering/helpers.js');

  require('./clustering/blocking.js');
  require('./clustering/canopy.js');
  require('./clustering/key-collision.js');
  require('./clustering/leader.js');
  require('./clustering/naive.js');
  require('./clustering/nn-descent.js');
  require('./clustering/sorted-neighborhood.js');
  require('./clustering/vp-tree.js');
});

describe('metrics', function() {

  require('./metrics/bag.js');
  require('./metrics/canberra.js');
  require('./metrics/chebyshev.js');
  require('./metrics/cosine.js');
  require('./metrics/damerau-levenshtein.js');
  require('./metrics/dice.js');
  require('./metrics/euclidean.js');
  require('./metrics/eudex.js');
  require('./metrics/guth.js');
  require('./metrics/hamming.js');
  require('./metrics/identity.js');
  require('./metrics/jaccard.js');
  require('./metrics/jaro-winkler.js');
  require('./metrics/lcs.js');
  require('./metrics/length.js');
  require('./metrics/levenshtein.js');
  require('./metrics/lig.js');
  require('./metrics/manhattan.js');
  require('./metrics/minkowski.js');
  require('./metrics/mlipns.js');
  require('./metrics/monge-elkan.js');
  require('./metrics/mra.js');
  require('./metrics/overlap.js');
  require('./metrics/prefix.js');
  require('./metrics/ratcliff-obershelp.js');
  require('./metrics/sift4.js');
  require('./metrics/smith-waterman.js');
  require('./metrics/suffix.js');
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
  require('./phonetics/sound-d.js');
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

describe('tokenizers', function() {

  require('./tokenizers/fingerprint.js');

  describe('hyphenation', function() {
    require('./tokenizers/hyphenation/liang.js');
  });

  describe('lines', function() {
    require('./tokenizers/lines/naive.js');
  });

  require('./tokenizers/ngrams.js');

  describe('paragraphs', function() {
    require('./tokenizers/paragraphs/naive.js');
  });

  describe('sentences', function() {
    require('./tokenizers/sentences/naive.js');
    require('./tokenizers/sentences/punkt.js');
  });

  require('./tokenizers/skipgrams.js');

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
