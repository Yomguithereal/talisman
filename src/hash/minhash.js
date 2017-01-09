/**
 * Talisman hash/minhash
 * ======================
 *
 * JavaScript implementation of the MinHash signature.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/MinHash
 *
 * [Article]:
 * Broder, Andrei Z. (1997), "On the resemblance and containment of documents",
 * Compression and Complexity of Sequences: Proceedings, Positano,
 * Amalfitan Coast, Salerno, Italy, June 11-13, 1997.
 */
import crc32 from './crc32';
import {createRandom} from '../helpers/random';

// TODO: cleanup the type specification to be able to return an Int32Array
// rather than what I feel seems to be buggy.

// TODO: seems to be possible to use some XOR optimization to compute random
// hashes faster beyound first one.

/**
 * Constants.
 */
const MAX_I32 = Math.pow(2, 32) - 1,
      NEXT_PRIME = 4294967311;

/**
 * Defaults.
 */
const DEFAULTS = {
  hashes: 128,
  rng: Math.random
};

/**
 * Factory creating the hashing function.
 *
 * @param  {object}   options  - Options:
 * @param  {number}     hashes - Number of hashes of the produced signature.
 * @return {function}          - The hash function.
 */
export default function createMinHash(options) {
  const pi = options.hashes || DEFAULTS.hashes,
        rng = options.rng || DEFAULTS.rng,
        random = createRandom(rng);

  // Picking random coefficient & numbers
  let A = new Set(),
      B = new Set();

  while (A.size < pi)
    A.add(random(0, MAX_I32));
  while (B.size < pi)
    B.add(random(0, MAX_I32));

  A = Array.from(A);
  B = Array.from(B);

  /**
   * Function returning the MinHash signature for the given sequence. If the
   * sequence is a string, tokens will be mapped to char codes while if the
   * sequence is an array of arbitrary strings, the tokens will be mapped to
   * CRC32 hashes.
   *
   * @param  {string|array} sequence - Target sequence.
   * @return {array}                 - The MinHash signature.
   */
  return function(sequence) {
    const tokens = {},
          isString = typeof sequence === 'string';

    // Keeping track of unique tokens
    for (let i = 0, l = sequence.length; i < l; i++) {

      // Using char code if hashing
      if (isString)
        tokens[sequence.charCodeAt(i)] = true;
      else
        tokens[crc32(sequence[i]) & 0xffffffff] = true;
    }

    // Creating the signature
    const signature = new Float64Array(pi);

    for (let i = 0; i < pi; i++) {
      let min = Infinity;

      // Iterating over tokens & keeping track of min
      for (const token in tokens) {
        const hash = (A[i] * token + B[i]) % NEXT_PRIME;

        if (hash < min)
          min = hash;
      }

      signature[i] = min;
    }

    return signature;
  };
}
