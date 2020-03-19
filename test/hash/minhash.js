/**
 * Talisman helpers/minhash tests
 * ===============================
 *
 */
import assert from 'assert';
import createMinHash from '../../src/hash/minhash';
import {similarity, distance} from '../../src/metrics/minhash';
import seedrandom from 'seedrandom';

describe('minhash', function() {

  it('should produce the correct signature.', function() {
    const rng = seedrandom('shawarma'),
          minhash = createMinHash({rng, hashes: 6});

    assert.deepEqual(Array.from(minhash('this is a string')), [
      75288857,
      241855118,
      149375312,
      5249094,
      339091736,
      369835310
    ]);

    assert.deepEqual(Array.from(minhash(['this', 'is', 'a', 'string'])), [
      -2497302731,
      -2872246020,
      -3540234138,
      -4187033817,
      -1454124627,
      -2422446200
    ]);
  });

  it('should be possible to compute similarity between MinHash signatures.', function() {
    const rng = seedrandom('shawarma'),
          minhash = createMinHash({rng, hashes: 512});

    const tests = [
      ['abc', '', 0],
      ['', 'abc', 0],
      ['', '', 1],
      ['abc', 'abc', 1],
      ['abc', 'xyz', 0],
      ['night', 'nacht', 0.421875],
      ['context', 'contact', 0.55859375],
      [['mouse', 'eats', 'cheese'], ['cat', 'eats', 'mouse'], 0.48828125],
      ['ht', 'nacht', 0.376953125]
    ];

    tests.forEach(function([a, b, j]) {
      const minA = minhash(a),
            minB = minhash(b);

      const s = similarity(minA, minB),
            d = distance(minA, minB);

      assert.strictEqual(s, j, `${a}/${b}`);
      assert.strictEqual(d, 1 - j, `${a}/${b}`);
    });
  });
});
