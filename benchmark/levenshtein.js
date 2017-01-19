require('babel-core/register');

var levenshtein = require('../src/metrics/distance/levenshtein');
var leven = require('leven');

function run(fn) {
  fn('a', 'b');
  fn('ab', 'ac');
  fn('ac', 'bc');
  fn('abc', 'axc');
  fn('kitten', 'sitting');
  fn('xabxcdxxefxgx', '1ab2cd34ef5g6');
  fn('cat', 'cow');
  fn('xabxcdxxefxgx', 'abcdefg');
  fn('javawasneat', 'scalaisgreat');
  fn('example', 'samples');
  fn('sturgeon', 'urgently');
  fn('levenshtein', 'frankenstein');
  fn('distance', 'difference');
  fn('abcde', 'tes');
  fn('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文');
}

suite('Levenshtein', function() {
  bench('talisman', function() {
    run(levenshtein);
  });

  bench('leven', function() {
    run(leven);
  });
});
