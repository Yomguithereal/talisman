/**
 * Talisman metrics/damerau-levenshtein tests
 * ===========================================
 *
 */
import assert from 'assert';
import damerauLevenshtein from '../../src/metrics/damerau-levenshtein';

describe('damerau-levenshtein', function() {
  const tests = [
    [['a', 'b', 'c'], ['a', 'b', 'c'], 0],
    ['abc', 'cba', 2],
    ['one', 'once upon', 6],
    ['ahk', 'ahk', 0],
    ['he', 'ben', 2],
    ['this', 'tihs', 1],
    ['toralf', 'titan', 4],
    ['google', 'goggle', 1],
    ['NawKtYu', '', 7],
    ['', 'NawKtYu', 7],
    ['NawKtYu', 'NawKtYu', 0],
    ['NawKtYu', 'tKNwYua', 6],
    ['Jdc', 'dJc', 1],
    ['sUzSOwx', 'zsSxUwO', 6],
    ['eOqoHAta', 'tAeaqHoO', 7],
    ['glSbo', 'lgSbo', 1],
    ['NJtQKcJE', 'cJEtQKJN', 4],
    ['GitIEVs', 'EGItVis', 5],
    ['MiWK', 'WKiM', 4],
  ];

  it('should correctly compute the Damerau-Levenshtein distance.', function() {
    tests.forEach(function([a, b, distance]) {
      assert.strictEqual(damerauLevenshtein(a, b), distance, `${a} <=> ${b}`);
    });
  });
});
