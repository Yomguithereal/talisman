/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
require('./helpers.js');

describe('metrics', function() {
  require('./metrics/cosine.js');
  require('./metrics/dice.js');
  require('./metrics/euclidean.js');
  require('./metrics/hamming.js');
  require('./metrics/jaccard.js');
  require('./metrics/levenshtein.js');
  require('./metrics/manhattan.js');
});

describe('phonetics', function() {
  require('./phonetics/metaphone.js');
  require('./phonetics/soundex.js');
});

describe('stats', function() {
  require('./stats/frequencies.js');
  require('./stats/ngrams.js');
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
