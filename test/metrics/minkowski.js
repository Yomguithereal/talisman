/**
 * Talisman metrics/distance/minkowski tests
 * ==========================================
 *
 */
import assert from 'assert';
import minkowski from '../../src/metrics/minkowski';
import euclidean from '../../src/metrics/euclidean';
import manhattan from '../../src/metrics/manhattan';

describe('minkowski', function() {

  it('should correctly compute the Minkowski distance.', function() {
    const vectors = [[1, 3], [4, 5]];

    assert.strictEqual(minkowski(1, ...vectors), manhattan(...vectors));
    assert.strictEqual(minkowski(2, ...vectors), euclidean(...vectors));
  });
});
