/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
require('./helpers.js');

describe('metrics', function() {
  require('./metrics/dice.js');
  require('./metrics/jaccard.js');
  require('./metrics/levenshtein.js');
});

describe('phonetics', function() {
  require('./phonetics/metaphone.js');
});

describe('stats', function() {
  require('./stats/frequencies.js');
  require('./stats/ngrams.js');
});

describe('tokenizers', function() {
  describe('sentences', function() {
    require('./tokenizers/sentences/naive.js');
  });

  describe('words', function() {
    require('./tokenizers/words/treebank.js');
  });
});
