/**
 * Talisman unit tests endpoint
 * =============================
 *
 */
require('./helpers.js');

describe('distances', function() {
  require('./distances/dice.js');
  require('./distances/jaccard.js');
});

describe('stats', function() {
  require('./stats/frequencies.js');
  require('./stats/ngrams.js');
});
