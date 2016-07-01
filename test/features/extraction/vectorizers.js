/* eslint no-sparse-arrays: 0 */
/**
 * Talisman features/extraction/vectorizers tests
 * ===============================================
 *
 */
import assert from 'assert';
import {
  collectionVectorizer
} from '../../../src/features/extraction/vectorizers';

describe('vectorizers', function() {

  describe('#.collectionVectorizer', function() {

    it('should properly vectorize the given collection.', function() {
      const collection = [
        {name: 'John', age: 45},
        {name: 'Jack', age: 24},
        {name: 'John', age: 76}
      ];

      const features = collectionVectorizer(null, collection);

      assert.deepEqual(features, {
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
  });

  // Test both options
});
