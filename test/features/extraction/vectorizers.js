/* eslint no-sparse-arrays: 0 */
/* eslint array-bracket-spacing: 0 */
/**
 * Talisman features/extraction/vectorizers tests
 * ===============================================
 *
 */
import assert from 'assert';
import {
  collectionVectorizer,
  bagOfWordsVectorizer,
  countVectorizer,
  tfidfVectorizer
} from '../../../src/features/extraction/vectorizers';
import words from 'lodash/words';

describe('vectorizers', function() {

  describe('#.collectionVectorizer', function() {

    it('should properly vectorize the given collection.', function() {
      const collection = [
        {name: 'John', age: 45},
        {name: 'Jack', age: 24},
        {name: 'John', age: 76}
      ];

      const result = collectionVectorizer(null, collection);

      assert.deepEqual(result, {
        headers: ['name=John', 'name=Jack', 'age'],
        meta: {
          'name=John': {
            index: 0,
            quantitative: false
          },
          'name=Jack': {
            index: 1,
            quantitative: false
          },
          'age': {
            index: 2,
            quantitative: true
          }
        },
        features: [
          [1, , 45],
          [, 1, 24],
          [1, , 76]
        ]
      });
    });

    it('should be possible to change the header separator.', function() {
      const collection = [
        {name: 'John', age: 45},
        {name: 'Jack', age: 24},
        {name: 'John', age: 76}
      ];

      const result = collectionVectorizer({separator: '§'}, collection);

      assert.deepEqual(result.headers, ['name§John', 'name§Jack', 'age']);
    });

    it('should be possible to output a different type of array.', function() {
      const collection = [
        {name: 'John', age: 45},
        {name: 'Jack', age: 24},
        {name: 'John', age: 76}
      ];

      const result = collectionVectorizer({type: Int16Array}, collection);

      assert(result.features.every(row => row instanceof Int16Array));
    });
  });

  describe('#.bagOfWordsVectorizer', function() {
    it('should properly vectorize the given documents.', function() {
      const documents = [
        'the cat eats the mouse',
        'the mouse likes cheese'
      ].map(words);

      const result = bagOfWordsVectorizer(null, documents);

      assert.deepEqual(result, {
        headers: ['the', 'cat', 'eats', 'mouse', 'likes', 'cheese'],
        features: [
          [1, 1, 1, 1, , ],
          [1, , , 1, 1, 1]
        ]
      });
    });
  });

  describe('#.countVectorizer', function() {
    it('should properly vectorize the given documents.', function() {
      const documents = [
        'the the the is not a correct sentence',
        'the the is is not correct'
      ].map(words);

      const result = countVectorizer(null, documents);

      assert.deepEqual(result, {
        headers: ['the', 'is', 'not', 'a', 'correct', 'sentence'],
        features: [
          [3, 1, 1, 1, 1, 1],
          [2, 2, 1, , 1, ]
        ]
      });
    });
  });

  describe('#.tfidfVectorizer', function() {
    it('should properly vectorize the given documents.', function() {
      const documents = [
        'the cat eats the mouse',
        'the mouse likes cheese',
        'the child eats cheese'
      ].map(words);

      const idfs = {
        the: Math.log(3 / 4),
        cat: Math.log(3 / 1),
        eats: Math.log(3 / 2),
        mouse: Math.log(3 / 2),
        likes: Math.log(3 / 1),
        cheese: Math.log(3 / 2),
        child: Math.log(3 / 1)
      };

      const result = tfidfVectorizer(null, documents);

      assert.deepEqual(result, {
        headers: ['the', 'cat', 'eats', 'mouse', 'likes', 'cheese', 'child'],
        features: [
          [2 * idfs.the, idfs.cat, idfs.eats, idfs.mouse, , , ],
          [idfs.the, , , idfs.mouse, idfs.likes, idfs.cheese, ],
          [idfs.the, , idfs.eats, , , idfs.cheese, idfs.child]
        ]
      });
    });
  });
});
