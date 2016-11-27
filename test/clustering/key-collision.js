/**
 * Talisman clustering/key-collision tests
 * ========================================
 *
 */
import assert from 'assert';
import keyCollision from '../../src/clustering/key-collision';
import fingerprint from '../../src/tokenizers/fingerprint';

const DATA = [
  'University of North Carolina',
  'North carolinA, university of',
  'university of north Carolina.',
  'John Smith',
  'Smith. John'
];

const keyer = item => fingerprint(item).join(' ');

describe('key-collision', function() {

  it('should cluster as expected.', function() {
    const clusters = keyCollision({keyer}, DATA);

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

  it('should be possible to set a minimum cluster size.', function() {
    const clusters = keyCollision({keyer, minClusterSize: 3}, DATA);

    assert.deepEqual(clusters, [
      [
        'University of North Carolina',
        'North carolinA, university of',
        'university of north Carolina.'
      ]
    ]);
  });
});
