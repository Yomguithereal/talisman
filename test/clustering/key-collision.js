/**
 * Talisman clustering/key-collision tests
 * ========================================
 *
 */
import assert from 'assert';
import keyCollision from '../../src/clustering/key-collision';
import fingerprint from '../../src/keyers/fingerprint';

const DATA = [
  'University of North Carolina',
  'North carolinA, university of',
  'university of north Carolina.',
  'John Smith',
  'Smith. John'
];

describe('key-collision', function() {

  it('should cluster as expected.', function() {
    const clusters = keyCollision({keyer: fingerprint}, DATA);

    assert.deepEqual(clusters, [
      [
        'University of North Carolina',
        'North carolinA, university of',
        'university of north Carolina.'
      ],
      [
        'John Smith',
        'Smith. John'
      ]
    ]);
  });
});
