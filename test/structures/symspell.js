/* eslint no-new: 0 */
/**
 * Talisman structure/symspell tests
 * ==================================
 */
import assert from 'assert';
import SymSpell from '../../src/structures/symspell';
import damerauLevenshtein from '../../src/metrics/distance/damerau-levenshtein';

const DATA = [
  'Hello',
  'Mello',
  'John',
  'Book',
  'Back',
  'World',
  'Hello',
  'Jello',
  'Hell',
  'Trello'
];

describe('symspell', function() {

  it('should throw when invalid options are provided.', function() {

    assert.throws(function() {
      new SymSpell({maxDistance: -34});
    }, /maxDistance/);

    assert.throws(function() {
      new SymSpell({verbosity: 4});
    }, /verbosity/);
  });

  it('should correctly index & perform basic search queries.', function() {
    const index = new SymSpell();
    DATA.forEach(word => index.add(word));

    assert.deepEqual(
      index.search('shawarma'),
      []
    );

    assert.deepEqual(
      index.search('ello'),
      [
        {term: 'Hello', distance: 1, count: 2},
        {term: 'Mello', distance: 1, count: 1},
        {term: 'Jello', distance: 1, count: 1},
        {term: 'Trello', distance: 2, count: 1},
        {term: 'Hell', distance: 2, count: 1}
      ]
    );

    index.search('ello').every(suggestion => {
      assert.strictEqual(
        suggestion.distance,
        damerauLevenshtein(suggestion.term, 'ello')
      );
    });
  });

  it('should be possible to increase the maximum edit distance.', function() {
    const index = new SymSpell({maxDistance: 4});
    DATA.forEach(word => index.add(word));

    assert.deepEqual(
      index.search('ello'),
      [
        {term: 'Hello', distance: 1, count: 2},
        {term: 'Mello', distance: 1, count: 1},
        {term: 'Jello', distance: 1, count: 1},
        {term: 'Trello', distance: 2, count: 1},
        {term: 'Hell', distance: 2, count: 1},
        {term: 'John', distance: 4, count: 1},
        {term: 'Book', distance: 4, count: 1},
        {term: 'World', distance: 4, count: 1}
      ]
    );
  });

  it('should possible to use different verbosity settings.', function() {
    const lazyIndex = new SymSpell({verbosity: 0}),
          lessLazyIndex = new SymSpell({verbosity: 1});

    DATA.forEach(word => {
      lazyIndex.add(word);
      lessLazyIndex.add(word);
    });

    assert.deepEqual(
      lazyIndex.search('ello'),
      [{term: 'Hello', distance: 1, count: 2}]
    );

    assert.deepEqual(
      lessLazyIndex.search('ello'),
      [
        {term: 'Hello', distance: 1, count: 2},
        {term: 'Mello', distance: 1, count: 1},
        {term: 'Jello', distance: 1, count: 1}
      ]
    );
  });
});
